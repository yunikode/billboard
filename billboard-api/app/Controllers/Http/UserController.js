'use strict';

const User = use('App/Models/User');
const Bill = use('App/Models/Bill');
const Hash = use('Hash');

class UserController {
  async signup({ request, auth, response }) {
    const userData = request.only(['name', 'username', 'email', 'password']);

    try {
      const user = await User.create(userData);

      const token = await auth.generate(user);

      return response.json({
        status: 'success',
        data: token
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later'
      });
    }
  }

  async login({ request, auth, response }) {
    try {
      const token = await auth.attempt(
        request.input('email'),
        request.input('password')
      );

      return response.json({
        status: 'success',
        data: token
      });
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      });
    }
  }

  async me({ auth, response }) {
    const user = await User.query()
      .where('id', auth.current.user.id)
      .with('bills', builder => {
        builder.with('user');
        builder.with('favourites');
        builder.with('replies');
      })
      .with('following')
      .with('followers')
      .with('favourites')
      .with('favourites.bill', builder => {
        builder.with('user');
        builder.with('favourites');
        builder.with('replies');
      })
      .firstOrFail();

    return response.json({
      status: 'success',
      data: user
    });
  }

  async timeline({ auth, response }) {
    const user = await User.find(auth.current.user.id);

    const followerIds = await user.following().ids();

    followerIds.push(user.id);

    const bills = await Bill.query()
      .whereIn('user_id', followerIds)
      .with('user')
      .with('favourites')
      .with('replies')
      .fetch();

    return response.json({
      status: 'success',
      data: bills
    });
  }

  async showProfile({ request, params, response }) {
    try {
      const user = await User.query()
        .where('username', params.username)
        .with('bills', builder => {
          builder.with('user');
          builder.with('favourites');
          builder.with('replies');
        })
        .with('following')
        .with('followers')
        .with('favourites')
        .with('favourites.bill', builder => {
          builder.with('user');
          builder.with('favourites');
          builder.with('replies');
        })
        .firstOrFail();

      return response.json({
        status: 'success',
        data: user
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'User not found.'
      });
    }
  }

  async usersToFollow({ params, auth, response }) {
    const user = auth.current.user;
    const usersAlreadyFollowing = await user.following().ids();

    const usersToFollow = await User.query()
      .whereNot('id', user.id)
      .whereNotIn('id', usersAlreadyFollowing)
      .pick(3);

    return response.json({
      status: 'success',
      data: usersToFollow
    });
  }

  async follow({ request, auth, response }) {
    const user = auth.current.user;

    await user.following().attach(request.input('user_id'));

    return response.json({
      status: 'success',
      data: null
    });
  }

  async unFollow({ params, auth, response }) {
    const user = auth.current.user;

    await user.following().detach(params.id);

    return response.json({
      status: 'success',
      data: null
    });
  }

  async updateProfile({ request, auth, response }) {
    try {
      const user = auth.current.user;

      user.name = request.input('name');
      user.username = request.input('username');
      user.email = request.input('email');
      user.location = request.input('location');
      user.bio = request.input('bio');
      user.website_url = request.input('website_url');

      await user.save();

      return response.json({
        status: 'success',
        message: 'Profile updated!',
        data: user
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem updating profile, please try again later.'
      });
    }
  }

  async changePassword({ request, auth, response }) {
    let user = auth.current.user;

    const verifyPassword = await Hash.verify(
      request.input('password'),
      user.password
    );

    if (!verifyPassword) {
      return response.status(400).json({
        status: 'error',
        message: 'Current password coud not be verified. Please try again.'
      });
    }

    const updatedPW = await request.input('newPassword');

    user.merge({ password: updatedPW });

    await user.save();

    return response.json({
      status: 'success',
      message: 'Password updated!'
      // message: updatedPW
    });
  }
}

module.exports = UserController;

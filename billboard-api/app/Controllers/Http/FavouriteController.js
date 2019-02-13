'use strict';
const Favourite = use('App/Models/Favourite');

class FavouriteController {
  async favourite({ request, auth, response }) {
    const user = auth.current.user;

    const billId = request.input('bill_id');

    const favourite = await Favourite.findOrCreate(
      { user_id: user.id, bill_id: billId },
      { user_id: user.id, bill_id: billId }
    );

    return response.json({
      status: 'success',
      data: favourite
    });
  }

  async unFavourite({ params, auth, response }) {
    const user = auth.current.user;

    await Favourite.query()
      .where('user_id', user.id)
      .where('bill_id', params.id)
      .delete();

    return response.json({
      status: 'success',
      data: null
    });
  }
}

module.exports = FavouriteController;

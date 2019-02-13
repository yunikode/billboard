'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello this is API!' };
});

Route.post('/signup', 'UserController.signup');
Route.post('/login', 'UserController.login');

Route.group(() => {
  Route.get('/me', 'UserController.me');
  Route.put('/update_profile', 'UserController.updateProfile');
  Route.put('/change_password', 'UserController.changePassword');
})
  .prefix('account')
  .middleware(['auth:jwt']);

Route.group(() => {
  Route.get('/users_to_follow', 'UserController.usersToFollow');
  Route.get('/timeline', 'UserController.timeline');
  Route.post('/follow', 'UserController.follow');
  Route.delete('/unfollow/:id', 'UserController.unFollow');
})
  .prefix('users')
  .middleware(['auth:jwt']);

Route.get('/bills/:id', 'BillController.show');
Route.post('/bill', 'BillController.bill').middleware(['auth:jwt']);
Route.post('/bills/reply/:id', 'BillController.reply').middleware(['auth:jwt']);
Route.delete('/bills/destroy/:id', 'BillController.destroy').middleware([
  'auth:jwt'
]);

Route.group(() => {
  Route.post('/create', 'FavouriteController.favourite');
  Route.delete('/destroy/:id', 'FavouriteController.unFavourite');
})
  .prefix('favourites')
  .middleware(['auth:jwt']);

Route.get(':username', 'UserController.showProfile');

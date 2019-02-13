import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings'
import SingleBill from '@/components/Bill/SingleBill'
import Home from '@/components/Home'
import UsersFollowing from '@/components/User/Profile/UsersFollowing'
import UserFollowers from '@/components/User/Profile/UserFollowers'
import UserProfile from '@/components/User/Profile/UserProfile'
import FavouriteBills from '@/components/User/Profile/FavouriteBills'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: LogInForm
    },
    {
      path: '/signup',
      component: SignUpForm
    },
    {
      path: '/favourites',
      component: FavouriteBills
    },
    {
      path: '/:username/favourites',
      component: FavouriteBills,
      props: true
    },
    {
      path: '/settings/profile',
      component: UserProfileSettings
    },
    {
      path: '/settings/password',
      component: UserPasswordSettings
    },
    {
      path: '/following',
      component: UsersFollowing
    },
    {
      path: '/followers',
      component: UserFollowers
    },
    {
      path: '/:username/following',
      component: UsersFollowing,
      props: true
    },
    {
      path: '/:username/followers',
      component: UserFollowers,
      props: true
    },
    {
      path: '/:username',
      component: UserProfile,
      props: true
    },
    {
      path: '/:username/status/:id',
      component: SingleBill,
      props: true
    }
  ]
})

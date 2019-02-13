<template>
  <div>
    <Navbar :title="title" />
    <UserProfileHeader
      :user="user"
      :auth-user="authUser"
      active='favourites'
    />
    <div class="container mx-auto flex pt-4">
      <div class="w-1/4 mr-4">
        <UserProfileSidebarDetails :user="user" />
      </div>
      <div class="w-1/2">

          <Bills
            :bills.sync="onlyBills"
            :auth-user="authUser"

            />
        </div>
      <div class="w-1/4 ml-4">
        <WhoToFollow v-if="isLoggedIn" />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import WhoToFollow from '@/components/User/WhoToFollow'
import Bills from '@/components/Bill/Bills'
import profileMixin from '@/mixins/profileMixin'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'FavouriteBills',
  mixins: [profileMixin],
  components: {
    UserProfileHeader,
    UserProfileSidebarDetails,
    Bills,
    WhoToFollow,
    Navbar
  },
  data () {
    return {
      user: {},
      authUser: {},
      title: {
        title: 'Favourite Posts'
      }
    }
  },
  computed: {
    isLoggedIn () {
      return !!this.authUser
    },
    onlyBills () {
      return Array.from(this.user.favourites, favourite => favourite.bill ? favourite.bill : 'deleted').reverse()
    }
  }
}
</script>

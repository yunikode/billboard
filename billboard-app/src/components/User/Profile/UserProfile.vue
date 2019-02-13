<template>
<div>
  <Navbar :title="title" />
  <UserProfileHeader :user="user" :auth-user="authUser" active='bills' />
  <div class="container mx-auto flex">
    <div class="w-1/4 mr-4 mt-4">
      <UserProfileSidebarDetails :user="user" />
    </div>
    <div class="w-1/2 mt-4">
      <Bills :bills.sync="bills" :auth-user="authUser" />
    </div>
    <div class="w-1/4 mt-4 ml-4">
      <WhoToFollow v-if="isLoggedIn" />
    </div>
  </div>
</div>
</template>

<script>
import Bills from '@/components/Bill/Bills'
import WhoToFollow from '@/components/User/WhoToFollow'
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'UserProfile',
  components: {
    Bills,
    WhoToFollow,
    UserProfileHeader,
    UserProfileSidebarDetails,
    Navbar
  },
  data() {
    return {
      user: {},
      authUser: {},
      bills: [],
      title: {
        title: 'junkYard'
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUser(to.params.username)
    next()
  },
  computed: {
    isLoggedIn() {
      return !!this.authUser
    }
  },
  created() {
    this.fetchUser(this.$route.params.username)

    const token = localStorage.getItem('billboard-token')

    if (token) {
      this.fetchAuthenticatedUser(token)
    }
  },
  methods: {
    fetchUser(username) {
      // eslint-disable-next-line
      axios.get(`/${username}`).then(response => {
        this.user = response.data.data
        this.bills = response.data.data.bills.reverse()
      })
    },
    fetchAuthenticatedUser(token) {
      // eslint-disable-next-line
      axios.get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.authUser = response.data.data
        })
    }
  }
}
</script>

<style lang="css">
</style>

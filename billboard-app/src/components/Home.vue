<template>
<div>
  <Hero />
  <UserProfileHeader :user="user" :auth-user="user" active='' />
  <div class="container mx-auto flex flex-col md:flex-row justify-content mt-4">
    <div class="hidden md:block md:w-1/3 lg:w-1/4">
      <UserSidebar :user="user" />
      <div class="lg:hidden">
        <WhoToFollow />
      </div>
    </div>
    <div class="mx-4 md:w-2/3 lg:w-1/2">

      <h2 class="text-grey-darker">Timeline</h2>

      <Bills :bills.sync="bills" :auth-user="user" />

    </div>
    <div class="hidden lg:block lg:w-1/4">
      <WhoToFollow />
    </div>
  </div>
</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Bills from '@/components/Bill/Bills'
import WhoToFollow from '@/components/User/WhoToFollow'
import Hero from '@/components/Hero/Hero'
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'

export default {
  name: 'Home',
  components: {
    UserSidebar,
    Bills,
    WhoToFollow,
    Hero,
    UserProfileHeader
  },
  data () {
    return {
      user: {},
      bills: [],
      title: {
        title: 'Help!'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('billboard-token')
    return token ? next() : next('/login')
  },
  created () {
    this.fetchAuthenticatedUser()
    this.fetchUserTimeline()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios.get('/account/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.user = response.data.data
        })
    },
    fetchUserTimeline () {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios.get('/users/timeline', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.bills = response.data.data.reverse()
        })
    }
  }
}
</script>

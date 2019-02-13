<template>
  <div class="bg-white p-2 mt-4">
    <h2 class="text-grey-darker">Who to follow</h2>
    <i class="fas fa-sync-alt" :class="{'hidden': count < 1}" @click="fetchWhoToFollow"></i>
    <div class="flex flex-col">
      <div class="bg-white p-2 flex items-center mb-2" v-for="user in usersToFollow" :key="user.id">
        <div class="flex-no-shrink">
          <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
        </div>
        <div class="flex-grow">
          <router-link class="text-sm text-grey-darker" :to="`/${user.username}`">
            <span class="hidden lg:inline">{{ user.name }}</span> <span class="lg:text-xs text-grey-dark"> {{ `@${user.username}` }}</span>
          </router-link>

            <button class="bg-blue hover:bg-blue-dark text-white text-sm font-bold px-2 py-1 rounded" @click="followUser(user.id)">Follow</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhoToFollow',
  data () {
    return {
      usersToFollow: [],
      count: ''
    }
  },
  created () {
    this.fetchWhoToFollow()
  },
  methods: {
    fetchWhoToFollow () {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .get('/users/users_to_follow', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.usersToFollow = response.data.data
          this.count = response.data.data.length
        })
    },
    followUser (userId) {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .post(
          '/users/follow',
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.usersToFollow = this.usersToFollow.filter(u => {
            return u.id !== userId
          })
          this.count -= 1 
        })
    }
  }
}
</script>

<style lang="css">
</style>

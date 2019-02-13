<template>
  <div>
    <div class="bg-white p-2 shadow rounded">
      <form class="w-full" @submit.prevent="postBill">
          <textarea name="bill" rows="2" v-model="bill" placeholder="Compose Bill"
          class="appearance-none block w-full border mb-2 text-grey-darker"></textarea>

        <button
          class="bg-blue hover:bg-blue-dark text-white font-bold rounded py-2 px-4"
          :class="{'opacity-50 no-cursor-allowed': !isFormValid}">Bill</button>
      </form>
    </div>
    <div class="bg-white p-2 mt-4 shadow rounded flex">
      <router-link class="bg-green hover:bg-green-dark text-white text-sm p-2" to="/">
        <i class="fas fa-home"></i>
      </router-link>
      <router-link class="bg-orange hover:bg-orange-dark text-white font-bold text-sm p-2 ml-1" :to="`/${user.username}`">Profile</router-link>
      <router-link class="bg-orange hover:bg-orange-dark text-white font-bold text-sm p-2 ml-1" to="/settings/profile">Settings</router-link>
      <a class="bg-red hover:bg-red-dark text-white font-bold text-sm p-2 ml-1" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
      </a>
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus'

export default {
  name: 'UserSidebar',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bill: ''
    }
  },
  computed: {
    isFormValid () {
      return !!this.bill
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('billboard-token')
      this.$router.push('/login')
    },
    postBill () {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .post(
          '/bill',
          { bill: this.bill },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          EventBus.$emit('billAdded', response.data.data)

          this.bill = ''
        })
    }
  }
}
</script>

<style lang="css">
</style>

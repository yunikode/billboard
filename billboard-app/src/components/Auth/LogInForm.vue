<template>
<div class="flex justify-center flex-col mt-20">

  <div class="bg-white shadow-md mb-4 p-4 sm:w-1/2 lg:w-1/3 w-5/6 mx-auto">
    <h2 class="text-grey-darker text-center">Log in</h2>
  </div>

  <form class="bg-white shadow-md px-8 pt-6 pb-8 mb-4 font-sans sm:w-1/2 lg:w-1/3 w-5/6 mx-auto" @submit.prevent="login">
    <div class="mb-4">
      <label for="email" class="block text-grey-darker text-sm font-bold mb-2">Email</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" type="text" name="email" v-model="email" placeholder="Email" required>
    </div>

    <div class="mb-6">
      <label for="email" class="block text-grey-darker text-sm font-bold mb-2">Password</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" v-model="password" placeholder="Password" required>
      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />
    </div>

    <div class="flex items-center justify-between">
      <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Log In
      </button>
      <p class="hidden md:block">
        Not a member yet? <router-link class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/signup">Sign Up</router-link>
      </p>
    </div>
  </form>
  <p class="md:hidden text-center">
    Not a member yet? <router-link class="inline-block align-baseline font-bold text-blue hover:text-blue-darker" to="/signup">Sign Up</router-link>
  </p>
</div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  name: 'LogInForm',
  components: {
    Notification
  },
  data() {
    return {
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('billboard-token')

    return token ? next('/') : next()
  },
  methods: {
    login() {
      // eslint-disable-next-line
      axios
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          localStorage.setItem('billboard-token', response.data.data.token)
          this.$router.push('/')
        })
        .catch(error => {
          this.email = this.password = ''
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>

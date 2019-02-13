<template>
<div class="flex justify-center flex-col mt-20">

    <div class="bg-white shadow-md mb-4 p-4 sm:w-1/2 lg:w-1/3 w-5/6 mx-auto">
      <h2 class="text-grey-darker text-center">Sign Up</h2>
    </div>

    <form class="bg-white shadow-md px-8 pt-6 pb-8 mb-4 font-sans sm:w-1/2 lg:w-1/3 w-5/6 mx-auto" @submit.prevent="signup">

      <div class="mb-4">
        <label for="name" class="block text-grey-darker text-sm font-bold mb-2" :class="{ 'text-red-dark': errors.has('name')}">Full Name</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" :class="{ 'border-red': errors.has('name')}" type="text" name="name" v-model="name" v-validate="'required'" placeholder="Full Name">
        <p v-show="errors.has('name')" class="text-red text-xs italic mt-3">{{errors.first('name')}}</p>
      </div>

      <div class="mb-4">
        <label for="username" class="block text-grey-darker text-sm font-bold mb-2" :class="{ 'text-red-dark': errors.has('username')}">Username</label>
        <input
        type="text"
        name="username"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        :class="{'border-red': errors.has('username')}" v-model="username" v-validate="'required'" placeholder="Username">
        <p v-show="errors.has('username')" class="text-red text-xs italic mt-3">{{errors.first('username')}}</p>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-grey-darker text-sm font-bold mb-2" :class="{ 'text-red-dark': errors.has('email')}">Email</label>
        <input type="text" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" :class="{'input': true, 'border-red': errors.has('email')}" v-model="email" v-validate="'required|email'" placeholder="Email">
        <p v-show="errors.has('email')" class="text-red text-xs italic mt-3">{{errors.first('email')}}</p>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-grey-darker text-sm font-bold mb-2" :class="{ 'text-red-dark': errors.has('password')}">Password</label>
        <input
        type="password"
        name="password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        :class="{'border-red': errors.has('password')}" v-model="password" v-validate="'required'" placeholder="Password">
        <p v-show="errors.has('password')" class="text-red text-xs italic mt-3">{{errors.first('password')}}</p>
      </div>
      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

      <div class="flex items-center justify-between">
        <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :class="{ 'opacity-50 cursor-not-allowed': !isFormValid}" :disabled="!isFormValid">
          SIGN UP
        </button>
        <p class="hidden md:block">Already signed up? <router-link class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" to="/login">Log In</router-link>
        </p>
      </div>

      </form>
      <p class="md:hidden text-center">Already signed up? <router-link class="inline-block align-baseline font-bold text-blue hover:text-blue-darker" to="/login">Log In</router-link>
      </p>

</div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  name: 'SignUpForm',
  components: {
    Notification
  },
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('billboard-token')

    return token ? next('/') : next()
  },
  methods: {
    signup () {
      // eslint-disable-next-line
      axios
        .post('/signup', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          alert('sent request to DB')
          localStorage.setItem('billboard-token', response.data.data.token)
          this.$router.push('/')
        })
        .catch(error => {
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>

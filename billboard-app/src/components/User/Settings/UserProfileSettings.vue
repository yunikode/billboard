<template>
<div>
  <Navbar :title="title" />

  <div class="container mx-auto flex">

    <UserSettingsMenu />

    <Modal />

    <div class="w-3/4 mt-4">

      <form class="bg-white rounded p-4 shadow" @submit.prevent="updateProfile">
        <div class="field" :class="{ error: errors.has('name') }">
          <label for="name">Full Name</label>
          <input class="input" type="text" name="name" v-model="name" v-validate="'required'">
          <span v-show="errors.has('name')" class="is-danger">{{errors.first('name')}}</span>
        </div>

        <div class="field" :class="{ error: errors.has('username') }">
          <label for="username">Username</label>
          <input class="input" type="text" name="username" v-model="username" v-validate="'required'">
          <span v-show="errors.has('username')" class="is-danger">{{errors.first('username')}}</span>
        </div>

        <div class="field" :class="{ error: errors.has('email') }">
          <label for="email">Email</label>
          <input class="input" type="text" name="email" v-model="email" v-validate="'required'">
          <span v-show="errors.has('email')" class="is-danger">{{errors.first('email')}}</span>
        </div>

        <div class="field">
          <label for="bio">Short Bio</label>
          <textarea class="input" name="bio" v-model="bio" rows="5" placeholder="A brief summary of your life"></textarea>
        </div>

        <div class="field">
          <label for="location">Location</label>
          <input class="input" type="text" name="location" v-model="location" placeholder="Your location">
        </div>

        <div class="field">
          <label for="websiteUrl">Website URL</label>
          <input class="input" type="url" name="websiteUrl" v-model="websiteUrl" placeholder="Your location">
        </div>

        <div class="text-center">
          <button class="button">Update Profile</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'UserProfileSettings',
  components: {
    UserSettingsMenu,
    Navbar
  },
  data () {
    return {
      name: '',
      username: '',
      email: '',
      bio: '',
      location: '',
      websiteUrl: '',
      notification: {
        message: '',
        type: ''
      },
      title: {
        title: 'Edit Profile'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('billboard-token')

    return token ? next() : next('/login')
  },
  created () {
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.name = response.data.data.name
          this.username = response.data.data.username
          this.email = response.data.data.email
          this.location = response.data.data.location
          this.bio = response.data.data.bio
          this.websiteUrl = response.data.data.website_url
        })
    },
    updateProfile () {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .put(
          '/account/update_profile', {
            name: this.name,
            username: this.username,
            email: this.email,
            location: this.location,
            bio: this.bio,
            website_url: this.websiteUrl
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: 'success'
          })
        })

      this.$router.go(-1)
    }
  }
}
</script>

<style>
.field {
  @apply text-grey-dark font-bold flex mb-2 items-center;
}

.field label {
  @apply w-1/4;
}

.input {
  @apply appearance-none border border-grey w-full p-1 rounded;
}
</style>

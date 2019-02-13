<template>

<div>
  <Navbar :title="title" />

  <div class="container mx-auto flex">

  <UserSettingsMenu />

  <div class="w-3/4">

      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

      <form class="bg-white shadow rounded p-4 mt-4" @submit.prevent="changePassword">
        <div class="field" :class="{ error: errors.has('password') }">
          <label for="password">Current Password</label>
          <input class="input" type="password" name="password" v-model="password" data-vv-as="current password" v-validate="'required'">
          <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('newPassword') }">
          <label for="newPassword">New Password</label>
          <input class="input" type="password" name="newPassword" v-model="newPassword" ref="newPassword" v-validate="'required'">
          <span v-show="errors.has('newPassword')" class="is-danger">{{ errors.first('newPassword') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('confirmPassword') }">
          <label for="confirmPassword">Confirm New Password</label>
          <input class="input" type="password" name="confirmPassword" v-model="confirmPassword" data-vv-as="newPassword" v-validate="'required|confirmed:newPassword'">
          <span v-show="errors.has('confirmPassword')" class="is-danger">{{ errors.first('confirmPassword') }}</span>
        </div>

        <div class="text-center">
        <button class="button" :class="{'opacity-50':!isFormValid}">Change Password</button>
        </div>
      </form>
  </div>
</div>
</div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'UserPasswordSettings',
  components: {
    Notification,
    UserSettingsMenu,
    Navbar
  },
  data () {
    return {
      password: '',
      newPassword: '',
      confirmPassword: '',
      notification: {
        message: '',
        type: ''
      },
      title: {
        title: 'Change Password'
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

    return token ? next() : next('/login')
  },
  methods: {
    changePassword () {
      const token = localStorage.getItem('billboard-token')

      // eslint-disable-next-line
      axios
        .put(
          '/account/change_password', {
            password: this.password,
            newPassword: this.confirmPassword
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.password = this.newPassword = this.confirmPassword = ''
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: 'success'
          })
        })
        .catch(error => {
          this.password = this.newPassword = this.confirmPassword = ''
          this.$nextTick(() => {
            this.$validator.reset()
          })
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: 'danger'
          })
        })
    }
  }
}
</script>

import axios from 'axios'

export default {
  created () {
    this.$_profileMixin_fetchUser(this.$route.params.username)

    const token = localStorage.getItem('billboard-token')

    if (token) {
      this.$_profileMixin_fetchAuthenticatedUser(token)
    }
  },
  methods: {
    $_profileMixin_fetchUser (username) {
      if (username) {
        axios.get(`/${username}`).then(response => {
          this.user = response.data.data
        })
      } else {
        const token = localStorage.getItem('billboard-token')

        axios
          .get('account/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(resonse => {
            this.user = resonse.data.data
          })
      }
    },
    $_profileMixin_fetchAuthenticatedUser (token) {
      axios
        .get('account/me', {
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

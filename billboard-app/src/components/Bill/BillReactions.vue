<template>
<div class="flex justify-center">
  <a class="like">
    <i class="fas fa-reply"></i>
    {{ replies.length}}
  </a>
  <a class="like" v-if="isFavouritedByUser" @click.prevent="unFavouriteBill" >
    <i class="fas fa-heart text-red"></i> {{ favourites.length }}
  </a>
  <a class="like" v-else @click.prevent="favouriteBill">
    <i class="far fa-heart"></i> {{ favourites.length }}
  </a>
</div>
</template>

<script>
export default {
  name: 'BillReactions',
  props: {
    bill: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    replies: {
      type: Array,
      required: true
    },
    favourites: {
      type: Array,
      required: true
    }
  },
  computed: {
    isFavouritedByUser () {
      for (const favourite of this.favourites) {
        if (favourite.user_id === this.authUser.id) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    favouriteBill () {
      const token = localStorage.getItem('billboard-token')

      if (!token) {
        alert('You must be logged in to perform this action.')
        return
      }
      // eslint-disable-next-line
      axios
        .post(
          '/favourites/create', {
            bill_id: this.bill.id
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.favourites.push(response.data.data)
        })
    },
    unFavouriteBill () {
      const token = localStorage.getItem('billboard-token')

      if (!token) {
        alert('You must be logged in to perform this action.')
        return
      }
      // eslint-disable-next-line
      axios
        .delete(
          `/favourites/destroy/${this.bill.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          const filteredFavourites = this.favourites.filter(favourite => {
            return favourite.user_id !== this.authUser.id
          })

          this.$emit('update:favourites', filteredFavourites)
        })
    }
  }
}
</script>

<style>
.like {
  @apply text-grey-darker px-1;
}
</style>

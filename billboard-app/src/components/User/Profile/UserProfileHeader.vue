<template>
<div class="bg-white sticky pin-t z-50">
  <div class="container mx-auto flex flex-row items-center py-4">
    <div class="w-1/4 flex justify-center">
      <img class="block rounded-full w-24 h-24 " src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
    </div>
    <div class="w-1/2">
      <div class="flex justify-around">
        <router-link :to="`/${user.username}`" class="w-full h-full link" :class="{'active': this.active === 'bills'}">
          <div class="link-title">Bills</div>
          <div class="link-number">{{ user.bills.length }}</div>
        </router-link>

        <router-link :to="isOwner ? `/following` : `/${user.username}/following`" class="w-full h-full link" :class="{'active': this.active === 'following'}">
          <div class="link-title">Following</div>
          <div class="link-number">{{ user.following.length }}</div>
        </router-link>
        <router-link :to="isOwner ? `/followers` : `/${user.username}/followers`" class="w-full h-full link" :class="{'active': this.active === 'followers'}">
          <div class="link-title">Followers</div>
          <div class="link-number">{{ user.followers.length }}</div>
        </router-link>
        <router-link :to="isOwner ? `/favourites` : `/${user.username}/favourites`" class="w-full h-full link" :class="{'active': this.active === 'favourites'}">
          <div class="link-title">Favourites</div>
          <div class="link-number">{{ user.favourites.length }}</div>
        </router-link>
      </div>
    </div>
    <div class="w-1/4 flex justify-end" v-if="isOwner">
      <router-link to="/settings/profile" class="button">Edit profile</router-link>
    </div>
    <div class="w-1/4 flex justify-end" v-if="isLoggedIn && !isOwner">
      <button class="button" v-if="isFollowing" @click="unFollow(user.id)">Unfollow</button>
      <button class="button" v-else @click="follow(user.id)">Follow</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserProfileHeader',
  props: {
    user: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    active: {
      type: String,
      required: true
    }
  },
  computed: {
    isOwner() {
      return this.user.id === this.authUser.id
    },
    isLoggedIn() {
      return !!this.authUser
    },
    isFollowing() {
      for (const following of this.authUser.following) {
        if (following.id === this.user.id) {
          return true
        }
      }

      return false
    },
  },
  methods: {
    follow(userId) {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .post(
          'users/follow', {
            user_id: userId
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.authUser.following.push({
            id: userId
          })
        })
    },
    unFollow(userId) {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .delete(
          `users/unfollow/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.authUser.following = this.authUser.following.filter(u => {
            return u.id !== userId
          })
        })
    }
  }
}
</script>

<style lang="css">

.link {
  @apply p-4 rounded;
}

.link:hover {
  @apply bg-blue-lighter;
}

.link-title {
  @apply block text-grey-darker font-bold text-center;
}

.link-number {
  @apply block text-grey-darker text-lg text-center;
}

.button {
  @apply border-2 border-blue font-bold text-sm text-blue rounded px-2 py-2;
}

.button:hover {
  @apply bg-blue text-white;
}

.active {
  @apply border-b-2 border-blue;
}
</style>

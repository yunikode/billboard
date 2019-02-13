<template>
    <div class="bg-white rounded shadow m-2 card">
      <router-link :to="`/${user.username}`">
        <img class="w-full" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
        <div class="font-bold p-2 mb-2 text-black">
          {{ user.name }}
        <p class="text-grey-darker text-base">
          {{ `@${user.username}` }}
        </p>
        <p class="text-grey-darker text-base" v-if="user.bio">
          {{ user.bio }}
        </p>
      </div>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.card:hover {
  @apply shadow-lg;
}
</style>

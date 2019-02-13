<template>
<div>

  <div class="bg-white mb-4 p-2 rounded shadow flex flex-col" v-for="reply in replies" :key="reply.id">
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
      <div class="text-sm flex-grow">
        <router-link :to="`/${reply.user.username}`" class="text-black leading-none no-underline">
          {{ reply.user.name }} <span class="text-grey-darker font-bold">{{ `@${reply.user.username}` }}</span>
        </router-link>
        <p class="text-grey-dark">{{ reply.created_at | timeAgo }}</p>
      </div>
    </div>
    <div class="mt-2 mb-2 text-black">
      {{ reply.reply }}

    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'Replies',
  props: {
    replies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>

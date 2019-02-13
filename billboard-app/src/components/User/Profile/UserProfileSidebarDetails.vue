<template>
<div>

  <div class="bg-white shadow p-2">
    <router-link :to="`/${user.username}`">
      <h2 class="text-grey-darker text-xl">{{ user.name }}</h2>
      <h2 class="text-grey-darker text-2xl mt-1">{{ `@${user.username}` }}</h2>
    </router-link>

    <p v-show="user.bio" class="text-grey-darker my-2">{{ user.bio }}</p>

    <ul class="list-reset mt-4">
      <li class="item" v-show="user.location">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ user.location }}</span>
      </li>
      <li class="item" v-show="user.website_url">
        <i class="fas fa-link"></i>
        <span>
          <a class="item" :href="user.website_url" target="_blank">{{ user.website_url}}</a>
        </span>
      </li>
      <li class="item" v-show="user.created_at">
        <i class="fas fa-calendar-alt"></i>
        <span>
          Joined {{ user.created_at | joined }}
        </span>
      </li>
      <li class="item" v-show="user.dob">
        <i class="fas fa-birthday-cake"></i>
        <span>
          {{ user.dob | dob}}
        </span>
      </li>
    </ul>

  </div>
</div>
</template>

<script>
export default {
  name: 'UserProfileSidebarDetails',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="css">
.item {
  @apply text-grey-darker text-sm;
}
</style>

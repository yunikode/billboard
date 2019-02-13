<template>
  <div class="w-full z-50 bg-white py-4 shadow-md sticky pin-t">
    <div class="container mx-auto flex flex-row items-center justify-center">
      <a class="back-arrow px-2 py-1 rounded" @click="back">
        <i class="fas fa-arrow-left text-grey"></i><span class="text-transparent ml-2">Back</span>
      </a>
      <p class="flex-grow text-center"><span>
<router-link class="text-xl text-grey-dark hover:text-blue font-bold leading-tight" to="/">{{title.title}}</router-link>
        </span> {{title.subhead}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    title: {
      type: Object,
      required: true
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

.back-arrow:hover {
  @apply bg-blue;
}

.back-arrow:hover i, .back-arrow:hover span {
  @apply text-white;
}

</style>

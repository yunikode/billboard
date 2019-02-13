<template>
  <div class="h-half hero">
    <Navbar :title="title"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
export default {
  name: 'Hero',
  data () {
    return {
      title: {
        title: 'junkYard',
        subhead: 'welcome to the junkyard'
      }
    }
  },
  components: {
    Navbar
  }
}
</script>

<style lang="css">
.hero {
background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
}
</style>

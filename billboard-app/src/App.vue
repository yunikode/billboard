<template>
  <div id="app">
    <Modal />
    <router-view/>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal'

export default {
  name: 'App',
  components: {
    Modal
  }
}
</script>

<style>
.is-danger {
  color: #9f3a38;
}
</style>

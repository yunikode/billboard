<template>
  <p class="text-red text-xs italic mt-3">{{ message }}</p>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

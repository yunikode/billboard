<template>
  <div>
    {{ bill.bill }}
  </div>
</template>

<script>
export default {
  name: 'SingleDebug',
  data () {
    return {
      bill: ''
    }
  },
  created () {
    this.fetchBill()
  },
  methods: {
    fetchBill () {
      axios.get('/bills/1').then(response => {
        this.bill = response.data.data
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <div>
    <Bill
      v-for="bill in bills"
      :key="bill.id"
      :bill="bill"
      :auth-user="authUser"
      v-on:delete="removeDeletedBill"
    />
  </div>
</template>

<script>
import Bill from '@/components/Bill/Bill'
import EventBus from '@/EventBus'

export default {
  name: 'Bills',
  components: {
    Bill
  },
  created () {
    EventBus.$on('billAdded', this.fetchAddedBill)
  },
  methods: {
    fetchAddedBill (bill) {
      this.bills.unshift(bill)
    },
    removeDeletedBill (billId) {
      const filteredBills = this.bills.filter(bill => {
        return bill.id !== billId
      })

      this.$emit('update:bills', filteredBills)
    }
  },
  props: {
    bills: {
      type: Array,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>

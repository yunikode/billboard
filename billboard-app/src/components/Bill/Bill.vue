<template>
<div class="bg-white mb-4 p-2 rounded shadow hover:shadow-lg">
  <router-link :to="`/${bill.user.username}/status/${bill.id}`">
  <div class="flex">
    <div class="flex-no-shrink">
      <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
    </div>
    <div class="flex-grow">
      <div class="flex flex-col">
        <div class="flex items-center">
          <div class="text-sm flex-grow">
            <router-link :to="`/${bill.user.username}`" class="text-black leading-none no-underline">
              {{ bill.user.name }} <span class="text-grey-darker font-bold">{{ `@${bill.user.username}` }}</span>
            </router-link>
            <p class="text-grey-dark">{{ bill.created_at | timeAgo }}</p>
          </div>
          <div class="text-sm align-right">
            <p v-if="canDeleteBill">
              <a class="cursor-pointer text-grey-darker hover:text-red hover:bg-red-lightest px-4 py-2 rounded" @click="deleteBill($event, bill.id)">Delete Bill</a>
            </p>
          </div>
        </div>
        <div class="mt-2 mb-2">

            <div class="text-black">
              {{ bill.bill }}
            </div>
        </div>
      </div>
    </div>
  </div>

  <BillReactions :bill="bill" :replies="bill.replies" :favourites.sync="bill.favourites" :auth-user="authUser" />
</router-link>
</div>
</template>

<script>
import BillReactions from '@/components/Bill/BillReactions'
export default {
  name: 'Bill',
  components: {
    BillReactions
  },
  computed: {
    canDeleteBill() {
      return this.bill.user_id === this.authUser.id
    }
  },
  methods: {
    deleteBill(event, billId) {
      event.preventDefault()
      const token = localStorage.getItem('billboard-token')
      const deleteConfirmed = confirm('Are you sure?')

      if (deleteConfirmed) {
        // eslint-disable-next-line
        axios
          .delete(`/bills/destroy/${billId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.$emit('delete', billId)
          })
      }
    }
  },
  props: {
    bill: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  }
}
</script>

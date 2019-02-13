<template>
  <div>
    <Navbar :title="title"/>
<div class="container mx-auto">
    <div class="bg-white my-4 p-2 rounded shadow flex flex-col">
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
      <div class="text-sm flex-grow">
        <router-link :to="`/${bill.user.username}`" class="text-black leading-none no-underline">
          {{ bill.user.name }} <span class="text-grey-darker font-bold">{{ `@${bill.user.username}` }}</span>
        </router-link>
        <p class="text-grey-dark">{{ bill.created_at | timeAgo }}</p>
      </div>
    </div>

    <div class="mt-2 mb-2">
      <router-link :to="`/${bill.user.username}/status/${bill.id}`">
        <div class="text-black">
          {{ bill.bill }}
        </div>
      </router-link>
    </div>

    <BillReactions :bill="bill" :replies="bill.replies" :favourites.sync="bill.favourites" :auth-user="authUser" />
  </div>

  <form @submit.prevent="replyBill" class="bg-white mb-4 p-2 shadow">

      <textarea class="appearance-none block w-full border rounded mb-2" name="reply" v-model="reply" rows="2" placeholder="Reply bill"></textarea>

    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" :class="{'opacity-50 cursor-not-allowed': !isFormValid}">Reply</button>
  </form>

  <Replies :replies="replies" />
</div>
</div>
</template>

<script>
import Replies from '@/components/Bill/Replies'
import BillReactions from '@/components/Bill/BillReactions'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'SingleBill',
  components: {
    Replies,
    BillReactions,
    Navbar
  },
  data() {
    return {
      bill: '',
      replies: [],
      reply: '',
      authUser: '',
      title: {
        title: 'Single Post'
      }
    }
  },
  computed: {
    isFormValid() {
      return !!this.reply
    },
    billTitle() {
      return this.bill.bill
    }
  },
  created() {
    this.fetchBill()
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchAuthenticatedUser() {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.authUser = response.data.data
        })
    },
    fetchBill() {
      // eslint-disable-next-line
      axios.get(`/bills/${this.$route.params.id}`).then(response => {
        this.bill = response.data.data
        this.replies = response.data.data.replies.reverse()
      })
    },
    back() {
      this.$router.go(-1)
    },
    replyBill() {
      const token = localStorage.getItem('billboard-token')
      // eslint-disable-next-line
      axios
        .post(
          `/bills/reply/${this.$route.params.id}`, {
            reply: this.reply
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.reply = ''
          this.replies.unshift(response.data.data)
        })
    }
  }
}
</script>

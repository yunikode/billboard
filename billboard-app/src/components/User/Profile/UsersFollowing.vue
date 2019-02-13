<template>
  <div>
    <Navbar :title="title"/>
    <UserProfileHeader
      :user="user"
      :auth-user="authUser"
      active='following'
    />
    <div class="container mx-auto flex pt-4">
      <div class="w-1/4 mr-4">
        <UserProfileSidebarDetails :user="user" />
      </div>
      <div class="w-3/4">
        <div class="flex -m-2">

            <UserCard
              v-for="following in user.following"
              :key="following.id"
              :user="following"
              class="w-1/3 p-2"
              />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserCard from '@/components/User/Profile/UserCard'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import profileMixin from '@/mixins/profileMixin'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'UsersFollowing',
  mixins: [profileMixin],
  components: {
    UserCard,
    UserProfileHeader,
    UserProfileSidebarDetails,
    Navbar
  },
  data () {
    return {
      user: {},
      authUser: {},
      title: {
        title: 'Following'
      }
    }
  }
}
</script>

<style lang="css">
</style>

<template>
  <div>
    <Navbar :title="title"/>
    <UserProfileHeader
      :user="user"
      :auth-user="authUser"
      active='followers'
    />
    <div class="container mx-auto flex pt-4">
      <div class="w-1/4 mr-4">
        <UserProfileSidebarDetails :user="user" />
      </div>
      <div class="w-3/4 flex -m-2">
            <UserCard
              v-for="follower in user.followers"
              :key="follower.id"
              :user="follower"
              class="w-1/3 p-2"
            />
        </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import UserCard from '@/components/User/Profile/UserCard'
import profileMixin from '@/mixins/profileMixin'
import Navbar from '@/components/Navbar/Navbar'

export default {
  name: 'UserFollowers',
  mixins: [profileMixin],
  components: {
    UserProfileHeader,
    UserProfileSidebarDetails,
    UserCard,
    Navbar
  },
  data () {
    return {
      user: {},
      authUser: {},
      title: {
        title: 'Followers'
      }
    }
  }
}
</script>

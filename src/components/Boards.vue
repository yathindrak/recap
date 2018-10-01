<template>
    <div>
        <vs-tabs>
            <vs-tab vs-label="All Boards">
                <div>
                    <vs-row class="row">
                        <vs-col class="col" :key="board.id" v-for="board in boards" vs-type="flex"
                                vs-justify="center" vs-align="center"  vs-lg="3" vs-sm="4" vs-xs="6">
                            <BoardTile :id="board.id" :name="board.name" :description="board.description" :isLiked="board.isLiked"></BoardTile>
                        </vs-col>
                    </vs-row>
                </div><!--End of displaying all boards-->
            </vs-tab>
            <vs-tab vs-label="Starred Boards">
                <div>
                  <vs-row class="row">
                    <vs-col class="col" :key="board.id" v-for="board in boards.filter(item => item.isLiked == true )" vs-type="flex"
                            vs-justify="center" vs-align="center"  vs-lg="3" vs-sm="4" vs-xs="6">
                      <BoardTile :id="board.id" :name="board.name" :description="board.description" :isLiked="board.isLiked"  v-if="board.isLiked"></BoardTile>
                    </vs-col>
                  </vs-row>
                </div>
            </vs-tab>
        </vs-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BoardTile from "./BoardTile";
import boardsSub from '../gql-subscriptions/boards';

export default {
  name: "Boards",
  components: { BoardTile },
  data() {
    return {
      getBoards: [],
    };
  },
  computed: {
    ...mapState(['boards']),
  },
  apollo: boardsSub,
  async mounted() {
    await this.$store.dispatch('fetchBoardList');

    const token = localStorage.getItem('token') || null;
    const refreshToken = localStorage.getItem('refreshToken')  || null;
    let userIdentity = localStorage.getItem('useridentity')  || null;

    if (token === null || refreshToken === null) {

      if (userIdentity === null) {
        // create a random number using crypto API
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        userIdentity = randomBuffer[0];

        await this.$store.dispatch('logUser', [userIdentity.toString()]);
        localStorage.setItem('useridentity', userIdentity);
      } else {
        this.$store.dispatch('logUser', [userIdentity.toString()]);
      }
    }
  }
};
</script>
<style scoped>
.col {
  margin: 1em;
}
</style>

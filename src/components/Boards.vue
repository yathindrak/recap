<template>
    <div>
        <vs-tabs>
            <vs-tab vs-label="All Boards">
                <div>
                    <vs-row class="row">
                        <vs-col class="col" :key="board.id" v-for="board in boards" vs-type="flex"
                                vs-justify="center" vs-align="center"  vs-lg="3" vs-sm="4" vs-xs="6">
                            <BoardTile :id="board.id" :name="board.name" :description="board.description"></BoardTile>
                        </vs-col>
                    </vs-row>
                </div><!--End of displaying all boards-->
            </vs-tab>
            <vs-tab vs-label="Recent Boards">
                <div>

                </div>
            </vs-tab>
            <vs-tab vs-label="Starred Boards">
                <div>

                </div>
            </vs-tab>
        </vs-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BoardTile from "./BoardTile";
import gql from "graphql-tag";

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
  apollo: {
    // Subscriptions
    $subscribe: {
      // When a tag is added
      tagAdded: {
        query: gql`subscription {
          boardAdded{
            id
          }
        }`,
        // Result hook
        result() {
          console.log('SOMEONE ADDED A BOARD');
          this.$store.dispatch('fetchBoardList');
        },
      },
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchBoardList');
    // await this.$store.dispatch('subscribeAddBoard');

    const token = localStorage.getItem('token') || null;
    const refreshToken = localStorage.getItem('refreshToken')  || null;
    let userIdentity = localStorage.getItem('useridentity')  || null;

    if (token === null || refreshToken === null) {

      if (userIdentity === null) {
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

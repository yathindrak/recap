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
  async mounted() {
    await this.$store.dispatch('fetchBoardList');
  }
};
</script>
<style scoped>
.col {
  margin: 1em;
}
</style>

<template>
    <div>
        <vs-tabs>
            <vs-tab vs-label="All Boards">
                <div>
                    <vs-row class="row">
                        <vs-col class="col" :key="board.id" v-for="board in getBoards" vs-type="flex"
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
import gql from "graphql-tag";

import BoardTile from "./BoardTile";
export default {
  name: "Boards",
  components: { BoardTile },
  data() {
    return {
      t : 1,
      getBoards: [],
    //   cards: [
    //     {
    //       card_id: 1,
    //       card_name: "Pending",
    //       card_descr: "Still have to do these bro :/",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "In Progress",
    //       card_descr: "WIP :|",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "Completed",
    //       card_descr: "Yay done :)",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "Completed",
    //       card_descr: "Yay done :)",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 1,
    //       card_name: "Pending",
    //       card_descr: "Still have to do these bro :/",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "In Progress",
    //       card_descr: "WIP :|",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "Completed",
    //       card_descr: "Yay done :)",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "Completed",
    //       card_descr: "Yay done :)",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 1,
    //       card_name: "Pending",
    //       card_descr: "Still have to do these bro :/",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "In Progress",
    //       card_descr: "WIP :|",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "Completed",
    //       card_descr: "Yay done :)",
    //       order_num: null,
    //       board_id: 1
    //     },
    //     {
    //       card_id: 2,
    //       card_name: "Completed",
    //       card_descr: "Yay done :)",
    //       order_num: null,
    //       board_id: 1
    //     }
    //   ]
    };
  },
  apollo: {
    getBoards: gql`
      {
        getBoards {
          id
          name
          description
        }
      }
    `
  },
  async mounted() {
    // const x = await this.$store.dispatch('fetchBoard', this.t);
    // console.log('AAA' + x)
  }
};
</script>
<style scoped>
.col {
  margin: 1em;
}
</style>

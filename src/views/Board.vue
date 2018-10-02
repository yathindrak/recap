<template>
  <div class="board">
    <vs-row class="row" v-if="board.columns !== undefined">
      <vs-col class="col" v-for="column in board.columns" :key="column.id" vs-type="flex" vs-justify="center"
              vs-align="center" vs-lg="3" vs-sm="6" vs-xs="12">
        <column :boardId="boardId" :columnId="column.id" :name="column.name" :description="column.description">
          <card v-for="card in column.cards" :key="card.id" :isLiked="card.isLiked" :comments="card.comments"
                :cardId="card.id" :name="card.name" :description="card.description" :likes_count="card.likes_count" />
        </column>
      </vs-col>
    </vs-row>

  </div>
</template>
<style lang="scss" scoped>
.board {
  height: calc(100vh - 34px);
  display: flex;

  .row {
    flex-flow: row;
    /*flex-wrap: nowrap;*/
    overflow-x: auto;
    overflow-y: hidden;
    margin: auto 1em;

    .col {
      height: calc(100vh - 34px);
      flex: 0 0 auto;
      margin: 1em;

      flex-direction: column;
    }
  }
}
</style>
<script>
import Card from "../components/Card";
import Column from "../components/Column";
import { mapState } from 'vuex';
import boardSub from '../gql-subscriptions/board';

export default {
  components: { Column, Card },
  props: {
    title: ""
  },
  computed: {
    ...mapState(['board']),
  },
  data() {
    return {
      boardId: this.$route.query.board_id,
      getBoard: '',
      loading: 0,
      columns:[],
      userIdentity: localStorage.getItem('useridentity'),
    };
  },
  async mounted() {
    this.boardId = await this.$route.query.board_id;
    this.userIdentity = await localStorage.getItem('useridentity');

    await this.$store.dispatch('fetchBoard', [parseInt(this.boardId), this.userIdentity]);
    await this.$store.dispatch('getCommentsByBoard', [this.userIdentity, parseInt(this.boardId)]);

  },
  apollo: boardSub
};
</script>

<style>
.col {
  align-items: normal !important;
}
</style>

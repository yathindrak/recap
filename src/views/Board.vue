<template>
  <div class="board">
    <vs-row class="row" v-if="board.columns !== undefined">
      <vs-col class="col" v-for="column in board.columns" :key="column.id" vs-type="flex" vs-justify="center"
              vs-align="center" vs-lg="3" vs-sm="6" vs-xs="12">
        <column :name="column.name" :description="column.description">
          <card v-for="card in column.cards" :key="card.id" :name="card.name" :description="card.description" />
          <!--<card name="123" description="12342rdsfz" />-->
          <!--<card name="123" description="12342rdsfz" />-->
          <!--<card name="123" description="12342rdsfz" />-->
          <!--<card name="123" description="12342rdsfz" />-->
          <!--<card name="123" description="12342rdsfz" />-->
          <!--<card name="123" description="12342rdsfz" />-->
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
    };
  },
  async mounted() {
    let x = await this.$route.query.board_id;
    // Get board id as query params
    // this.$apollo.queries.getBoard.refetch();
    console.log('ash'+ this.$route.query.board_id);

    this.$store.dispatch('fetchBoard', x);

  }
};
</script>

<style>
.col {
  align-items: normal !important;
}
</style>

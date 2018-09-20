<template>
  <div class="board">
    <vs-row class="row" v-if="columns !== undefined">
      <vs-col class="col" v-for="column in columns" :key="column.id" vs-type="flex" vs-justify="center"
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
import gql from "graphql-tag";

export default {
  components: { Column, Card },
  props: {
    title: ""
  },
  data() {
    return {
      boardId: this.$route.query.board_id,
      getBoard: '',
      loading: 0,
      columns:[],
      cards: [
        {
          card_id: 1,
          card_name: "Pending",
          card_descr: "Still have to do these bro :/",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "In Progress",
          card_descr: "WIP :|",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "Completed",
          card_descr: "Yay done :)",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "Completed",
          card_descr: "Yay done :)",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 1,
          card_name: "Pending",
          card_descr: "Still have to do these bro :/",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "In Progress",
          card_descr: "WIP :|",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "Completed",
          card_descr: "Yay done :)",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "Completed",
          card_descr: "Yay done :)",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 1,
          card_name: "Pending",
          card_descr: "Still have to do these bro :/",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "In Progress",
          card_descr: "WIP :|",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "Completed",
          card_descr: "Yay done :)",
          order_num: null,
          board_id: 1
        },
        {
          card_id: 2,
          card_name: "Completed",
          card_descr: "Yay done :)",
          order_num: null,
          board_id: 1
        }
      ]
    };
  },
  apollo: {
    $query: {
      loadingKey: 'loading',
    },
    // Query with parameters
    getBoard: {
      // gql query
      query: gql`query getBoard($id: Int!) {
      getBoard(id: $id){
        name
        description
        columns{
          id,
          name,
          description,
          cards{
            id,
            name,
            description
          }
        }
      }
      }`,
      // Static parameters
      variables: {
        id: 1,
      },
      update: function(data) {
        console.log(data.getBoard);
        this.columns = data.getBoard.columns;
      }
    },

  },
  async mounted() {
    let x = 1
    // Get board id as query params
    // this.$apollo.queries.getBoard.refetch();
    console.log('ash')
    setTimeout(()=>  {
      // this.$store.dispatch('fetchBoard', x);
      // console.log('IDZ' + JSON.stringify(this.$apolloData.data.getBoard.columns));
      // this.columns = this.$apolloData.data.getBoard.columns;
    },1000)
  }
};
</script>

<style>
.col {
  align-items: normal !important;
}
</style>

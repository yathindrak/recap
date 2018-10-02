<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" vs-type="line" vs-color="primary" vs-icon="edit"></vs-button>
    <vs-popup class="holamundo font" title="Edit Board" :active.sync="popupActivo">

      <div class="font">
        <vs-input class="full-width" vs-label-placeholder="Board Name" v-model="board_name"/><br>
        <vs-input vs-label-placeholder="Description" v-model="board_descr"/><br>
        <vs-button vs-color="success" vs-type="border" vs-icon="done" @click="editBoard()">Done</vs-button>
      </div>

    </vs-popup>
  </div>
</template>

<script>

  import gql from "graphql-tag";

  export default {
    name: "EditBoardModal",
    props: {
      board: {
        type: Object
      }
    },
    data() {
      return {
        popupActivo: false,
        board_id: "",
        board_name: "",
        board_descr: ""
      };
    },
    apollo: {
      // Subscriptions
      $subscribe: {
        boardEdited: {
          query: gql`subscription {
          boardEdited{
            id
          }
        }`,
          // Result hook
          result() {
            this.$store.dispatch('fetchBoardList');
          },
        },
        },
      },
    mounted() {
      if (this.board) {
        this.board_id = this.board.id;
        this.board_name = this.board.name;
        this.board_descr = this.board.description;
      }
    },
    methods: {
      async editBoard() {

        if (!this.board_name) {
          this.board_name ='';
          this.board_descr = '';
          this.popupActivo = false;
          return;
        }

        await this.$store.dispatch('updateBoard', [parseInt(this.board_id), this.board_name, this.board_descr]);
        this.popupActivo = false;
      },
    },
  };
</script>
<style>
  .vs-con-input-label {
    width: 100% !important;
  }

  .font {
    font-family: "Noto Sans", Arial, sans-serif !important;
  }
</style>

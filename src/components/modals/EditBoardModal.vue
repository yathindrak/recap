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
        board_name: "",
        board_descr: ""
      };
    },
    mounted() {
      console.log(JSON.stringify(this.board));

      if (this.board) {
        this.board_name = this.board.name;
        this.board_descr = this.board.description;
      }
    },
    methods: {
      async editBoard() {
        // await this.$store.dispatch('addBoard', [this.board_name, this.board_descr]);
        // this.createBoard(this.board_name, this.board_descr);
        this.board_name ='';
        this.board_descr = '';
        this.popupActivo = false;
        // for now reload the page
        // location.reload()
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

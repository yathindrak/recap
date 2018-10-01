<template lang="html">
  <div class="centerx">
    <vs-button @click="popupActivo=true" vs-color="success" vs-icon="note_add" vs-type="filled">Add Board</vs-button>
    <vs-popup class="holamundo font" title="Add Board" :active.sync="popupActivo">

      <div class="font">
        <vs-input class="full-width" vs-label-placeholder="Board Name" v-model="board_name"/><br>
        <vs-input vs-label-placeholder="Description" v-model="board_descr"/><br>
        <vs-button vs-color="success" vs-type="border" vs-icon="done" @click="addBoard()">Done</vs-button>
      </div>

    </vs-popup>
  </div>
</template>

<script>

  export default {
    name: "AddBoardModal",
    data() {
      return {
        popupActivo: false,
        board_name: "",
        board_descr: "",
        type: ""
      };
    },
    methods: {
      async addBoard() {
        await this.$store.dispatch('addBoard', [this.board_name, this.board_descr]);
        this.board_name ='';
        this.board_descr = '';
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

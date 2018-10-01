<template lang="html">
  <div class="centerx">
    <vs-button @click="popupActivo=true" vs-color="success" vs-icon="note_add" vs-type="filled">Add Column</vs-button>
    <vs-popup class="holamundo font" title="Add Column" :active.sync="popupActivo">

      <div class="font">
        <vs-input class="full-width" vs-label-placeholder="Column Name" v-model="column_name"/><br>
        <vs-input vs-label-placeholder="Description" v-model="column_descr"/><br>
        <vs-button vs-color="success" vs-type="border" vs-icon="done" @click="addColumn()">Done</vs-button>
      </div>

    </vs-popup>
  </div>
</template>

<script>

  export default {
    name: "AddColumnModal",
    props: {
      userIdentity: String,
    },
    data() {
      return {
        boardId: this.$route.query.board_id,
        popupActivo: false,
        column_name: "",
        column_descr: "",
        type: "",
        order_num:0
      };
    },
    methods: {
      async addColumn() {
        const useridentity = await localStorage.getItem('useridentity');
        await this.$store.dispatch('addColumn', [parseInt(this.boardId), this.column_name, this.column_descr, this.order_num, useridentity]);
        this.column_name ='';
        this.column_descr = '';
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

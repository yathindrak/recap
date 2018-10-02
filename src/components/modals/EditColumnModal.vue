<template lang="html">
  <div class="centerx">
    <vs-button  @click="popupActivo=true" vs-type="line" vs-color="primary" vs-icon="edit"></vs-button>
    <vs-popup class="holamundo font" title="Edit Column" :active.sync="popupActivo">

      <div class="font">
        <vs-input class="full-width" vs-label-placeholder="Column Name" v-model="column_name"/><br>
        <vs-input vs-label-placeholder="Description" v-model="column_descr"/><br>
        <vs-button vs-color="success" vs-type="border" vs-icon="done" @click="editColumn()">Done</vs-button>
      </div>

    </vs-popup>
  </div>
</template>

<script>

  export default {
    name: "EditColumnModal",
    props: {
      column: {
        type: Object
      }
    },
    data() {
      return {
        boardId: this.$route.query.board_id,
        popupActivo: false,
        column_id: "",
        column_name: "",
        column_descr: ""
      };
    },
    mounted() {
      if (this.column) {
        this.column_id = this.column.id;
        this.column_name = this.column.name;
        this.column_descr = this.column.description;
      }
    },
    methods: {
      async editColumn() {
        let userIdentity = await localStorage.getItem('useridentity');
        await this.$store.dispatch('updateColumn', [parseInt(this.column_id), this.column_name,
        this.column_descr, parseInt(this.boardId), userIdentity]);
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

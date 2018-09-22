<template lang="html">
    <div class="centerx">
      <vs-button @click="openModal()" vs-color="success" vs-type="flat" vs-icon="playlist_add"></vs-button>
        <vs-popup class="holamundo font"  title="Add Card" :active.sync="popupActivo">

            <div class="font">
                <vs-input class="full-width" vs-label-placeholder="Card Name" v-model="card_name"/><br>
                <vs-input vs-label-placeholder="Description" v-model="card_descr"/><br>
                <vs-button vs-color="success" vs-type="border" vs-icon="done" @click="addCard()">Done</vs-button>
            </div>

        </vs-popup>
    </div>
</template>

<script>
export default {
  name: "AddCardModal",
  props: {
    columnId: '',
  },
  data() {
    return {
      popupActivo: false,
      boardId: this.$route.query.board_id,
      card_name: "",
      card_descr: "",
      order_num: 0 //hard coded
    };
  },
  methods: {
    openModal() {
      this.popupActivo=true
    },
    async addCard() {
      await this.$store.dispatch('addCard', [parseInt(this.columnId), this.card_name, this.card_descr, this.order_num, parseInt(this.boardId)]);
      this.card_name ='';
      this.card_descr = '';
      this.popupActivo = false;
    },
  }
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

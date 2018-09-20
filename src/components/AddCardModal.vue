<template lang="html">
    <div class="centerx">
      <vs-button @click="popupActivo=true" vs-color="success" vs-type="flat" vs-icon="playlist_add"></vs-button>
        <vs-popup class="holamundo font"  title="Add Card" :active.sync="popupActivo">

            <div class="font">
                <vs-input class="full-width" vs-label-placeholder="Card Name" v-model="card_name"/><br>
                <vs-input vs-label-placeholder="Description" v-model="card_descr"/><br>
                <vs-button vs-color="success" vs-type="border" vs-icon="done">Done</vs-button>
            </div>

        </vs-popup>
    </div>
</template>

<script>
export default {
  name: "AddCardModal",
  data() {
    return {
      popupActivo: false,
      card_name: "",
      card_descr: ""
    };
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

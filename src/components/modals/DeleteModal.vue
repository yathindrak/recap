<template lang="html">
    <div class="centerx">
    </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: ["bus", "type"],
  data: () => ({
    activeConfirm: false,
  }),
  mounted() {
    this.bus.$on("confDelete", this.openConfirm);
  },
  methods: {
    openConfirm(objectParams) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: `Are you sure you want to delete this ${this.item}`,
        accept: this.acceptAlert(objectParams)
      });
    },
    acceptAlert(objectParams) {
      console.log(objectParams);
      if(!objectParams){
        return;
      }

      if (objectParams.type === "delete-card") {

        console.log('Card deleted id:' , objectParams.id);
        // this.$store.dispatch('deleteCard', [parseInt(objectParams.id), objectParams.boardId]);
      }

      this.$vs.notify({
        color: "danger",
        title: "Deleted Item",
        text: "The item was successfully deleted"
      });
    }
  }
};
</script>

<template lang="html">
    <div class="centerx">
    </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: ["bus", "type"],
  data: () => ({
    activeConfirm: false
  }),
  mounted() {
    this.bus.$on("confDelete", this.openConfirm);
  },
  methods: {
    openConfirm() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: `Are you sure you want to delete this ${this.item}`,
        accept: this.acceptAlert
      });
    },
    acceptAlert() {
      this.$vs.notify({
        color: "danger",
        title: "Deleted Item",
        text: "The item was successfully deleted"
      });
    }
  }
};
</script>

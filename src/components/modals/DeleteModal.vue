<template lang="html">
  <div class="centerx">
    <vs-button class="font" vs-type="flat" @click="openAlert('danger')" vs-color="primary" vs-icon="delete">
    </vs-button>
  </div>
</template>

<script>

  export default {
    name: "DeleteModal",
    props: {
      type:'',
      boardId:'',
      columnId:'',
      cardId:'',
      userIdentity:'',
    },
    data:()=>({
      colorAlert:'primary',
      titleAlert:'Alert',
      activeAlert:false,
      valueInput:'',
    }),
    methods:{
      openAlert(color){
        this.colorAlert = color || this.getColorRandom();
        this.$vs.dialog({
          color:this.colorAlert,
          title: `Delete ${this.type}`,
          text: 'Are you sure, you want to delete?',
          accept:this.acceptAlert
        })
      },
      async acceptAlert(){
        const user = await this.userIdentity;
        if (this.type === 'card') {
          await this.$store.dispatch('deleteCard', [parseInt(this.cardId), parseInt(this.boardId)], user);
        } else if (this.type === 'board') {
          await this.$store.dispatch('deleteBoard', [parseInt(this.boardId)], user);
        } else if (this.type === 'column') {
          await this.$store.dispatch('deleteColumn', [parseInt(this.columnId), user, parseInt(this.boardId)]);
        }

        this.$vs.notify({
          color:this.colorAlert,
          title: `Deleted ${this.type}`,
          text:''
        })
      },
      getColorRandom(){
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
        return `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      },
    }
  }
</script>

<style>

  .font {
    font-family: "Noto Sans", Arial, sans-serif !important;
  }
</style>

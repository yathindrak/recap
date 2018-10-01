<template>
    <vs-card class="card">
        <div slot="header">
            <h3>
                {{this.name}}
            </h3>
        </div>
        <div>
            <span>{{this.description}}</span>
        </div>
        <div class="footer" slot="footer">
            <vs-row vs-justify="flex-end">
                <!--<vs-button vs-type="gradient" vs-color="primary" vs-icon="thumb_up"></vs-button>-->

              <vs-button v-if="!isLiked" v-on:click="this.vote" vs-type="line" vs-color="primary" vs-icon="star_border"></vs-button>
              <vs-button v-if="isLiked" v-on:click="this.vote" vs-type="line" vs-color="primary" vs-icon="star"></vs-button>
                <vs-button vs-type="flat" vs-color="primary" vs-icon="edit" @click.prevent="confEdit"></vs-button>
                <!--<vs-button vs-type="flat" vs-color="primary" vs-icon="delete" :type="type" @click.prevent="confDelete">-->
                <!--</vs-button>-->
              <DeleteModal type="card" :boardId="boardId" :userIdentity="userIdentity" :cardId="cardId"></DeleteModal>
            </vs-row>
        </div>
        <EditCardModal v-bind:cardId="this.cardId" v-bind:name="this.name" v-bind:description="this.description" v-bind:comments="this.comments" :bus="bus"></EditCardModal>
    </vs-card>
</template>

<script>
import EditCardModal from "@/components/modals/EditCardModal";
import DeleteModal from "@/components/modals/DeleteModal";

import Vue from "vue";

export default {
  name: "Card",
  components: { DeleteModal, EditCardModal },
  data: function() {
    return {
      type: "card",
      boardId: this.$route.query.board_id,
      userIdentity: localStorage.getItem('useridentity'),
      bus: new Vue(),
    };
  },
  props: {
    cardId: '',
    columnId: '',
    name: String,
    isLiked: Boolean,
    description: String,
    comments: ''
  },
  methods: {
    confEdit() {
      this.bus.$emit("confEdit");
    },
    async vote() {
      let userIdentity = await localStorage.getItem('useridentity');
      if (!userIdentity) {
        this.$router.push({ name: "home"});
      }

      if (this.isLiked) {
        // dislike
        this.$store.dispatch('removeStarCard', [parseInt(this.cardId), userIdentity, parseInt(this.boardId)]);
      } else {
        // like
        await this.$store.dispatch('starCard', [parseInt(this.cardId), userIdentity, !this.isLiked, parseInt(this.boardId)]);
        const tt = await this.$store.dispatch('getVoteCardsByUser', [userIdentity, parseInt(this.boardId)]);
      }

    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  .footer {
    -webkit-transform: translateY(-20%);
    transform: translateY(-20%);
    padding: 1em 0;
    overflow: inherit;
  }
}
</style>

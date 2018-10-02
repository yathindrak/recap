<template>
    <vs-card class="tile">
        <div  v-on:click="this.goToBoard">
        <div slot="header">
            <h3>
                {{this.name}}
            </h3>
        </div>
        <div>
            <span>{{this.description}}</span>
        </div>
        </div>
        <vs-button v-if="!isLiked" v-on:click="this.vote" vs-type="line" vs-color="primary" vs-icon="star_border"></vs-button>
        <vs-button v-if="isLiked" v-on:click="this.vote" vs-type="line" vs-color="primary" vs-icon="star"></vs-button>
         <!--<vs-button vs-type="line" vs-color="primary" vs-icon="edit"></vs-button>-->
        <EditBoardModal :board="{id: this.id, name: this.name, description: this.description}" />
        <DeleteModal type="board" :boardId="id" :userIdentity="userIdentity"></DeleteModal>
    </vs-card>
</template>

<script>
import EditBoardModal from './modals/EditBoardModal';
import DeleteModal from "@/components/modals/DeleteModal";

export default {
  name: "BoardTile",
  components: { EditBoardModal, DeleteModal },
  props: {
    id: String,
    name: String,
    description: String,
    isLiked: Boolean
  },
  data() {
    return {
      userIdentity: localStorage.getItem('useridentity'),
    }
  },
  methods: {
    goToBoard() {
      this.$router.push({ name: "board", query: { board_id: this.id }, params: { title: "test title" } });
    },
    vote() {
      this.userIdentity = localStorage.getItem('useridentity');
      if (!this.userIdentity) {
        this.$router.push({ name: "home"});
      }

      if (this.isLiked) {
        // dislike
        this.$store.dispatch('removeStarBoard', [parseInt(this.id), this.userIdentity]);
      } else {
        // like
        this.$store.dispatch('starBoard', [this.userIdentity, !this.isLiked, parseInt(this.id)]);
      }
    }
  }
};
</script>

<style scoped>
.tile {
  width: 100vh;
  cursor: pointer;
}

.boardTile {
}
</style>

<template>
    <!--<router-link-->
            <!--class="boardTile"-->
            <!--:to="{ name: 'board' }">-->

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
        <vs-button vs-type="line" vs-color="primary" vs-icon="star_border"></vs-button>
        </div>
    </vs-card>
    <!--</router-link>-->
</template>

<script>
export default {
  name: "BoardTile",
  props: {
    id: String,
    name: String,
    description: String
  },
  methods: {
    goToBoard() {
      this.$router.push({ name: "board", query: { board_id: this.id }, params: { title: "test title" } });
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

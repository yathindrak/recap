<template>
    <div class="nav-main">
        <vs-navbar :type="type" v-model="activeItem" class="nav-bar">
            <vs-button vs-type="flat" vs-radius="100%"
                       v-if="this.$route.path==='/board'"
                       vs-icon="arrow_back" v-on:click="gotoBoards()">
            </vs-button>

            <vs-navbar-title>
                <em>MathXL</em> Collaborator
            </vs-navbar-title>
            <AddBoardModal
                    id="add-board-btn"
                    v-if="this.$route.path==='/'"
            >

            </AddBoardModal>
            <!--<vs-button vs-color="success" id="add-board-btn" vs-type="filled" vs-icon="note_add">Add Board</vs-button>-->
        </vs-navbar>
    </div>
</template>
<script>
import AddBoardModal from "@/components/AddBoardModal.vue";

export default {
  components: { AddBoardModal },
  data: () => ({
    activeItem: 0,
    type: "gradient"
  }),
  methods: {
    gotoBoards() {
      // this.$store.dispatch('fetchBoardList');
      this.$router.push("/");
    }
  }
};
</script>

<style>
#add-board-btn {
  position: absolute;
  right: 2px;
  top: 1px;
}
</style>

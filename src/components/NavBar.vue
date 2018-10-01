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
          <AddColumnModal
                    id="add-col-btn"
                    userIdentity="userIdentity"
                    v-if="this.$route.path==='/board'"
            >

            </AddColumnModal>
            <!--<vs-button vs-color="success" id="add-board-btn" vs-type="filled" vs-icon="note_add">Add Board</vs-button>-->
        </vs-navbar>
    </div>
</template>
<script>
import AddBoardModal from "@/components/modals/AddBoardModal.vue";
import AddColumnModal from "@/components/modals/AddColumnModal.vue";

export default {
  components: { AddBoardModal, AddColumnModal },
  data: () => ({
    activeItem: 0,
    userIdentity: localStorage.getItem('useridentity'),
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
#add-board-btn , #add-col-btn{
  position: absolute;
  right: 2px;
  top: 1px;
}
</style>

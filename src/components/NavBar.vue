<template>
    <div class="nav-main">
        <vs-navbar :type="type" v-model="activeItem" class="nav-bar">
            <vs-button vs-type="flat" vs-radius="100%"
                       v-if="this.$route.path==='/board'"
                       vs-icon="arrow_back" v-on:click="gotoBoards()">
            </vs-button>

            <vs-navbar-title>
                <em>{{ team_name }}</em> {{app_name}}
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
    type: "gradient",
    app_name: process.env.APP_NAME,
    team_name: process.env.TEAM_NAME
  }),
  methods: {
    gotoBoards() {
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

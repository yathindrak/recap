<template>
    <div>
    <vs-card class="column">
        <div slot="header">

            <vs-row>
              <AddCardModal :columnId="columnId"></AddCardModal>
              <EditColumnModal :column="{id: columnId, name: name, description: description}" ></EditColumnModal>
              <DeleteModal type="column" :boardId="boardId" :columnId="columnId" :userIdentity="userIdentity"></DeleteModal>
            </vs-row>

            <h3>
                {{this.name}}
            </h3>
            <h5>
                {{this.description}}
            </h5>
        </div>
        <div class="content">
            <slot />
        </div>
    </vs-card>
    </div>
</template>

<script>
import AddCardModal from "./modals/AddCardModal";
import EditColumnModal from './modals/EditColumnModal';
import DeleteModal from './modals/DeleteModal';

export default {
  name: "Column",
  components: { AddCardModal,EditColumnModal, DeleteModal },
  props: {
    boardId: '',
    columnId: '',
    name: String,
    description: String
  },
  data() {
    return {
      newcard: "",
      userIdentity: localStorage.getItem('useridentity'),
    };
  },
};
</script>

<style lang="scss" scoped>
.column {
  height: calc(100vh - 34px);
  flex: 0 0 auto;
  background-color: #f0f0f0;
  box-shadow: none;
  margin: 1em 1em;
  padding: 0.5em 1em 1.5em 1em;

  .content {
    height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .add-card {
    width: 70%;
  }
  .font {
    font-family: "Noto Sans", Arial, sans-serif !important;
  }
}
</style>

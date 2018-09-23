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
                <vs-button vs-type="gradient" vs-color="primary" vs-icon="thumb_up"></vs-button>
                <vs-button vs-type="flat" vs-color="primary" vs-icon="edit" @click.prevent="confEdit"></vs-button>
                <vs-button vs-type="flat" vs-color="primary" vs-icon="delete" :type="type" @click.prevent="confDelete">
                </vs-button>
            </vs-row>
        </div>
        <EditCardModal v-bind:cardId="this.cardId" v-bind:name="this.name" v-bind:description="this.description" :bus="bus"></EditCardModal>
        <DeleteModal :bus="bus" ref="form"></DeleteModal>
    </vs-card>
</template>

<script>
import DeleteModal from "@/components/modals/DeleteModal";
import EditCardModal from "@/components/EditCardModal";

import Vue from "vue";

export default {
  name: "Card",
  components: { DeleteModal, EditCardModal },
  data: function() {
    return {
      type: "card",
      boardId: this.$route.query.board_id,
      bus: new Vue()
    };
  },
  props: {
    cardId: '',
    columnId: '',
    name: String,
    description: String
  },
  methods: {
    confEdit() {
      this.bus.$emit("confEdit");
    },
    confDelete() {
      this.bus.$emit("confDelete",
        {
          type: 'delete-card',
          id: this.cardId,
          boardId: this.boardId
        }
        );
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

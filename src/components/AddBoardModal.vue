<template lang="html">
    <div class="centerx">
        <vs-button @click="popupActivo=true" vs-color="success" vs-icon="note_add" vs-type="filled">Add Board</vs-button>
        <vs-popup class="holamundo font" title="Add Board" :active.sync="popupActivo">

            <div class="font">
                <vs-input class="full-width" vs-label-placeholder="Board Name" v-model="board_name"/><br>
                <vs-input vs-label-placeholder="Description" v-model="board_descr"/><br>
                <vs-button vs-color="success" vs-type="border" vs-icon="done" @click="addBoard()">Done</vs-button>
            </div>

        </vs-popup>
    </div>
</template>

<script>
import gql from "graphql-tag";

  export default {
  name: "AddBoardModal",
  data() {
    return {
      popupActivo: false,
      board_name: "",
      board_descr: ""
    };
  },
  methods: {
    createBoard(board_name, board_descr) {

      // Call to the graphql mutation
      this.$apollo.mutate({
        // Query
        mutation: gql`mutation ($name: String!, $description: String!) {
        createBoard(name: $name, description: $description) {
          ok
          board{
            id
            name
            description
          }
        }
      }`,
        // Parameters
        variables: {
          name: board_name,
          description:board_descr,
        },
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
        update: (store, { data: { newTag } }) => {
          // Read the data from our cache for this query.
          // const data = store.readQuery({ query: TAGS_QUERY })
          // // Add our tag from the mutation to the end
          // data.tags.push(newTag)
          // // Write our data back to the cache.
          // store.writeQuery({ query: TAGS_QUERY, data })
        },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly and the user be happy
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   addTag: {
        //     __typename: 'Tag',
        //     id: -1,
        //     label: newTag,
        //   },
        // },
      }).then((data) => {
        // Result
        console.log(data)
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        // this.newTag = newTag
      })
    },
    addBoard() {
      console.log(this.board_name + ' : ' + this.board_descr);
      this.createBoard(this.board_name, this.board_descr);
      this.board_name ='';
      this.board_descr = '';
      this.popupActivo = false;
    },
  },
};
</script>
<style>
.vs-con-input-label {
  width: 100% !important;
}

.font {
  font-family: "Noto Sans", Arial, sans-serif !important;
}
</style>

import gql from "graphql-tag";

export default  {
  $subscribe: {
    // When a tag is added
    cardAdded: {
      query: gql`subscription {
          cardAdded{
            id
          }
        }`,
      // Result hook
      result() {
        this.$store.dispatch('fetchBoard',[parseInt(this.boardId), this.userIdentity]);
      },
    },
    cardEdited: {
      query: gql`subscription {
          cardEdited{
            id
          }
        }`,
      // Result hook
      result() {
        this.$store.dispatch('fetchBoard',[parseInt(this.boardId), this.userIdentity]);
      },
    },
    cardDeleted: {
      query: gql`subscription {
          cardDeleted{
            id
          }
        }`,
      // Result hook
      result() {
        this.$store.dispatch('fetchBoard',[parseInt(this.boardId), this.userIdentity]);
      },
    },
    columnAdded: {
      query: gql`subscription {
          columnAdded{
            id
          }
        }`,
      // Result hook
      result() {
        this.$store.dispatch('fetchBoard',[parseInt(this.boardId), this.userIdentity]);
      },
    },
    columnEdited: {
      query: gql`subscription {
          columnEdited{
            id
          }
        }`,
      // Result hook
      result() {
        this.$store.dispatch('fetchBoard',[parseInt(this.boardId), this.userIdentity]);
      },
    },
  },
}

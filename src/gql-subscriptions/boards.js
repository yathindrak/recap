import gql from "graphql-tag";

export default {
  $subscribe: {
    // When a tag is added
    tagAdded: {
      query: gql`subscription {
          boardAdded{
            id
          }
        }`,
      // Result hook
      result() {
        console.log('SOMEONE ADDED A BOARD');
        this.$store.dispatch('fetchBoardList');
      },
    },
  },
}

import gql from 'graphql-tag';
import {apolloClient} from '../main';
import { arrangeCardVotes, arrangeComments } from "../utils/dataHandler";

export default {

  async getStarredBoards({ commit }, useridentity) {
    const response = await apolloClient.query({
      query: gql`
        query getStarredBoardsByUser($useridentity: String!) {
          getStarredBoardsByUser(useridentity: $useridentity){
            is_voted
            boardId
          }
      }
      `,
      variables: { useridentity: useridentity },
      update: function(data) {
      }
    });

    // starred board ids
    let boardIds = [];

    response.data.getStarredBoardsByUser.map(item=> {
      boardIds.push(item.boardId);
    });
    return boardIds;
  },

  async fetchBoard({ commit, dispatch }, data) {
    const response = await apolloClient.query({
      query: gql`
        query getBoard($id: Int!) {
          getBoard(id: $id){
            name
            description
            columns{
              id,
              name,
              description,
              cards{
                id,
                name,
                description
              }
            }
          }
      }
      `,
      variables: {
        id: data[0],
        useridentity: data[1],
      },

    });

    const boardId = data[0];
    const userIdentity= data[1];
    const votesOfCards = await dispatch('getVoteCardsByUser', [userIdentity.toString(), parseInt(boardId)]);
    const comments = await dispatch('getCommentsByBoard', [userIdentity.toString(), parseInt(boardId)]);
    const votes = await dispatch('getVoteCardsByBoard', [parseInt(boardId)]);

    // add comments for each card
    response.data.getBoard.columns.map(column => {
      column.cards.map(card => {

        votes.map(vote => {
          if(parseInt(card.id) === vote.card) {
            card.likes_count = vote.likes;
          }
        });

        comments.map(comment => {
          if(parseInt(card.id) === comment.card) {
            card.comments = comment.comments;
            card.comments = comment.comments;
          }
        });

        if (votesOfCards.includes(parseInt(card.id))) {
          card.isLiked = true;
        } else {
          card.isLiked = false;
        }
      })
    });

    commit('setBoard', response.data.getBoard);
  },

  async logUser({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($useridentity: String!) {
        login(useridentity: $useridentity) {
          ok
          token
          refreshToken
          errors{
              path
              message
            }
        }
      }
      `,
      variables: {
        useridentity: data[0],
      },
      update: function(data) {
      },
    });

    localStorage.setItem('token', response.data.login.token);
    localStorage.setItem('refreshToken', response.data.login.refreshToken);
  },
  async fetchBoardList({ commit, dispatch }) {
    const response = await apolloClient.query({
      query: gql`
        query getBoards {
          getBoards {
            id
            name
            description
          }
        }
      `,
    });

    const userIdentity = localStorage.getItem('useridentity');
    const boards = response.data.getBoards;
    if (userIdentity) {
      const starredBoardIds = await dispatch('getStarredBoards', userIdentity);

      // add a true property for isLiked in vuex boards
      boards.map(board=> {

        if (starredBoardIds.includes(parseInt(board.id))) {
          board.isLiked = true;
        } else {
          board.isLiked = false;
        }
      })
    }

    commit('setBoardList', boards);
  },

  async starBoard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($useridentity: String!, $is_voted: Boolean, $boardId: Int!) {
        starBoard(useridentity: $useridentity, is_voted: $is_voted, boardId: $boardId) {
          ok
          star_board{
            is_voted
          }
          errors{
            path
            message
          }
        }
      }
      `,
      variables: {
        useridentity: data[0],
        is_voted: data[1],
        boardId: data[2],
      },
      update: function(data) {
      },
    });

    dispatch('fetchBoardList');
  },

  async starCard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($cardId:Int!, $useridentity: String!, $is_voted: Boolean, $boardId: Int!) {
        starCard(cardId: $cardId, useridentity: $useridentity, is_voted: $is_voted, boardId: $boardId) {
          ok
          vote_card{
            is_voted
            useridentity
            cardId
          }
          errors{
            path
            message
          }
        }
      }
      `,
      variables: {
        cardId: data[0],
        useridentity: data[1],
        is_voted: data[2],
        boardId: data[3],
      },
      update: function(res_data) {
        const useridentity= data[1];
        const board_id = data[3];
        dispatch('fetchBoard',[parseInt(board_id), useridentity]);
      },
    });
  },

  async removeStarCard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($cardId: Int!, $useridentity: String!, $boardId: Int!) {
        removeStarCard(cardId: $cardId, useridentity: $useridentity, boardId: $boardId) {
          ok
          errors{
            path
            message
          }
        }
      }
      `,
      variables: {
        cardId: data[0],
        useridentity: data[1],
        boardId: data[2],
      },
      update: function(res_data) {
        const useridentity= data[1];
        const boardId= data[2];
        dispatch('fetchBoard',[boardId, useridentity]);
      },
    });

    dispatch('fetchBoardList');
  },


  async getVoteCardsByUser({ commit }, data) {
    const response = await apolloClient.query({
      query: gql`
        query getVoteCardsByUser($useridentity: String!, $boardId: Int!) {
          getVoteCardsByUser(useridentity: $useridentity, boardId: $boardId){
            cardId
            boardId
          }
      }
      `,
      variables: {
        useridentity: data[0],
        boardId: data[1],
      },
      update: function(data) {
      }
    });

    // starred board ids
    let cardIds = [];

    response.data.getVoteCardsByUser.map(item=> {
      cardIds.push(item.cardId);
    });
    return cardIds;
  },

  async removeStarBoard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($boardId: Int!, $useridentity: String!) {
        removeStarBoard(boardId: $boardId, useridentity: $useridentity) {
          ok
          errors{
            path
            message
          }
        }
      }
      `,
      variables: {
        boardId: data[0],
        useridentity: data[1],
      },
      update: function(data) {
      },
    });

    dispatch('fetchBoardList');
  },


  async addBoard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($name: String!, $description: String!) {
        createBoard(name: $name, description: $description) {
          ok
          board{
            id
            name
            description
          }
        }
      }
      `,
      variables: {
        name: data[0],
        description: data[1],
      },
      update: function(data) {
        dispatch('fetchBoardList');
      },
    });
  },

  async addColumn({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($boardId: Int!, ,$name: String!, $description: String!, $order_num: Int!) {
        createColumn(boardId: $boardId, name: $name, description: $description, order_num: $order_num) {
          ok
          column{
            id
            name
            description
          }
        }
      }
      `,
      variables: {
        boardId: data[0],
        name: data[1],
        description: data[2],
        order_num: data[3],
        useridentity: data[4]
      },
      update: function(res_data) {
        const boardId = data[0];
        const useridentity= data[4];
        dispatch('fetchBoard', [boardId, useridentity]);
      },
    });
  },

  async addCard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($columnId: Int!, $name: String!, $description: String!, $order_num: Int!) {
        createCard(columnId: $columnId, name: $name, description: $description, order_num: $order_num) {
          ok
          card{
            id
            name
            description
          }
        }
      }
      `,
      variables: {
        columnId: data[0],
        name: data[1],
        description: data[2],
        order_num: data[3],
        useridentity: data[4]
      },
      update: function(res_data) {
        const useridentity = data[4];
        const boardId = data[4];
        dispatch('fetchBoard', [boardId, useridentity]);
      },
    });
  },

  async updateBoard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($id: Int!, $name: String!, $description: String!){
          updateBoard(id:$id, name: $name, description: $description){
            ok
            errors{
              message
            }
          }
        }
      `,
      variables: {
        id: data[0],
        name: data[1],
        description: data[2],
      },
      update: function(data) {
        dispatch('fetchBoardList');
      },
    });
  },

  async updateColumn({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($id: Int!, $name: String!, $description: String!){
          updateColumn(id:$id, name: $name, description: $description){
            ok
            errors{
              message
            }
          }
        }
      `,
      variables: {
        id: data[0],
        name: data[1],
        description: data[2],
      },
      update: function(res_data) {
        let userIdentity = data[4];
        let boardId = data[3];
        if (typeof boardId === "number"){
          boardId = parseInt(boardId)
        }

        if (typeof userIdentity === "string"){
          userIdentity = userIdentity.toString();
        }
        dispatch('fetchBoard', [boardId, userIdentity]);
      },
    });
  },

  async updateCard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($id: Int!, $name: String!, $description: String!){
          updateCard(id:$id, name: $name, description: $description){
            ok
            card{
              name
              description
            }
            errors{
              message
            }
          }
        }
      `,
      variables: {
        id: data[0],
        name: data[1],
        description: data[2],
      },
      update: function(res_data) {
        const boardId = data[3];
        const userIdentity = data[4];
        dispatch('fetchBoard', [boardId, userIdentity]);
      },
    });
  },

  async deleteCard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($id: Int!){
          deleteCard(id:$id){
            ok
            errors{
              message
            }
          }
        }
      `,
      variables: {
        id: data[0],
      },
      update: async function(res_data) {
        const boardId = data[1];
        let userIdentity = data[2];

        if (!userIdentity) {
          userIdentity = await localStorage.getItem('useridentity')
        }

        dispatch('fetchBoard', [boardId, userIdentity]);
      },
    });
  },

  async deleteBoard({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($id: Int!){
          deleteBoard(id:$id){
            ok
            errors{
              message
            }
          }
        }
      `,
      variables: {
        id: data[0],
      },
      update: async function(res_data) {

        dispatch('fetchBoardList');
      },
    });
  },

  async deleteColumn({ commit, dispatch }, data) {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ($id: Int!){
          deleteColumn(id:$id){
            ok
            errors{
              message
            }
          }
        }
      `,
      variables: {
        id: data[0],
      },
      update: async function(res_data) {
      },
    });

    const useridentity = data[1];
    const board_id = data[2];
    dispatch('fetchBoard',[parseInt(board_id), useridentity]);
  },

  async addComment({ commit, dispatch }, data) {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation ($message: String!, $cardId:Int!, $useridentity: String!, $boardId: Int!) {
          addComment(message: $message, cardId: $cardId, useridentity: $useridentity, boardId: $boardId) {
            ok
            comment{
              message
            }
            errors{
              path
              message
            }
          }
        }
        `,
        variables: {
          message: data[0],
          cardId: data[1],
          useridentity: data[2],
          boardId: data[3],
        },
        update: function(res_data) {
        const useridentity = data[2];
        const board_id = data[3];
        dispatch('fetchBoard',[parseInt(board_id), useridentity]);
      },
    });

    const useridentity = data[2];
    const board_id = data[3];
    dispatch('fetchBoard',[parseInt(board_id), useridentity]);
  },

  async getCommentsByBoard({ commit, dispatch }, data) {
    const response = await apolloClient.query({
      query: gql`
        query getCommentsByBoard($boardId: Int!) {
          getCommentsByBoard(boardId: $boardId){
            message
            cardId
          }
      }
      `,
      variables: {
        useridentity: data[0],
        boardId: data[1],
      },
      update: function(data) {
      }
    });

    let comments = response.data.getCommentsByBoard;
    return comments = arrangeComments(comments);
  },

  async getVoteCardsByBoard({ commit, dispatch }, data) {
    const response = await apolloClient.query({
      query: gql`
        query getVoteCardsByBoard($boardId: Int!) {
          getVoteCardsByBoard(boardId: $boardId){
            useridentity
            boardId
            cardId
          }
      }
      `,
      variables: {
        boardId: data[0],
      },
      update: function(data) {
      }
    });

    let votes = response.data.getVoteCardsByBoard;
    return votes = arrangeCardVotes(votes);
  },


  async reorderCol({ commit, dispatch }, data) {

  },



};

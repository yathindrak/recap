// import config from '../config/api';
// import axios from "axios";
import gql from 'graphql-tag';
import {apolloClient} from '../main'

export default {

  async fetchBoard({ commit }, id) {
    // console.log('FETCH BOARD : '+ JSON.stringify(this));
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
      variables: { id: id },
      update: function(data) {
        // this is not get called
        console.log(data);
        // this.columns = data.getBoard.columns;
      }
    });

    console.log(response.data.getBoard)

    // commit('setBook', response.data.book);
  },




  // setCurrentBoard({ commit }, board) {
  //     commit('SET_BOARD', board)
  // },
  // async getBoards({ commit }) {
  //     const boards = await axios.get('/boards', config);
  //     commit('SET_BOARDS', boards.data.boards);
  // },
  // async getCards({ commit }) {
  //     const cards = await axios.get('/cards', config);
  //     commit('SET_CARDS', cards.data.cards);
  // },
  // async getCardByBoard({ commit }, boardId) {
  //     const cards = await axios.get('/cards/'+boardId, config);
  //
  //     commit('SET_CARDS', cards.data.cards);
  // },
  // async getTasksByCard({ commit }, card_id) {
  //     const tasks = await axios.get('/tasks/'+card_id, config);
  //
  //     commit('SET_TASKS', tasks.data.tasks);
  // },
  // async getTasksByBoard({ commit }, board_id) {
  //     const tasks = await axios.get('/tasks/byboard/'+board_id, config);
  //     commit('SET_TASKS_OF_A_BOARD', tasks.data.tasks);
  // },
  // async addBoard({ commit, dispatch }, board) {
  //     let newBoard = await axios.post('/boards', {
  //         board_name:board.board_name,
  //         board_descr:board.board_descr
  //     }, config)
  //      .then(function (response) {
  //          // commit('ADD_BOARD', response.data.result);
  //          dispatch('getBoards');
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  // },
  // async setCards({ commit }, cards) {
  //     // const board = await this.$axios.post('/boards', data);
  //     commit('SET_CARDS', cards);
  // },
  // async addCard({ commit, dispatch }, card) {
  //     let newCard = await axios.post('/cards', {
  //         card_name:card.card_name,
  //         card_descr:card.card_descr,
  //         board_id:card.board_id
  //     }, config)
  //         .then(function (response) {
  //             // commit('ADD_BOARD', response.data.result);
  //             dispatch('getCardByBoard',card.board_id);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // },
  // async addTask({ commit, dispatch }, data) {
  //     // console.log(JSON.stringify(data[0]));
  //     let task = data[0];
  //     let curr_board = data[1];
  //
  //     if (task.task_name === null || task.task_name === undefined || task.task_name === '') {
  //         return;
  //     }
  //     await axios.post('/tasks', task, config)
  //         .then(function (response) {
  //             // commit('ADD_BOARD', response.data.result);
  //             // dispatch('getTasksByCard',card.board_id);
  //             dispatch('getTasksByBoard', curr_board.board_id);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  //     // commit('ADD_TASK', task);
  // },
  // async getBoard({ state, commit }, slug) {
  //     if (state.current.slug !== slug) commit('CLEAR_BOARD');
  //     const board = await this.$axios.get(`/boards/${slug}`);
  //     commit('SET_BOARD', board.data);
  //     commit('SET_BG', board.data.image, { root: true });
  // },
  // async updateTask({ commit, dispatch }, data) {
  //     console.log(JSON.stringify(data[0]))
  //     console.log(JSON.stringify(data[1]))
  //     const tasks = await axios.patch(`/tasks/`, data[0], config);
  //     dispatch('getTasksByBoard',data[1]);
  //
  //
  //     // commit('SET_TASKS_OF_A_BOARD', tasks.data.tasks);
  //
  //     // const updated = await this.$axios.patch(`/boards/${board._id}`, board);
  //     // commit('SET_BOARD', updated.data);
  // },
  // async updateCard({ commit, dispatch }, data) {
  //     const cards = await axios.patch(`/cards/`, data[0], config);
  //     dispatch('getCardByBoard',data[1]);
  //
  //     // commit('SET_TASKS_OF_A_BOARD', tasks.data.tasks);
  //
  //     // const updated = await this.$axios.patch(`/boards/${board._id}`, board);
  //     // commit('SET_BOARD', updated.data);
  // },
  // async updateBoard({ commit, dispatch }, board) {
  //     const cards = await axios.patch(`/boards/`, board, config);
  //     dispatch('getBoards');
  //
  //     // commit('SET_TASKS_OF_A_BOARD', tasks.data.tasks);
  //
  //     // const updated = await this.$axios.patch(`/boards/${board._id}`, board);
  //     // commit('SET_BOARD', updated.data);
  // },
  // async deleteTaskAction({ commit, dispatch }, data) {
  //     const tasks = await axios.delete(`/tasks/`+data[0].task_id, config);
  //     dispatch('getTasksByBoard',data[1]);
  //
  //
  //     // commit('SET_TASKS_OF_A_BOARD', tasks.data.tasks);
  //
  //     // const updated = await this.$axios.patch(`/boards/${board._id}`, board);
  //     // commit('SET_BOARD', updated.data);
  // },
  // async deleteCardAction({ commit, dispatch }, data) {
  //     const cards = await axios.delete(`/cards/`+data[0], config);
  //     dispatch('getCardByBoard',data[1]);
  //
  //
  //     // commit('SET_TASKS_OF_A_BOARD', tasks.data.tasks);
  //
  //     // const updated = await this.$axios.patch(`/boards/${board._id}`, board);
  //     // commit('SET_BOARD', updated.data);
  // },
  //
  //
  // async deleteBoardAction({ commit, dispatch }, id) {
  //     await axios.delete(`/boards/${id}`, config);
  //     dispatch('getBoards');
  // },
  //
  // async likeTask({ commit, dispatch }, task_id) {
  //     await axios.patch(`/tasks/likes/${task_id}/1`,{}, config);
  //     // dispatch('getBoards');
  // },
  // async leaveBoard({ commit }, boardId) {
  //     await this.$axios.patch(`/boards/${boardId}/leave`);
  //     commit('CLEAR_BOARD');
  // },
  // insertCard({ commit, dispatch }, params) {
  //   params.card = { _id: params.cardId };
  //   params.editable = false;
  //   commit('ADD_CARD', params);
  //
  //   dispatch('updateBoard', {
  //     _id: params.boardId,
  //     groups: state.current.groups,
  //   });
  // },
  // async addCard({ commit }, params) {
  //   const card = await this.$axios.post(`/cards/${params.boardId}`);
  //   params.card = card.data;
  //   params.editable = true;
  //   commit('ADD_CARD', params);
  // },
};

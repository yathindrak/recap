import Vue from "vue";

export default {
  ADD_BOARD(state, board) {
    state.boards.push(board);
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  CLEAR_BOARD(state) {
    state.current = {};
  },
  SET_BOARDS(state, boards) {
    state.boards = boards;
  },
  SET_BOARD(state, board) {
    state.current = board;
  },
  SET_GROUPS(state, groups) {
    state.current.groups = groups;
  },
  SET_CARDS(state, cards) {
    state.cards = cards;
  },
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  SET_TASKS_OF_A_BOARD(state, tasks) {
    state.tasks = tasks;
  },
  // SET_CARDS(state, { groupId, cards }) {
  //   const groupState = state.current.groups.find(g => g._id === groupId);
  //   groupState.cards = cards;
  // },
  ADD_GROUP(state, group) {
    state.current.groups.push(group);
  },
  RENAME_GROUP(state, { _id, title }) {
    const groupState = state.current.groups.find(g => g._id === _id);
    if (groupState.title === title) {
      throw new Error("Nothing changed");
    } else {
      groupState.title = title;
    }
  },
  DELETE_GROUP(state, groupId) {
    const index = state.current.groups.findIndex(g => g._id === groupId);

    Vue.delete(state.current.groups, index);
  },
  ADD_CARD(state, card) {
    state.cards.push(card);
  },
  // ADD_CARD(state, {
  //   positionId, card, groupId, editable,
  // }) {
  //   const group = state.current.groups.find(g => g._id === groupId);
  //   const newCard = {
  //     ...card,
  //     editable,
  //     newCard: true,
  //   };
  //   let cardIndex = -1;
  //   if (positionId) cardIndex = group.cards.findIndex(c => c._id === positionId);
  //   if (cardIndex > -1) { group.cards.splice(cardIndex + 1, 0, newCard); } else { group.cards.push(newCard); }
  // },
  RENAME_CARD(state, { groupId, title, _id }) {
    const group = state.current.groups.find(g => g._id === groupId);
    const card = group.cards.find(c => c._id === _id);

    if (card.title === title) {
      throw new Error("Nothing changed");
    } else {
      card.title = title;
    }
    card.editable = false;
  }
};

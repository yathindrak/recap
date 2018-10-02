export default {
  setBoard(state, board) {
    state.board = board;
  },
  setBoardList(state, boards) {
    state.boards = boards;
  },
  addBoard(state, board) {
    state.boards.push(board);
  },
};

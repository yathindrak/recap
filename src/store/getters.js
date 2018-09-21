export default {
  board: state => state.board,
  boards: state => state.boards,


  cards: state => state.cards,

  getListsByBoard: state => boardId =>
    Object.values(state.lists).filter(list => list.board === boardId),

  getTasksFromList: state => name =>
    Object.values(state.tasks).filter(task => task.columnName === name),

  getTasksForACard: state => card_id =>
    Object.values(state.tasks).filter(task => task.card_id === card_id)
};

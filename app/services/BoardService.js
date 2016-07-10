import Chance from 'chance';
import firebase from './firebase';

const BoardService = ($q) => {
  let boardsRef;
  const generateBoardID = () => chance.hash({
    length: 5
  });

  return {
    connect: () => {
      boardsRef = firebase.database().ref('boards');
    },
    create: (name) => {
      const boardID = generateBoardID();
      const deferred = $q.defer();

      boardsRef.child(boardID).set({
        hash: boardID,
        name
      }, (error) => {
        if (error) deferred.reject();
        deferred.resolve(boardID);
      });

      return deferred.promise;
    },
    findById: (boardID) => {
      const deferred = $q.defer();

      const board = boardsRef.child(boardID);

      if (board) deferred.resolve(board);

      deferred.reject();

      return deferred.promise;
    }
  };
};

BoardService.$inject = ['$q'];

export default BoardService;

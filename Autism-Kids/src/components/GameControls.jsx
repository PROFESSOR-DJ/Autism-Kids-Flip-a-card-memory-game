import React from 'react';

const GameControls = ({ moves, gameCompleted, onReset }) => {

  return (
    <div className="game-controls text-center mt-5">

      <div className="stats mb-3">

        
        <h3 className="text-info">Moves: {moves}</h3>
      </div>
      
      {gameCompleted && (
        <div className="completion-message alert alert-success">
          <h2>Congratulations! 🎉</h2>
          <p>You completed the game in {moves} moves!</p>
        </div>
      )}
      
      <button 
        className="btn btn-primary btn-lg px-5 py-3"
        onClick={onReset}
        aria-label="Restart game"
      >
        {gameCompleted ? 'Play Again' : 'Restart Game'}
      </button>
    </div>
  );
};

export default GameControls;
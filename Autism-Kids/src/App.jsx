import React from 'react';
import GameBoard from './components/GameBoard';
import './styles/game.css';

function App() {
  return (
    <div className="app-container bg-light">
      <header className="text-center py-4">
        <h1 className="display-4 text-primary">Memory Match</h1>
        <p className="lead text-muted">Flip cards to find matching pairs!</p>
      </header>
      
      <main className="container py-4">
        <GameBoard />
      </main>
      
      <footer className="text-center py-3 text-muted">
        Designed for Autism Learning by Dhiraaj K V
      </footer>
    </div>
  );
}

export default App;
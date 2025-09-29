import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import GameControls from './GameControls';

const allEmojis = ['🐶','🐱','🐰','🦊','🐻','🐼','🦁','🐯','🐨','🐸','🐵','🐷'];

const videoMap = {
  '🐶': '/videos/dog.mp4',
  '🐱': '/videos/cat.mp4',
  '🐰': '/videos/rabbit.mp4',
  '🦊': '/videos/fox.mp4',
  '🐻': '/videos/bear.mp4',
  '🐼': '/videos/panda.mp4',
  '🦁': '/videos/lion.mp4',
  '🐯': '/videos/tiger.mp4',
  '🐨': '/videos/koala.mp4',
  '🐸': '/videos/frog.mp4',
  '🐵': '/videos/monkey.mp4',
  '🐷': '/videos/pig.mp4',
};

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(null);
  const [cardCount, setCardCount] = useState(6);

  const videoRef = useRef(null);



  //initialize
  useEffect(() => {
    resetGame(cardCount);
  }, [cardCount]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].content === cards[second].content) {
        const emoji = cards[first].content;
        setMatched([...matched, first, second]);
        setVideoPlaying(emoji);
      }
      setTimeout(() => {
        setFlipped([]);
      }, 1000);
    }
  }, [flipped, cards, matched]);



  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameCompleted(true);
    }
  }, [matched, cards]);



  useEffect(() => {
    if (videoPlaying && videoRef.current) {
      
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [videoPlaying]);





  const resetGame = (count) => {
    const uniqueCount = count / 2;
    const chosenEmojis = allEmojis.slice(0, uniqueCount);

    const duplicated = [...chosenEmojis, ...chosenEmojis]
      .map((emoji) => ({
        content: emoji,
        uid: Math.random().toString(36).substr(2, 9),
      }))
      .sort(() => Math.random() - 0.5);

    setCards(duplicated);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameCompleted(false);
    setVideoPlaying(null);
  };



  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    setFlipped([...flipped, index]);
    setMoves((prev) => prev + 1);
  };

  return (
    <div className="game-board">

      
      <div className="text-center mb-4">

        <label className="me-2 fw-bold">Number of Cards:</label>
        
        <select
          value={cardCount}
          onChange={(e) => setCardCount(Number(e.target.value))}
          className="form-select d-inline-block w-auto"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={18}>18</option>
        </select>
      </div>

      
      <div className="row justify-content-center">
        {cards.map((card, index) => (
          <div
            key={card.uid}
            className="col-4 col-md-3 col-lg-2 mb-4 d-flex justify-content-center"
          >
            <Card
              item={card}
              isFlipped={flipped.includes(index) || matched.includes(index)}
              onClick={() => handleCardClick(index)}
            />
          </div>
        ))}
      </div>

      <GameControls
        moves={moves}
        gameCompleted={gameCompleted}
        onReset={() => resetGame(cardCount)}
      />

      {/* Video Section */}
      {videoPlaying && (
        <div ref={videoRef} className="video-section text-center mt-5">
          <h4>Related Video for {videoPlaying}</h4>
          <video
            src={videoMap[videoPlaying]}
            autoPlay
            controls
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "10px",
              marginTop: "10px",
            }}
            onEnded={() => setVideoPlaying(null)}
          >
            <source src={videoMap[videoPlaying]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default GameBoard;

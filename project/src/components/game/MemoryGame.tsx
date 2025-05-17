import React, { useState, useEffect } from 'react';
import { saveGameScore, getBestScore } from '../../utils/localStorage';
import { useAuth } from '../../contexts/AuthContext';
import { Brain, Trophy, TimerReset, Medal } from 'lucide-react';

const CARD_PAIRS = 8; // Total of 16 cards
const CARD_SYMBOLS = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🥭', '🍒', '🥝', '🍍'];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const MemoryGame: React.FC = () => {
  const { currentUser } = useAuth();
  const [cards, setCards] = useState<Array<{ id: number; value: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  
  // Initialize the game
  useEffect(() => {
    if (currentUser) {
      const best = getBestScore(currentUser.id);
      setBestScore(best);
    }
    initializeGame();
  }, [currentUser]);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameCompleted]);
  
  // Check for game completion
  useEffect(() => {
    if (matchedPairs === CARD_PAIRS && gameStarted) {
      setGameCompleted(true);
      setGameStarted(false);
      
      // Calculate score - lower is better
      const score = Math.max(1, Math.floor(1000 - (moves * 10) - (timer * 2)));
      
      if (currentUser) {
        saveGameScore(currentUser.id, score);
        
        if (score > bestScore) {
          setBestScore(score);
        }
      }
    }
  }, [matchedPairs, gameStarted, moves, timer, bestScore, currentUser]);
  
  // Handle flipped cards
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      
      const [first, second] = flippedCards;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);
      
      if (firstCard?.value === secondCard?.value) {
        // Match found
        setCards((prev) => 
          prev.map((card) => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards((prev) => 
            prev.map((card) => 
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);
  
  const initializeGame = () => {
    const symbols = shuffleArray(CARD_SYMBOLS).slice(0, CARD_PAIRS);
    const cardPairs = [...symbols, ...symbols];
    const shuffledCards = shuffleArray(cardPairs).map((symbol, index) => ({
      id: index,
      value: symbol,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setGameStarted(false);
    setGameCompleted(false);
  };
  
  const handleCardClick = (id: number) => {
    // Ignore if already flipped/matched or if two cards are already flipped
    const card = cards.find((c) => c.id === id);
    if (card?.isFlipped || card?.isMatched || flippedCards.length >= 2) {
      return;
    }
    
    // Start game on first flip
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Flip the card
    setCards((prev) => 
      prev.map((card) => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards((prev) => [...prev, id]);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="mr-2 text-indigo-600 dark:text-indigo-400" size={24} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Memory Game
          </h2>
        </div>
        
        <button
          onClick={initializeGame}
          className="flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <TimerReset size={16} className="mr-1" /> Reset
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {gameCompleted ? (
          <div className="col-span-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-6 rounded-md text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="text-yellow-500" size={48} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Game Completed!</h3>
            <p>You matched all pairs in {moves} moves and {formatTime(timer)}.</p>
            <p className="mt-1">Your score: <span className="font-bold">{Math.max(1, Math.floor(1000 - (moves * 10) - (timer * 2)))}</span></p>
            
            {bestScore > 0 && (
              <div className="mt-3 flex items-center justify-center">
                <Medal className="text-yellow-500 mr-1" size={18} />
                <span>Best score: {bestScore}</span>
              </div>
            )}
            
            <button
              onClick={initializeGame}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square flex items-center justify-center text-2xl rounded-md transition-all transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rotate-0'
                  : 'bg-indigo-600 dark:bg-indigo-800 text-white rotate-y-180'
              } ${
                card.isMatched ? 'opacity-70' : 'opacity-100'
              } hover:bg-indigo-500 dark:hover:bg-indigo-700`}
              disabled={card.isMatched}
            >
              {card.isFlipped || card.isMatched ? card.value : ''}
            </button>
          ))
        )}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
        <div className="flex items-center">
          <span className="font-medium mr-1">Moves:</span> {moves}
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-1">Pairs:</span> {matchedPairs}/{CARD_PAIRS}
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-1">Time:</span> {formatTime(timer)}
        </div>
      </div>
      
      {bestScore > 0 && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end">
          <Trophy className="text-yellow-500 mr-1" size={14} />
          <span>Best score: {bestScore}</span>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
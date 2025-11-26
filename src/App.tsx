import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleExitGame = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isGameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen onExit={handleExitGame} />
      )}
    </div>
  );
};

export default App;

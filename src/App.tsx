import React, { useState } from "react";
import StartScreen from "./components/StartScreen.tsx";

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isGameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <h2 className="text-3xl font-bold text-green-400">
            🎮 Oyun başladı! (Buraya oyun componenti gelecek)
          </h2>
        </div>
      )}
    </div>
  );
};

export default App;
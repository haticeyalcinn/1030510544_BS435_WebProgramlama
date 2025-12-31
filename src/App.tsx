import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import ModeSelection from "./components/ModeSelection";
import GameScreen from "./components/GameScreen";
import type { GameMode } from "./data/gameModes";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'mode' | 'game'>('start');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const handleStartGame = () => {
    setCurrentScreen('mode');
  };

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setCurrentScreen('game');
  };

  const handleExitGame = () => {
    setCurrentScreen('start');
    setSelectedMode(null);
  };

  const handleBackToMode = () => {
    setCurrentScreen('mode');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentScreen === 'start' && (
        <StartScreen onStartGame={handleStartGame} />
      )}
      {currentScreen === 'mode' && (
        <ModeSelection
          onModeSelect={handleModeSelect}
          onBack={() => setCurrentScreen('start')}
        />
      )}
      {currentScreen === 'game' && selectedMode && (
        <GameScreen
          onExit={handleExitGame}
          onBackToMode={handleBackToMode}
          gameMode={selectedMode}
        />
      )}
    </div>
  );
};

export default App;

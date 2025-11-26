import React from "react";

interface GameScreenProps {
  onExit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onExit }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold text-green-400 mb-6">
        🎮 Oyun Başladı!
      </h2>

      <p className="text-gray-300 mb-4 text-lg">
        Buraya ödevindeki oyun mantığına göre içerik gelecek.
      </p>

      <button
        onClick={onExit}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Oyundan Çık
      </button>
    </div>
  );
};

export default GameScreen;

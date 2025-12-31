import React, { useState } from "react";
import { categories, difficultyLevels } from "../data/gameModes";
import type { GameMode } from "../data/gameModes";
import "./ModeSelection.css";

interface ModeSelectionProps {
  onModeSelect: (mode: GameMode) => void;
  onBack: () => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleDifficultySelect = (difficultyId: string) => {
    setSelectedDifficulty(difficultyId);
  };

  const handleStartGame = () => {
    if (selectedCategory && selectedDifficulty) {
      const category = categories.find(c => c.id === selectedCategory)!;
      const difficulty = difficultyLevels.find(d => d.id === selectedDifficulty)!;

      onModeSelect({ category, difficulty });
    }
  };

  const canStartGame = selectedCategory && selectedDifficulty;

  return (
    <div className="mode-selection-container">
      <div className="mode-selection-card">
        <h1 className="mode-selection-title">
          🎮 Oyun Modu Seç
        </h1>

        {/* Kategori Seçimi */}
        <div className="selection-section">
          <h2 className="section-title">📂 Kategori Seç</h2>
          <p className="section-subtitle">Hangi tür görsellerde oynamak istiyorsun?</p>

          <div className="options-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`option-card ${selectedCategory === category.id ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="option-icon">{category.icon}</div>
                <h3 className="option-title">{category.name}</h3>
                <p className="option-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zorluk Seçimi */}
        <div className="selection-section">
          <h2 className="section-title">⚡ Zorluk Seviyesi</h2>
          <p className="section-subtitle">Kaç zorlukta oynamak istiyorsun?</p>

          <div className="difficulty-grid">
            {difficultyLevels.map((difficulty) => (
              <div
                key={difficulty.id}
                className={`difficulty-card ${difficulty.color} ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
                onClick={() => handleDifficultySelect(difficulty.id)}
              >
                <h3 className="difficulty-title">{difficulty.name}</h3>
                <p className="difficulty-description">{difficulty.description}</p>
                <div className="difficulty-stats">
                  <div className="stat-item">
                    <span className="stat-icon">⏰</span>
                    <span>{difficulty.timeLimit}s</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🎯</span>
                    <span>{difficulty.rounds} round</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💎</span>
                    <span>{difficulty.pointsMultiplier}x puan</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💡</span>
                    <span>{difficulty.hintsEnabled ? 'İpucu açık' : 'İpucu kapalı'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Başlat Butonu */}
        {canStartGame && (
          <div className="start-section">
            <div className="selected-summary">
              <h3>Seçiminiz:</h3>
              <p><strong>Kategori:</strong> {categories.find(c => c.id === selectedCategory)?.name}</p>
              <p><strong>Zorluk:</strong> {difficultyLevels.find(d => d.id === selectedDifficulty)?.name}</p>
            </div>

            <button
              onClick={handleStartGame}
              className="start-game-button"
            >
              🎮 Oyunu Başlat
            </button>
          </div>
        )}

        <button
          onClick={onBack}
          className="mode-back-button"
        >
          ← Ana Menüye Dön
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;

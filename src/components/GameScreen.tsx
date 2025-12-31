import React, { useState, useEffect } from "react";
import { generateRound } from "../data/gameModes";
import type { GameMode } from "../data/gameModes";
import "./GameScreen.css";

interface GameScreenProps {
  onExit: () => void;
  onBackToMode?: () => void;
  gameMode?: GameMode;
  playerName?: string;
}

const GameScreen: React.FC<GameScreenProps> = ({
  onExit,
  onBackToMode,
  gameMode,
  playerName = "Oyuncu"
}) => {
  // Oyun durumu
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [currentRound, setCurrentRound] = useState<{ images: any[], aiIndex: number } | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [hintsShown, setHintsShown] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameMode?.difficulty.timeLimit || 60);
  const [gameActive, setGameActive] = useState(true);

  // İlk round'u oluştur
  useEffect(() => {
    if (gameMode) {
      setCurrentRound(generateRound(gameMode.category.id));
      setTimeLeft(gameMode.difficulty.timeLimit);
    }
  }, [gameMode, round]);

  // Zamanlayıcı
  useEffect(() => {
    if (!gameActive || gameFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          setGameFinished(true);
          setResultMessage("⏰ Süre doldu! Oyun bitti.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, gameFinished]);

  // Görsel seçimi
  const selectImage = (index: number) => {
    if (selectedImage !== null || gameFinished) return;

    setSelectedImage(index);
    const isCorrect = index === currentRound?.aiIndex;

    if (isCorrect) {
      const points = Math.round(100 * (gameMode?.difficulty.pointsMultiplier || 1));
      setScore(prev => prev + points);
      setResultMessage(`🎉 Doğru! ${points} puan kazandın!`);
    } else {
      setResultMessage("❌ Yanlış! AI görseli gösteriliyor.");
    }

    setGameFinished(true);
  };

  // İpucu göster
  const showHint = () => {
    if (!gameMode?.difficulty.hintsEnabled || hintsShown >= 2) return;
    setHintsShown(prev => prev + 1);
  };

  // Yeni round başlat
  const nextRound = () => {
    const maxRounds = gameMode?.difficulty.rounds || 5;
    if (round < maxRounds) {
      setRound(prev => prev + 1);
      setSelectedImage(null);
      setGameFinished(false);
      setResultMessage("");
      setHintsShown(0);
      setTimeLeft(gameMode?.difficulty.timeLimit || 60);
      setGameActive(true);
    } else {
      setResultMessage(`🏆 Oyun tamamlandı! Toplam skor: ${score}`);
    }
  };

  // Oyunu yeniden başlat
  const restartGame = () => {
    setScore(0);
    setRound(1);
    setSelectedImage(null);
    setGameFinished(false);
    setResultMessage("");
    setHintsShown(0);
    setTimeLeft(gameMode?.difficulty.timeLimit || 60);
    setGameActive(true);
  };

  return (
    <div className="game-screen">
      {/* HUD */}
      <div className="game-hud">
        <div className="hud-item">
          <span className="hud-label">Oyuncu</span>
          <span className="hud-value">{playerName}</span>
        </div>

        <div className="hud-item">
          <span className="hud-label">Kategori</span>
          <span className="hud-value">{gameMode?.category.name || 'Genel'}</span>
        </div>

        <div className="hud-item">
          <span className="hud-label">Round</span>
          <span className="hud-value">{round}/{gameMode?.difficulty.rounds || 5}</span>
        </div>

        <div className="hud-item">
          <span className={`hud-label ${timeLeft < 10 ? 'danger' : timeLeft < 30 ? 'warning' : ''}`}>Süre</span>
          <span className={`hud-value timer ${timeLeft < 10 ? 'danger' : timeLeft < 30 ? 'warning' : ''}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="hud-item">
          <span className="hud-label">Skor</span>
          <span className="hud-value score">{score}</span>
        </div>
      </div>

      {/* Oyun Alanı */}
      <div className="game-area">
        {!gameFinished ? (
          <>
            {/* Görsel Seçenekleri */}
            {currentRound && (
              <div className="images-container">
                {currentRound.images.map((image: any, index: number) => (
                  <div
                    key={image.id}
                    onClick={() => selectImage(index)}
                    className={`game-image-card ${
                      selectedImage === index
                        ? index === currentRound.aiIndex
                          ? 'correct'
                          : 'incorrect'
                        : selectedImage !== null && index === currentRound.aiIndex
                        ? 'correct'
                        : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Option ${index + 1}`}
                      className="game-image"
                    />
                    {selectedImage !== null && index === currentRound.aiIndex && (
                      <div className="ai-badge correct">AI ÜRETİMİ</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Talimat */}
            {selectedImage === null && (
              <div className="instruction-section">
                <h2 className="instruction-title">
                  🤖 AI mı Değil mi? ({gameMode?.category.name})
                </h2>
                <p className="instruction-subtitle">
                  Üç görsel arasından hangisinin yapay zeka tarafından üretildiğini bulun!
                </p>
                <div className="text-sm text-gray-300 mt-4">
                  Zorluk: {gameMode?.difficulty.name} | Puan çarpanı: {gameMode?.difficulty.pointsMultiplier}x
                </div>
              </div>
            )}

            {/* İpucu Sistemi */}
            {gameMode?.difficulty.hintsEnabled && selectedImage === null && hintsShown < 2 && (
              <div className="hint-section">
                <button
                  onClick={showHint}
                  className="hint-button"
                  disabled={hintsShown >= 2}
                >
                  💡 İpucu Al ({2 - hintsShown} kaldı)
                </button>
              </div>
            )}

            {/* Gösterilen ipucu */}
            {hintsShown > 0 && (
              <div className="hint-section">
                <h3 className="hint-title">💡 İpucu #{hintsShown}</h3>
                <p className="hint-text">
                  {currentRound?.images.find(img => img.isAi)?.hintText || 'Detaylara dikkat et!'}
                </p>
              </div>
            )}
          </>
        ) : (
          /* Sonuç Ekranı */
          <div className="result-screen">
            <h2 className="result-title">
              {resultMessage}
            </h2>

            {round >= (gameMode?.difficulty.rounds || 5) && (
              <>
                <p className="result-message">🎉 Tebrikler! Tüm turları tamamladın!</p>
                <div className="result-stats">
                  <div className="result-stat">
                    <span className="result-stat-value">{score}</span>
                    <span className="result-stat-label">Toplam Skor</span>
                  </div>
                  <div className="result-stat">
                    <span className="result-stat-value">{gameMode?.category.name}</span>
                    <span className="result-stat-label">Kategori</span>
                  </div>
                  <div className="result-stat">
                    <span className="result-stat-value">{gameMode?.difficulty.name}</span>
                    <span className="result-stat-label">Zorluk</span>
                  </div>
                  <div className="result-stat">
                    <span className="result-stat-value">{gameMode?.difficulty.pointsMultiplier}x</span>
                    <span className="result-stat-label">Çarpan</span>
                  </div>
                </div>
              </>
            )}

            <div className="result-buttons">
              {round < (gameMode?.difficulty.rounds || 5) ? (
                <button onClick={nextRound} className="result-button primary">
                  ➡️ Sonraki Tur ({round + 1}/{gameMode?.difficulty.rounds || 5})
                </button>
              ) : (
                <>
                  <button onClick={restartGame} className="result-button primary">
                    🔄 Tekrar Oyna
                  </button>
                  {onBackToMode && (
                    <button onClick={onBackToMode} className="result-button secondary">
                      ⚙️ Mod Değiştir
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Kontroller */}
      <div className="game-controls">
        <button onClick={restartGame} className="control-button">
          🔄 Oyunu Sıfırla
        </button>
        {onBackToMode && (
          <button onClick={onBackToMode} className="control-button">
            ⚙️ Mod Değiştir
          </button>
        )}
        <button onClick={onExit} className="control-button danger">
          🏠 Ana Menü
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
import React, { useState, useEffect } from "react";

interface GameScreenProps {
  onExit: () => void;
  playerName?: string; // İsim opsiyonel olarak eklenebilir
}

const GameScreen: React.FC<GameScreenProps> = ({ onExit, playerName = "Oyuncu" }) => {
  // Örnek oyun durumu (State)
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(true);

  // Basit bir zamanlayıcı efekti (Oyun süresi simülasyonu)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); // Süre bitti
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Skoru artırmak için örnek fonksiyon (Oyun mantığın buraya gelecek)
  const handleGameAction = () => {
    if (isActive) {
      setScore((prev) => prev + 10);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* --- HUD (Üst Bilgi Paneli) --- */}
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-lg border-b-4 border-green-500 mb-8">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Oyuncu</span>
          <span className="font-bold text-xl text-green-400">{playerName}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Süre</span>
          <span className={`font-mono text-3xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Skor</span>
          <span className="font-mono text-3xl font-bold text-yellow-400">{score}</span>
        </div>
      </div>

      {/* --- OYUN ALANI (Game Board) --- */}
      <div className="relative w-full max-w-4xl h-96 bg-gray-950 rounded-2xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center shadow-2xl overflow-hidden group">
        
        {/* Arka plan ızgara efekti (Opsiyonel görsel) */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {isActive ? (
          <div className="z-10 text-center">
            <p className="text-gray-400 mb-4 animate-bounce">Oyun Alanı</p>
            {/* BURAYA SENİN OYUN MANTIĞIN GELECEK */}
            <button
              onClick={handleGameAction}
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] transition active:scale-95"
            >
              PUAN KAZAN (TEST)
            </button>
          </div>
        ) : (
          <div className="z-10 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-red-500 mb-2">Oyun Bitti!</h3>
            <p className="text-xl">Toplam Skor: {score}</p>
          </div>
        )}
      </div>

      {/* --- KONTROLLER --- */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => { setTimeLeft(60); setScore(0); setIsActive(true); }}
          className="px-6 py-2 border border-gray-600 hover:bg-gray-800 text-gray-300 rounded-lg transition"
        >
          Yeniden Başlat
        </button>

        <button
          onClick={onExit}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
import React from "react";
import "./StartScreen.css";

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="start-screen-container">
      <div className="start-screen-card">
        <h1 className="start-screen-title">
          🤖 Gerçek mi, Yapay mı?
        </h1>

        <p className="start-screen-description">
          Birazdan karşına <strong>3 görsel</strong> çıkacak.
          <br />
          <br />
          👉 <strong>2’si gerçek</strong>  
          <br />
          👉 <strong>1’i yapay zekâ</strong> tarafından üretildi
          <br />
          <br />
          <span className="highlight">
            Görevin: Yapay zekâ tarafından üretilen görseli bulmak!
          </span>
        </p>

        <button
          onClick={onStartGame}
          className="start-screen-button"
        >
          Oyuna Başla
        </button>

        <p className="start-screen-hint">
          Hazır mısın? Dikkatli bak 👀
        </p>
      </div>
    </div>
  );
};

export default StartScreen;

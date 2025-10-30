import React from "react";

import './StartScreen.css';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="start-screen-container">
      <h1 className="start-screen-title">
        Gerçek mi, Yapay mı?
      </h1>
      <p className="start-screen-description">
        Bu oyunda sana üç adet görsel gösterilecek. İkisi gerçek, biri ise
        yapay zeka (AI) tarafından üretilmiş olacak.
        <br />
        Görevin, AI tarafından üretilen görseli bulmak!
      </p>
      <button
        onClick={onStartGame} // app.tsx'ten gelen fonksiyonu çağırır
        className="start-screen-button"
      >
        Başla
      </button>
    </div>
  );
};

export default StartScreen;
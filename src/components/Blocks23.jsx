import React, { useEffect, useRef } from "react";
import { inicializarJuego } from "./juegoPhaser";
import "./css/block23.css";

const Blocks23 = () => {
  const gameContainer = useRef(null);
  useEffect(() => {
    const game = inicializarJuego(gameContainer.current);
    return () => {
      game.destroy(true);
    };
  }, []);
  return (
    <div className="gameContainer" ref={gameContainer}></div>
  )
}

export default Blocks23
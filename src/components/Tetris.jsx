import Board from "../components/Board";
import GameController from "../components/GameController";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";

import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import tetris from "../assets/Tetris.mp3";
import { useEffect, useRef, useState } from "react";
import { soundoff, soundon } from "../assets/icons";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });

  const audioRef = useRef(new Audio(tetris));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  return (
    <div className="Tetris overflow-hidden">
      <div className="text-center text-xl mb-2 font-bold">
        Tetris
      </div>
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
      <div className="absolute left-0 top-0 mr-[1000px] text-left xl:block hidden">
        <div className="font-bold mb-2">
          OBJECTIVE
        </div>
        <div>
          The goal of Tetris is to score as many points as possible by clearing horizontal lines of Blocks. The player must rotate, move, and drop the falling Tetriminos inside the Matrix/playing field. Lines are cleared when they are filled with Blocks and have no empty spaces.
        </div>
        <div className="font-bold mt-12 my-2">
          CONTROL OPTIONS
        </div>
        <div>
          ArrowUp: Rotate <br />
          ArrowDown: SlowDrop <br />
          ArrowLeft: Left <br />
          ArrowRight: Right <br />
          KeyQ: Quit <br />
          KeyP: Pause <br />
          Space: FastDrop
        </div>
      </div>
      <a href="https://maldikurniawan.github.io/random_app/" className='hover:text-black font-bold text-white text-center text-xl mt-2 flex justify-center mx-2' target='_blank'>Follow me here!</a>
      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>
    </div>
  );
};

export default Tetris;

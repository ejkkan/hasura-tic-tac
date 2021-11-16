import React, { useState } from "react";
import { isWinningMove } from "../utils/gameContext";

export type Tile = string | null;
export type Tiles = Tile[];

interface GameContextProps {
  tiles: (null | string)[];
  currentPlayer: string;
  grid: number;
  gameRunning: boolean;
  setGameRunning: (status: boolean) => void;
  onPickGridSize: (size: number) => void;
  pickTile: (tilePosition: number) => void;
}

const initialState = {
  grid: 3,
  tiles: [null, null, null, null, null, null, null, null, null],
  currentPlayer: "X",
  gameRunning: false,
  setGameRunning: () => {},
  onPickGridSize: () => {},
  pickTile: () => {},
};

const GameContext = React.createContext<GameContextProps>(initialState);

const GameContextProvider: React.FC = ({ children }) => {
  const [tiles, setTiles] = useState<Tiles>(initialState.tiles);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    initialState.currentPlayer
  );
  const [grid, setGridSize] = useState<number>(initialState.grid);
  const [gameRunning, setGameRunning] = useState<boolean>(
    initialState.gameRunning
  );

  const onPickGridSize = (size: number) => {
    setGridSize(size);
    setTiles(Array.from(Array(size * size)).fill(null));
  };

  const pickTile = (position: number) => {
    if (typeof tiles[position] === "string") return;
    const newTiles = [...tiles];
    newTiles[position] = currentPlayer;
    const playerWon = isWinningMove(newTiles, grid);
    if (playerWon) {
      setGameRunning(false);
      onPickGridSize(grid);
      return;
    }
    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <GameContext.Provider
      value={{
        setGameRunning,
        gameRunning,
        tiles,
        currentPlayer,
        pickTile,
        grid,
        onPickGridSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = React.useContext(GameContext);
  return context;
};

export { GameContextProvider, useGameContext };

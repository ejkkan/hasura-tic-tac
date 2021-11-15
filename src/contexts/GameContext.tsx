import React, { useState } from "react";
import { isWinningMove } from "../utils/gameContext";

export type Tile = string | null;
export type Tiles = Tile[];

interface GameContextProps {
  tiles: (null | string)[];
  currentPlayer: string;
  pickTile: (tilePosition: number) => void;
  grid: number;
  onPickGridSize: (size: number) => void;
  gameRunning: boolean;
  setGameRunning: (status: boolean) => void;
}

const initialState = {
  grid: 3,
  tiles: [null, null, null, null, null, null, null, null, null],
  currentPlayer: "X",
  gameRunning: false,
  pickTile: () => {},
  setGameRunning: () => {},
  onPickGridSize: () => {},
};

const GameContext = React.createContext<GameContextProps>(initialState);

const GameContextProvider = ({ children }: any) => {
  const [tiles, setTiles] = useState<Tiles>(initialState.tiles);
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [grid, setGridSize] = useState<number>(3);
  const [gameRunning, setGameRunning] = useState<boolean>(false);

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

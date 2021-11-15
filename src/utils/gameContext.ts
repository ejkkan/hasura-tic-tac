import { Tiles, Tile } from "../contexts/GameContext";

const checkAllEqual = (arr: Tiles) =>
  arr.every((t) => t !== null && t === arr[0]);

export const isWinningMove = (tiles: Tiles, grid: number) => {
  let isWinner = false;

  //HORZONTAL
  tiles.forEach((_: Tile, i: number) => {
    if (i % grid === 0) {
      const row = tiles.slice(i, i + grid);
      if (checkAllEqual(row)) {
        isWinner = true;
      }
    }
  });

  //VERTICAL
  Array.from(Array(grid)).forEach((_: unknown, i: number) => {
    const cols = tiles.reduce((tally: Tiles, current: Tile, j: number) => {
      if (j % grid === i) {
        return [...tally, current];
      }
      return tally;
    }, []);
    if (checkAllEqual(cols)) {
      isWinner = true;
    }
  });

  //DIAGONAL TOP-LEFT RIGHT-BOTTOM
  const diagonal1 = tiles.reduce((tally: Tiles, _: Tile, i: number) => {
    if (i % grid === 0) {
      return [...tally, tiles[tally.length + i]];
    }
    return tally;
  }, []);
  if (checkAllEqual(diagonal1)) {
    isWinner = true;
  }

  //DIAGONAL TOP-RIGHT LEFt-BOTTOM
  const diagonal2 = tiles.reduce((tally: Tiles, _: Tile, i: number) => {
    if (i % grid === 0) {
      return [...tally, tiles[grid * (tally.length + 1) - (tally.length + 1)]];
    }
    return tally;
  }, []);
  if (checkAllEqual(diagonal2)) {
    isWinner = true;
  }

  return isWinner;
};

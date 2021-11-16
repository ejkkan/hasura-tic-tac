import { Box, Typography } from "@mui/material";
import Tile from "../components/Tile";
import {
  Tiles,
  Tile as TypeType,
  useGameContext,
} from "../contexts/GameContext";

interface BoardProps {
  tiles: Tiles;
}

const Board: React.FC<BoardProps> = ({ tiles }) => {
  const { grid, currentPlayer } = useGameContext();
  return (
    <Box className="App">
      <Typography variant="h3">Board</Typography>
      <Typography variant="h5">Current player: {currentPlayer}</Typography>
      <Box display="flex" justifyContent="center">
        <Box
          width={grid * 100 + grid * 2}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          {tiles.map((mark: TypeType, index: number) => {
            return <Tile key={index} mark={mark} position={index} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Board;

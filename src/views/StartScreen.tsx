import { Box, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useGameContext } from "../contexts/GameContext";

const StartScreen: React.FC = ({}) => {
  const { grid, onPickGridSize, setGameRunning } = useGameContext();

  return (
    <Box className="App">
      <Typography variant="h3">Start screen</Typography>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column">
          <Typography variant="h3">Pick a number before you start</Typography>
          <Select value={grid} label="Grid" onChange={() => {}}>
            {Array.from(Array(10).keys()).map((_: unknown, index: number) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => onPickGridSize(index)}
                  value={index}
                >
                  {index}
                </MenuItem>
              );
            })}
          </Select>
          <Button onClick={() => setGameRunning(true)}>Start</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StartScreen;

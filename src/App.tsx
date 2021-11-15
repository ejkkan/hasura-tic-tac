import "./App.css";
import { Box, Typography } from "@mui/material";
import Board from "./views/Board";
import StartScreen from "./views/StartScreen";
import { useGameContext } from "./contexts/GameContext";

function App() {
  const { tiles, gameRunning } = useGameContext();

  return (
    <Box className="App">
      <Typography variant="h1">Tic tac toe</Typography>
      {gameRunning ? <Board tiles={tiles} /> : <StartScreen />}
    </Box>
  );
}

export default App;

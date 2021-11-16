import React from "react";
import { Box, Typography } from "@mui/material";
import { useGameContext, Tile as TileProp } from "../contexts/GameContext";

interface TileProps {
  mark: TileProp;
  position: number;
}

const Tile: React.FC<TileProps> = ({ mark, position }) => {
  const { pickTile } = useGameContext();
  return (
    <Box
      onClick={() => pickTile(position)}
      sx={{
        border: 1,
        height: 100,
        width: 100,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Typography variant="h3">{mark}</Typography>
    </Box>
  );
};

export default Tile;

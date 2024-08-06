import React from "react";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: theme.shape.borderRadius,
}));

interface BoxImageProps {
  src: string;
  text: string;
  alt: string;
  sx?: object;
}

const ImageWithText: React.FC<BoxImageProps> = ({ src, text, alt, sx }) => {
  return (
    <Box sx={{ position: "relative", height: 500 / 3 }}>
      <CardMedia component="img" image={src} sx={{ height: "100%" }} alt={alt} />
      <Typography sx={{ position: "absolute", bottom: 10, left: 10, color: "white", fontWeight: "bold" }}>{text}</Typography>
    </Box>
  );
};

export default ImageWithText;

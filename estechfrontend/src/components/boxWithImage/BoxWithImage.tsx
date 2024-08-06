import React from "react";
import { Box, BoxProps } from "@mui/material";
import theme from "@styles/theme";

interface BoxWithImageProps extends BoxProps {
  imageUrl: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  overlayColor?: string; // Добавленное свойство для цвета затемнения
  overlayOpacity?: number; // Добавленное свойство для прозрачности затемнения
}

const BoxWithImage: React.FC<BoxWithImageProps> = ({
  imageUrl,
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat",
  overlayColor = "black",
  overlayOpacity = 0.5,
  children,
  ...boxProps
}) => {
  return (
    <Box
      {...boxProps}
      sx={{
        position: "relative", // Необходимо для позиционирования псевдоэлемента
        overflow: "hidden", // Чтобы скрыть излишки псевдоэлемента
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1, // Убедитесь, что псевдоэлемент ниже children
        },
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: backgroundRepeat,
        zIndex: 0,
        borderRadius: theme.shape.borderRadius,
        ...boxProps.sx, // Allows for additional custom styles passed through props
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </Box>
  );
};

export default BoxWithImage;

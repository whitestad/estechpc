import React from "react";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Container, Divider } from "@mui/material";
import mainImage from "@assets/images/pcs/photo_5_2024-08-06_18-07-11.jpg";
import image1 from "@assets/images/pcs/photo_2024-08-06_21-07-37.jpg";
import image2 from "@assets/images/pcs/photo_5_2024-08-06_18-07-11.jpg";
import image3 from "@assets/images/pcs/photo_5_2024-08-06_18-07-11.jpg";
import ImageWithText from "@components/imageWithText/ImageWithText";
import BoxWithImage from "@components/boxWithImage/BoxWithImage";

const Home = () => {
  return (
    <Container maxWidth={"xl"} sx={{ my: 5 }}>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3, bgcolor: "background.default", color: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" height={500}>
          <Grid item xs={12} md={8} height={"100%"}>
            <BoxWithImage imageUrl={image1} overlayOpacity={0.5} sx={{ height: "100%" }}>
              <Container sx={{ width: "100%", height: 500, display: "flex", alignItems: "center", my: "auto" }}>
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Настраивай реальность под себя
                  </Typography>
                  <Typography variant="subtitle1">
                    Открой для себя новое измерение производительности с нашими топовыми компьютерами и комплектующими.
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Button variant="contained" color="primary">
                    Посмотреть каталог
                  </Button>
                </CardContent>
              </Container>
            </BoxWithImage>
          </Grid>

          <Grid item xs={12} md={4} sx={{ height: 500 }}>
            <Box sx={{ width: "100%", height: 500, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Box flexGrow={1} height={"100%"} sx={{ width: "100%", backgroundColor: "red" }}>
                <ImageWithText src={image2} text="Apple Vision Pro" alt="Apple Vision Pro" />
              </Box>

              <Box flexGrow={1} height={"100%"} sx={{ width: "100%", backgroundColor: "red" }}></Box>

              <Box flexGrow={1} height={"100%"} sx={{ width: "100%", backgroundColor: "red" }}></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;

import React from 'react';
import { Box, Typography, Button, Grid, CardContent, Container, Divider } from '@mui/material';

import pc_power from '@assets/images/pcs/pc_power.jpg';
import pc_components from '@assets/images/pcs/pc_components.jpg';
import periphery from '@assets/images/pcs/periphery.jpg';
import room from '@assets/images/pcs/room.jpg';

import ImageWithText from '@components/imageWithText/ImageWithText';
import BoxWithImage from '@components/boxWithImage/BoxWithImage';
import StoreStats from '@pages/home/StoreStats';

import './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const totalHeight = 500; // Общая высота контейнера
    const gapSize = 2 * 8; // Размер отступа (MUI spacing unit: 1 = 8px)
    const numberOfImages = 3;
    const imageHeight = (totalHeight - gapSize * numberOfImages) / numberOfImages;

    return (
        <Box sx={{ backgroundColor: 'pallett' }}>
            <Container maxWidth={'xl'} sx={{ py: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Grid container spacing={2} alignItems='center' justifyContent='center' sx={{ height: { md: '500px', sx: 'auto' } }}>
                    <Grid item xs={12} md={9} height={'100%'}>
                        <BoxWithImage imageUrl={room as string} overlayOpacity={0.5} sx={{ height: '100%' }}>
                            <Container sx={{ width: '100%', height: 500, display: 'flex', alignItems: 'center', my: 'auto' }}>
                                <CardContent>
                                    <Typography variant='h3' gutterBottom>
                                        Настраивай реальность под себя
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        Открой для себя новое измерение производительности с нашими топовыми компьютерами и комплектующими.
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Button variant='contained' size='large' color='primary' onClick={() => navigate('/categories')}>
                                        Посмотреть каталог
                                    </Button>
                                </CardContent>
                            </Container>
                        </BoxWithImage>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ height: totalHeight }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: {
                                    md: 'column',
                                    xs: 'flex',
                                },
                                gap: `${gapSize}px`,
                            }}
                        >
                            <Box sx={{ flexGrow: 1, height: `${imageHeight}px`, width: '100%', overflow: 'hidden' }}>
                                <ImageWithText src={pc_power as string} text='Мощь без границ' alt='Image 1' />
                            </Box>

                            <Box sx={{ flexGrow: 1, height: `${imageHeight}px`, width: '100%', overflow: 'hidden' }}>
                                <ImageWithText src={pc_components as string} text='Собери систему мечты' alt='Image 2' />
                            </Box>

                            <Box sx={{ flexGrow: 1, height: `${imageHeight}px`, width: '100%', overflow: 'hidden' }}>
                                <ImageWithText src={periphery as string} text='Интерактивный комфорт и контроль' alt='Image 3' />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <StoreStats />
            </Container>
        </Box>
    );
};

export default Home;

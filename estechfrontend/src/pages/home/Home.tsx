import React from 'react';
import { Box, Container } from '@mui/material';
import StoreStats from '@pages/home/StoreStats';

import './Home.module.css';
import HomeCarousel from '@pages/home/HomeCarousel';

const Home = () => {
    return (
        <Box sx={{ backgroundColor: 'pallett' }}>
            <Container maxWidth={'xl'} sx={{ py: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <HomeCarousel />

                <StoreStats />
            </Container>
        </Box>
    );
};

export default Home;

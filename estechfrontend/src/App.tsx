// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from '@components/header/Header';
import Home from '@pages/home/Home';
import theme from '@styles/theme';
import '@styles/global.css';
import '@styles/globalStyles';

import TestPage from '@pages/TestPage';
import CatalogPage from '@pages/catalogPage/CatalogPage';
import LoginPage from '@pages/loginPage/LoginPage';
import RegisterPage from '@pages/registerPage/RegisterPage';
import Logout from '@pages/Logout';
import CategorySelector from '@pages/categorySelector/CategorySelector';
import ProductsPage from '@pages/productsPage/ProductsPage';
import AllProductsPage from '@pages/allProductsPage/AllProductsPage';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/test' element={<TestPage />} />
                    <Route path='/catalog' element={<AllProductsPage />} />

                    <Route path='/categories/:parentId?' element={<CategorySelector />} />
                    <Route path='/categories/:categoryId/products' element={<ProductsPage />} />

                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;

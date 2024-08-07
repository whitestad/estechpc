// src/components/header/Header.tsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container, Typography } from "@mui/material";

import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import styles from "./Header.module.css";
import Logo from "@assets/favicon.svg?react";
import IconWithLabel from "./IconWithLabel"; // Импортируем новый компонент

import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import IconButton from "@mui/material/IconButton";
import theme from "@styles/theme";
import useAuthStore from "@stores/authStore";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const username = useAuthStore((state) => state.user?.username);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color={"background"} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ gap: 5 }}>
                        <Logo className={styles.logo} onClick={() => navigate('/')} />

                        <SearchBar />

                        <Box sx={{ display: { xs: "none", md: "flex", gap: theme.spacing(5), alignItems: "center" } }}>
                            <IconWithLabel icon={<ReceiptLongIcon />} label="Заказы" badgeContent={0} ariaLabel="show orders" />
                            <IconWithLabel icon={<FavoriteIcon />} label="Избранное" badgeContent={2} ariaLabel="show favorites" />
                            <IconWithLabel icon={<ShoppingCartIcon />} label="Корзина" badgeContent={3} ariaLabel="show shopping cart" />

                            { isAuthenticated() ?
                                <>
                                    <IconWithLabel
                                        icon={<AccountCircle />}
                                        label="Профиль"
                                        ariaLabel="account of current user"
                                        onClick={handleProfileMenuOpen}
                                    />

                                    <Button onClick={() => navigate('/logout')}>
                                        Выйти
                                    </Button>
                                </>
                                :
                                <Button variant="contained" onClick={() => navigate('/login')}>
                                    Войти
                                </Button>
                            }

                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton size="large" aria-label="show more" aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ProfileMenu
                anchorEl={anchorEl}
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                isMenuOpen={isMenuOpen}
                isMobileMenuOpen={isMobileMenuOpen}
                handleMenuClose={handleMenuClose}
                handleMobileMenuClose={handleMobileMenuClose}
                handleProfileMenuOpen={handleProfileMenuOpen}
            />
        </Box>
    );
};

export default Header;

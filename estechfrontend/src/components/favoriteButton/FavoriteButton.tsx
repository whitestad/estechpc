// src/components/FavoriteButton.tsx
import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavoriteButtonProps {
    productId: number;
    isFavorite: boolean;
    toggleFavorite: (productId: number, isFavorite: boolean) => void;
    isLoading: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, isFavorite, toggleFavorite, isLoading }) => {
    return (
        <IconButton
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(productId, isFavorite);
            }}
            disabled={isLoading}
            sx={{ color: isFavorite ? 'primary.main' : 'text.secondary' }}
        >
            {isLoading ? <CircularProgress size={24} /> : isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default FavoriteButton;

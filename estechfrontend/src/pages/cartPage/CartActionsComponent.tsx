import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface CartActionsProps {
    isClearing: boolean;
    onClearCart: () => void;
}

const CartActionsComponent: React.FC<CartActionsProps> = ({ isClearing, onClearCart }) => {
    return (
        <Button variant='text' color='error' size='large' onClick={onClearCart} disabled={isClearing}>
            {isClearing ? <CircularProgress size={24} /> : 'Очистить корзину'}
        </Button>
    );
};

export default CartActionsComponent;

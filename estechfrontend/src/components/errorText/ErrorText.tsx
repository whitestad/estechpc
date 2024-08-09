import { Typography } from '@mui/material';
import React from 'react';

const ErrorText = ({ children, sx = {} }) => {
    return (
        <Typography color='error' variant='h6' sx={{ textAlign: 'center', mt: 4, ...sx }}>
            {children}
        </Typography>
    );
};

export default ErrorText;

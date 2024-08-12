import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FlexBoxStyled = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(2),
}));

interface FlexBoxProps {
    children: React.ReactNode;
    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    gap?: number | string;
    bgColor?: string;
    sx?: object;
}

const FlexBox: React.FC<FlexBoxProps> = ({
    children,
    flexDirection = 'row',
    alignItems = 'center',
    justifyContent = 'flex-start',
    gap,
    bgColor = 'transparent',
    sx,
}) => {
    return (
        <FlexBoxStyled
            sx={{
                flexDirection,
                alignItems,
                justifyContent,
                gap,
                backgroundColor: bgColor,
                borderRadius: 1,
                ...sx,
            }}
        >
            {children}
        </FlexBoxStyled>
    );
};

export default FlexBox;

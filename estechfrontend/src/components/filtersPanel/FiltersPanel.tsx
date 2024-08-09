import React from 'react';
import { Typography, List, FormGroup, FormControlLabel, Checkbox, TextField, Box } from '@mui/material';

interface Filter {
    id: number;
    name: string;
    values: string[];
}

export interface FiltersResponse {
    filters: Filter[];
}

interface FiltersPanelProps {
    filters: Filter[] | undefined;
    selectedFilters: { [key: string]: string[] };
    priceRange: { min: number; max: number };
    onFilterChange: (filters: { [key: string]: string[] }) => void;
    onPriceRangeChange: (range: { min: number; max: number }) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, selectedFilters, priceRange, onFilterChange, onPriceRangeChange }) => {
    const handleFilterChange = (filterId: string, value: string) => {
        onFilterChange({
            ...selectedFilters,
            [filterId]: selectedFilters[filterId]?.includes(value)
                ? selectedFilters[filterId].filter((v) => v !== value)
                : [...(selectedFilters[filterId] || []), value],
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onPriceRangeChange({
            ...priceRange,
            [name]: parseFloat(value) || 0,
        });
    };

    return (
        <Box>
            <Typography variant='h6'>Фильтры</Typography>
            <List>
                <FormGroup>
                    <Typography variant='subtitle1'>Цена</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            label='Минимум'
                            type='number'
                            name='min'
                            value={priceRange.min}
                            onChange={handlePriceChange}
                            size='small'
                            variant='outlined'
                            fullWidth
                        />
                        <TextField
                            label='Максимум'
                            type='number'
                            name='max'
                            value={priceRange.max}
                            onChange={handlePriceChange}
                            size='small'
                            variant='outlined'
                            fullWidth
                        />
                    </Box>
                </FormGroup>
                {filters?.map((filter) => (
                    <FormGroup key={filter.id}>
                        <Typography variant='subtitle1'>{filter.name}</Typography>
                        {filter.values.map((value) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedFilters[filter.id]?.includes(value) || false}
                                        onChange={() => handleFilterChange(filter.id.toString(), value)}
                                    />
                                }
                                label={value}
                                key={value}
                            />
                        ))}
                    </FormGroup>
                ))}
            </List>
        </Box>
    );
};

export default FiltersPanel;

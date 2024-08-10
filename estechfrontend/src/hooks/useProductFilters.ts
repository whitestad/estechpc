// src/hooks/useProductFilters.ts

import { useState, useCallback } from 'react';

export const useProductFilters = () => {
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

    const updateFilters = useCallback((newFilters: { [key: string]: string[] }) => {
        setSelectedFilters(newFilters);
    }, []);

    const updatePriceRange = useCallback((newPriceRange: { min: number; max: number }) => {
        setPriceRange(newPriceRange);
    }, []);

    return {
        selectedFilters,
        priceRange,
        updateFilters,
        updatePriceRange,
    };
};

import styles from './FilterPanel.module.css';
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import apiInstance from "@utils/axios.js";
import { FieldsGroup } from "@components/layout/fieldsGroup/FieldGroup.jsx";
import { OutlineInput } from "@components/common/input/Input.jsx";

const FilterPanel = ({ onFilterChange }) => {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({ category: '', attributes: [], minPrice: '', maxPrice: '' });

    const fetchFilters = async () => {
        try {
            const response = await apiInstance.get(`products/category/2/filters`);
            setFilters(response.data.filters);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        fetchFilters();

        const initialFilters = {
            category: searchParams.get('c') || '',
            minPrice: searchParams.get('minp') || '',
            maxPrice: searchParams.get('maxp') || '',
            attributes: []
        };

        // Parse attributes from URL
        const attributesFromParams = searchParams.getAll('attribute');
        initialFilters.attributes = attributesFromParams.map(attr => {
            const [id, value] = attr.split(':');
            return { id, value };
        });

        setSelectedFilters(initialFilters);
        onFilterChange(initialFilters); // Передать начальные фильтры
    }, [searchParams, onFilterChange]);

    const updateFilters = (updates) => {
        setSelectedFilters(prevFilters => {
            const newFilters = { ...prevFilters, ...updates };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    const handleCategoryChange = (e) => {
        updateFilters({ category: e.target.value });
    };

    const handleMinPriceChange = (e) => {
        updateFilters({ minPrice: e.target.value });
    };

    const handleMaxPriceChange = (e) => {
        updateFilters({ maxPrice: e.target.value });
    };

    const handleAttributeChange = (attributeId, value) => {
        setSelectedFilters(prevFilters => {
            const updatedAttributes = prevFilters.attributes.filter(attr => attr.id !== attributeId);
            if (value) {
                updatedAttributes.push({ id: attributeId, value });
            }
            const newFilters = { ...prevFilters, attributes: updatedAttributes };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    return (
        <div className={styles.filterPanel}>
            <h3>Фильтры</h3>
            <div className={styles.filterGroup}>
                <label>Цена</label>
                <FieldsGroup>
                    <OutlineInput placeholder={'от'} type={'number'} value={selectedFilters.minPrice} onChange={handleMinPriceChange} />
                    <OutlineInput placeholder={'до'} type={'number'} value={selectedFilters.maxPrice} onChange={handleMaxPriceChange} />
                </FieldsGroup>
            </div>

            {filters.map((filter) => (
                <div key={filter.id} className={styles.filterGroup}>
                    <label>{filter.name}</label>
                    <select value={selectedFilters.attributes.find(attr => attr.id === filter.id)?.value || ''} onChange={(e) => handleAttributeChange(filter.id, e.target.value)}>
                        <option value="">Все</option>
                        {filter.values.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default FilterPanel;

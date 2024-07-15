import styles from './FilterPanel.module.css';
import { useEffect, useState } from "react";
import apiInstance from "@utils/axios.js";
import {FieldsGroup} from "@components/layout/fieldsGroup/FieldGroup.jsx";
import {Input, OutlineInput} from "@components/common/input/Input.jsx";

const FilterPanel = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [filters, setFilters] = useState([]);

    const selectedFilters = { attributes: [] };

    async function fetchFilters() {
        try {
            const response = await apiInstance.get(`products/category/2/filters`);
            return await response.data.filters;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    const handleCategoryChange = (e) => {
        onFilterChange({ category: e.target.value, ...selectedFilters});
    };

    const handleMinPriceChange = (e) => {
        selectedFilters.minPrice = e.target.value;
        onFilterChange(selectedFilters);
    };

    const handleMaxPriceChange = (e) => {
        selectedFilters.maxPrice = e.target.value;
        onFilterChange(selectedFilters);
    };

    const handleAttributeChange = (attributeId, value) => {
        const updatedAttributes = selectedFilters.attributes.filter(attr => attr.id !== attributeId);
        if (value) {
            updatedAttributes.push({ id: attributeId, value });
        }
        selectedFilters.attributes = updatedAttributes;
        onFilterChange(selectedFilters);
    };

    useEffect(() => {
        fetchFilters().then(result => {
            setFilters(result);
        });
    }, []);

    return (
        <div className={styles.filterPanel}>
            <h3>Фильтры</h3>
            <div className={styles.filterGroup}>
                <label>Цена</label>
                <FieldsGroup>
                    <OutlineInput placeholder={'от'} type={'number'} onChange={handleMinPriceChange}></OutlineInput>
                    <OutlineInput placeholder={'до'} type={'number'} onChange={handleMaxPriceChange}></OutlineInput>
                </FieldsGroup>
                {/*<select value={priceRange} onChange={handlePriceRangeChange}>
                    <option value="">Все</option>
                    <option value="0-50">Менее 10 000</option>
                    <option value="51-100">10 000 - 20 000</option>
                    <option value="101-150">20 000 - 30 000</option>
                    <option value="151-200">30 000 - 40 000</option>
                </select>*/}
            </div>

            {filters.map((filter) => (
                <div key={filter.id} className={styles.filterGroup}>
                    <label>{filter.name}</label>
                    <select onChange={(e) => handleAttributeChange(filter.id, e.target.value)}>
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

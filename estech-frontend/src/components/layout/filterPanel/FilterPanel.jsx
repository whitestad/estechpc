import styles from './FilterPanel.module.css';
import {useEffect, useState} from "react";
import apiInstance from "@utils/axios.js";


const filter_test = {
    'name': 'FilterPanel',
    'options': ''
}

const FilterPanel = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const [filters, setFilters] = useState([]);

    async function fetchFilters() {
        try {
            const response = await apiInstance.get(`products/category/2/filters`);
            return await response.data.filters;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        onFilterChange({ category: e.target.value, priceRange });
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
        onFilterChange({ category, priceRange: e.target.value });
    };

    useEffect(() => {
        fetchFilters().then(result => {
            setFilters(result)
        })
    }, []);

    return (
        <div className={styles.filterPanel}>
            <h3>Фильтры</h3>
            <div className={styles.filterGroup}>
                <label>Ценовой диапазон</label>
                <select value={priceRange} onChange={handlePriceRangeChange}>
                    <option value="">Все</option>
                    <option value="0-50">Менее 10 000</option>
                    <option value="51-100">10 000 - 20 000</option>
                    <option value="51-100">20 000 - 30 000</option>
                    <option value="101-200">101 - 200</option>
                </select>
            </div>

            {filters.map((filter) => (
                <div key={filter.id} className={styles.filterGroup}>
                    <label>{filter.name}</label>
                    <select value={priceRange} onChange={handlePriceRangeChange}>
                        <option value="">Все</option>
                        {filter.values.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    )
};

export default FilterPanel;

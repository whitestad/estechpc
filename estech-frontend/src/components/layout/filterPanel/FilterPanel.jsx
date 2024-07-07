import styles from './FilterPanel.module.css';
import {useState} from "react";

const FilterPanel = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        onFilterChange({ category: e.target.value, priceRange });
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
        onFilterChange({ category, priceRange: e.target.value });
    };

    return (
        <div className={styles.filterPanel}>
            <h3>Фильтры</h3>
            <div className={styles.filterGroup}>
                <label>Категория</label>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Все</option>
                    <option value="electronics">Электроника</option>
                    <option value="clothing">Одежда</option>
                    <option value="books">Книги</option>
                </select>
            </div>
            <div className={styles.filterGroup}>
                <label>Ценовой диапазон</label>
                <select value={priceRange} onChange={handlePriceRangeChange}>
                    <option value="">Все</option>
                    <option value="0-50">0 - 50</option>
                    <option value="51-100">51 - 100</option>
                    <option value="101-200">101 - 200</option>
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;

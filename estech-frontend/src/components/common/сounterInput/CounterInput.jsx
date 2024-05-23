import styles from './CounterInput.module.css';
import {useState} from "react";
import {Button} from "@components/common/button/Button.jsx";

function CounterInput() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div className={styles.counterContainer}>
            <Button extraClasses={[styles.counterButton]} onClick={decrement}>
                -
            </Button>
            <span className={styles.counterValue}>{count}</span>
            <Button extraClasses={[styles.counterButton]} onClick={increment}>
                +
            </Button>
        </div>
    );
}

export default CounterInput;

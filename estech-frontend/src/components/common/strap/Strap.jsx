import styles from './Strap.module.css'

function Strap({children, width='auto', reverse=false}) {
    return (
        <div className={[styles.strap, reverse && styles.reverse].join(' ')} style={{width: width}}>
            {children}
        </div>
    );
}

export default Strap;

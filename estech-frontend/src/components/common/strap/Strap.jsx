import styles from './Strap.module.css'

function Strap({children, width='auto', reverse=false, secondary=false, padding='2rem'}) {
    return (
        <div className={[styles.strap, reverse && styles.reverse, secondary && styles.secondary].join(' ')} style={{width: width, padding: padding}}>
            {children}
        </div>
    );
}

export default Strap;

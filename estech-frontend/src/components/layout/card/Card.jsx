import styles from './Card.module.css';



function SimpleCard({children, image}) {
    return (
        <div className={styles.card}>
            <div className={styles.imageDiv}>
                <img className={styles.image} src={image} />
            </div>
            <h3>{children}</h3>
        </div>
    );
}

export {SimpleCard};

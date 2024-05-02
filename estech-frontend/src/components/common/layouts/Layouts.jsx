import styles from './Layout.module.css'

function BaseLayout({children, className}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

function Grid({children}) {
    return (
        <BaseLayout className={styles.grid}>{children}</BaseLayout>
    );
}

function Container({children}) {
    return (
        <BaseLayout className={styles.container}>{children}</BaseLayout>
    );
}

function RowContainer({children}){
    return (
        <BaseLayout className={[styles.container, styles.row].join(' ')}>{children}</BaseLayout>
    );
}



export {BaseLayout, Container, RowContainer, Grid};

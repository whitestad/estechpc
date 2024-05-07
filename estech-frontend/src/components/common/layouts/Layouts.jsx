import styles from './Layout.module.css'

function BaseLayout({children, className, margin='3rem auto', ...props}) {
    return (
        <div className={className} style={{margin: margin}} {...props}>
            {children}
        </div>
    )
}

function Grid({children, margin='1rem auto'}) {
    return (
        <BaseLayout className={styles.grid} margin={margin}>{children}</BaseLayout>
    );
}

function Container({children, margin='3rem auto'}) {
    return (
        <BaseLayout className={styles.container} margin={margin}>{children}</BaseLayout>
    );
}

function RowContainer({children, margin='3rem auto', spaceBetween=false}){
    return (
        <BaseLayout className={[styles.container, styles.row, spaceBetween && styles.spaceBetween].join(' ')} margin={margin}>{children}</BaseLayout>
    );
}



export {BaseLayout, Container, RowContainer, Grid};

import styles from './Layout.module.css'

function BaseLayout({children, className, ...props}) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

function Grid({children}) {
    return (
        <BaseLayout className={styles.grid}>{children}</BaseLayout>
    );
}

function Container({children, marginTop='3rem'}) {
    return (
        <BaseLayout className={styles.container} style={{marginTop: marginTop}}>{children}</BaseLayout>
    );
}

function RowContainer({children}){
    return (
        <BaseLayout className={[styles.container, styles.row].join(' ')}>{children}</BaseLayout>
    );
}



export {BaseLayout, Container, RowContainer, Grid};

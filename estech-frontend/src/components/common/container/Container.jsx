import styles from './Container.module.css'

function Container({children}){
  return (
    <div className={styles.container}>
        {children}
    </div>
  );
}

function RowContainer({children}){
  return (
      <div className={[styles.container, styles.row].join(' ')}>
        {children}
      </div>
  );
}

export {Container, RowContainer};

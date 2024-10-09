import styles from './loader.module.css'

export default function Loader2() {
  return (
    <>
      <div className={styles['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}

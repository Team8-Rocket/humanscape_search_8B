import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <>
      <div>검색중..</div>
      <div className={styles.loading} />
    </>
  )
}

export default Loading

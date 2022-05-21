import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Header.module.scss'
import { ISelector } from 'types/theme'
import { changeMode } from 'store/themeSlice'
import { DarkIcon, SunIcon } from 'assets'

const Header = () => {
  const { darkMode } = useSelector((state: ISelector) => state.darkMode)
  const theme = darkMode ? 'dark' : 'light'
  const dispatch = useDispatch()

  const handleToggleMode = () => {
    dispatch(changeMode())
  }

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  return (
    <div className={styles.header}>
      <button className={styles.toggle} type='button' onClick={handleToggleMode}>
        <span />
        <SunIcon className={styles.icons} width={20} />
        <DarkIcon className={styles.icons} width={20} />
      </button>
    </div>
  )
}

export default memo(Header)

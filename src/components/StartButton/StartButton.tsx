import { FC } from 'react'
import styles from './StartButton.module.scss';

const StartButton: FC = () => {
  return (
    <button type='button' className={styles.root}>Message Editor</button>
  )
}

export default StartButton
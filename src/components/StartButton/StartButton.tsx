import React, { FC } from 'react'
import styles from './StartButton.module.scss';

interface IStartButtonProps {
  onOpenEditor: () => void;
}

const StartButton: FC<IStartButtonProps> = ({onOpenEditor}) => {

  return (
    <button type='button' onClick={() => onOpenEditor()} className={styles.root}>Message Editor</button>
  )
}

export default StartButton
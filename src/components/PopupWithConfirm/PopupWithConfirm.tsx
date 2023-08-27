import { FC } from 'react';

import { Popup } from '../';
import styles from './PopupWithConfirm.module.scss';

interface IPopupWithConfirmProps {
  isOpen: boolean;
  question?: string;
  onConfirm: () => void;
  onClose: () => void;
  
}

const PopupWithConfirm: FC<IPopupWithConfirmProps> = (props) => {
  const { isOpen, question, onConfirm, onClose } = props;

  const component = isOpen &&(
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={styles.dialogContainer}>
        <p className={styles.text}>{question ? question : 'Подтвердить действие?'}</p>
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.button} onClick={onConfirm}>
            Да
          </button>
          <button type="button" className={styles.button} onClick={onClose}>
            Нет
          </button>
        </div>
      </div>
    </Popup>
  )

  return component || null;
};

export default PopupWithConfirm;

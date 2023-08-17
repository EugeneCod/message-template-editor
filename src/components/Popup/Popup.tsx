import { FC, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';

import styles from './Popup.module.scss';
const cx = classNames.bind(styles);

interface IPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Popup: FC<IPopupProps> = (props) => {
  const { isOpen, onClose, children } = props;

  useEffect(() => {
    function handleEscClose(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    isOpen && document.addEventListener('keyup', handleEscClose);
    return () => document.removeEventListener('keyup', handleEscClose);
  }, [isOpen, onClose]);

  const rootClassName = cx({
    root: true,
    opened: isOpen,
  });

  return (
    <div onMouseDown={onClose} className={rootClassName}>
      <div onMouseDown={evt => evt.stopPropagation()} className={styles.container}>
        <button onClick={onClose} className={styles.closeBtn}/>
        {children}
      </div>
    </div>
  );
};

export default Popup;

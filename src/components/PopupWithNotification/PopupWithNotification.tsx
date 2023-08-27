import { FC } from 'react';

import { Popup } from '..';
import styles from './PopupWithNotification.module.scss';
import imageSuccess from '../../assets/images/popup__notification_success.svg';
import imageFailure from '../../assets/images/popup__notification_failure.svg';

interface PopupWithNotificationProps {
  isOpen: boolean;
  notification: string;
  status: boolean;
  onClose: () => void;
}

const PopupWithNotification: FC<PopupWithNotificationProps> = (props) => {
  const { isOpen, notification, status, onClose } = props;

  const component = isOpen && (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={styles.notificationBlock}>
        <img className={styles.image} src={status === true ? imageSuccess : imageFailure} alt="Success or failure" />
        <p className={styles.text}>{notification}</p>
      </div>
    </Popup>
  );
  return component || null;
};

export default PopupWithNotification;

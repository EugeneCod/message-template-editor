import { FC } from 'react';

import {Popup, MessagePreview} from '../';

interface IPopupWithMessgePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupWithMessgePreview: FC<IPopupWithMessgePreviewProps> = (props) => {
  const {isOpen, onClose} = props;
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <MessagePreview/>
    </Popup>
  )
}

export default PopupWithMessgePreview
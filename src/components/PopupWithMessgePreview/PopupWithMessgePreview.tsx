import { FC } from 'react';

import { Popup, MessagePreview } from '../';
import { INodes } from '../../types';

interface IPopupWithMessgePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  arrVarNames: string[];
  template: INodes;
}

const PopupWithMessgePreview: FC<IPopupWithMessgePreviewProps> = (props) => {
  const { isOpen, onClose, arrVarNames, template } = props;
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <MessagePreview arrVarNames={arrVarNames} template={template} onClose={onClose} />
    </Popup>
  );
};

export default PopupWithMessgePreview;

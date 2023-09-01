import { ChangeEvent, SyntheticEvent, FC, useRef, useLayoutEffect } from 'react';

import styles from './Textarea.module.scss';
import { MIN_TEXTAREA_HEIGHT } from '../../utils/constants';

interface ITextareaProps {
  id: number;
  initialText: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>, id: number) => void;
  onSelect: (event: SyntheticEvent<HTMLTextAreaElement, Event>, id: number) => void;
}

const Textarea: FC<ITextareaProps> = (props) => {
  const { id, initialText, onChange, onSelect } = props;
  const textareaRef: any = useRef(null);

  useLayoutEffect(() => {
    // Сброс высоты требуется при каждой перерисовке
    textareaRef.current.style.height = null;
    // Установка высоты
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT,
    )}px`;
  }, [initialText]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event, id);
  }

  function handleSelect(event: SyntheticEvent<HTMLTextAreaElement, Event>) {
    onSelect(event, id);
  }

  return (
    <textarea
      id={id.toString()}
      className={styles.textArea}
      ref={textareaRef}
      onChange={handleChange}
      onSelect={handleSelect}
      value={initialText}
      style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
    />
  );
};

export default Textarea;

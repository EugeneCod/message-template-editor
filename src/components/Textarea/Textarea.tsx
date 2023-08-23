import { ChangeEvent, FC, useRef, useState, useLayoutEffect } from 'react';

import styles from './Textarea.module.scss';
import { MIN_TEXTAREA_HEIGHT } from '../../utils/constants';

interface ITextareaProps {
  id: number;
  initialText: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>, id: number) => void;
}

const Textarea: FC<ITextareaProps> = (props) => {
  const { id, initialText, onChange } = props;
  const textareaRef: any = useRef(null);
  const [value, setValue] = useState(initialText);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    onChange(event, id);
  }

  useLayoutEffect(() => {
    // Сброс высоты требуется при каждой перерисовке
    textareaRef.current.style.height = null;
    // Установка высоты
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT,
    )}px`;
  }, [value]);

  return (
    <textarea
      id={id.toString()}
      className={styles.textArea}
      ref={textareaRef}
      onChange={handleChange}
      value={value}
      style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
    />
  );
};

export default Textarea;

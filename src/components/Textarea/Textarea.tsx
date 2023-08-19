import { ChangeEvent, FC, useRef, useState, useLayoutEffect } from 'react';

import styles from './Textarea.module.scss';
import { MIN_TEXTAREA_HEIGHT } from '../../utils/constants';

const Textarea: FC = (props) => {
  // const {} = props;
  const textareaRef: any = useRef(null);
  // const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState('');

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = null;
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value])

  return (
    <textarea className={styles.textArea} ref={textareaRef} onChange={handleChange} value={value} style={{minHeight: MIN_TEXTAREA_HEIGHT}} />
  );
};

export default Textarea;

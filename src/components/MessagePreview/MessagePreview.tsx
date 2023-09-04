import { FC, useState, useEffect, ChangeEvent } from 'react';

import styles from './MessagePreview.module.scss';
import { INodes, IVarData } from '../../types';
import getMessage from '../../utils/getMessage';
import useDebounce from '../../hooks/useDebounce';

interface MessagePreviewProps {
  arrVarNames: string[];
  template: INodes;
  onClose: () => void;
}

const MessagePreview: FC<MessagePreviewProps> = (props) => {
  const { arrVarNames, template, onClose } = props;
  const [message, setMessage] = useState('');
  const [varData, setVarData] = useState<IVarData>({});
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const newVarData = { ...varData };
    arrVarNames.forEach((value) => {
      //Преобразовать массив переменных в
      //объект вида {[variableName:string]:string}
      newVarData[value] = '';
    });
    setVarData(newVarData);
    setMessage(getMessage(template, newVarData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обновить сообщение c задержкой
  const updateMessage = useDebounce((newVarData: { [x: string]: string }) => {
    setMessage(getMessage(template, newVarData));
  }, 400); // Задержка нового вызова в милисекундах

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const varName = event.target.id;
    const newVarData = { ...varData, [varName]: event.target.value };
    setVarData(newVarData);
    updateMessage(newVarData);
  }

  // Функция для копирования текста в буфер обмена
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      // Для IE11
      return document.execCommand('copy', true, text);
    }
  }

  // Обработчик клика по кнопке копирования текста
  const handleCopyClick = () => {
    copyTextToClipboard(message)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Message preview</h2>
      <p className={styles.viewingWindow}>{message}</p>
      <h3 className={styles.title}>Variables</h3>
      <ul className={styles.varList}>
        {arrVarNames.map((value) => (
          <li key={value} className={styles.varListItem}>
            <label className={styles.label} htmlFor={value}>
              {`{${value}}`}
            </label>
            <input id={value} className={styles.input} onChange={handleChange} />
          </li>
        ))}
      </ul>
      <ul className={styles.buttonsList}>
        <li className={styles.buttonsListItem}>
          <button onClick={handleCopyClick} className={styles.button} type="button">
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </li>
        <li className={styles.buttonsListItem}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.highlighted}`}
            type="button">
            Close
          </button>
        </li>
      </ul>
    </section>
  );
};

export default MessagePreview;

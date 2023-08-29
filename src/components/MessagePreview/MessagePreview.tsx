import { FC, useState, useEffect, ChangeEvent } from 'react';

import styles from './MessagePreview.module.scss';
import { INodes, IVarData } from '../../types';
import getMessage from '../../utils/getMessage';
import useDebounce from '../../hooks/useDebounce';

interface MessagePreviewProps {
  arrVarNames: string[];
  template: INodes;
}

const MessagePreview: FC<MessagePreviewProps> = (props) => {
  const { arrVarNames, template } = props;
  const [message, setMessage] = useState('');
  const [varData, setVarData] = useState<IVarData>({});

  useEffect(() => {
    const newVarData = { ...varData };
    arrVarNames.forEach((value) => {
      //Преобразовать массив переменных в
      //объект вида {[variableName:string]:string}
      newVarData[value] = '';
    });
    setVarData(newVarData);
    setMessage(getMessage(newVarData, template));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обновить сообщение
  const updateMessage = useDebounce((newVarData: { [x: string]: string }) => {
    setMessage(getMessage(newVarData, template));
  }, 400); // Задержка нового вызова в милисекундах

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const varName = event.target.id;
    const newVarData = { ...varData, [varName]: event.target.value };
    setVarData(newVarData);
    // setMessage(getMessage(newVarData, template));
    updateMessage(newVarData);
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Message preview</h2>
      <div className={styles.viewingWindow}>{message}</div>
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
    </section>
  );
};

export default MessagePreview;

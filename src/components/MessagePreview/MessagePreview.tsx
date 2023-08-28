import { FC, useState, useEffect, ChangeEvent } from 'react';

import styles from './MessagePreview.module.scss';
import { INodes, IVarData } from '../../types';

interface MessagePreviewProps {
  arrVarNames: string[];
  template: INodes;
  onClose: () => void;
}

const MessagePreview: FC<MessagePreviewProps> = (props) => {
  const { arrVarNames, template, onClose } = props;
  const [message, setMessage] = useState('');
  const [varData, setVarData] = useState<IVarData>({});

  useEffect(() => {
    const newVarData = { ...varData };
    arrVarNames.forEach((value) => {
      //Преобразовать массив переменных в
      newVarData[value] = ''; //объект вида {[variableName:string]:string}
    });
    setVarData(newVarData);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const varName = event.target.id;
    const newVarData = { ...varData, [varName]: event.target.value };
    setVarData(newVarData);
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

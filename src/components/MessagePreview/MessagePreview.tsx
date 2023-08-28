import { FC, useState, useEffect } from 'react';

import styles from './MessagePreview.module.scss';
import { INodes } from '../../types/node';

interface MessagePreviewProps {
  arrVarNames: string[];
  template: INodes;
  onClose: () => void;
}

interface IVarData {
  [key: string]: string;
}

// const defaultVarData: {[key: string]: string} = {};

const MessagePreview: FC<MessagePreviewProps> = (props) => {
  const {arrVarNames, template, onClose} = props;
  const [varData, setVarData] = useState<IVarData>({});
  
  useEffect(() => {
    const newVarData = {...varData};
    arrVarNames.forEach(value => { //Преобразовать массив переменных в
      newVarData[value] = ''; //объект вида {[variableName:string]:string}
    })
    setVarData(newVarData);
  }, [arrVarNames, varData]);

  function handleInput(event: any, varName: string) {
    const newVarData = {...varData, [varName]: event.target.value}
    setVarData(newVarData);
  }


  return (
  <section className={styles.root}>
    <h2 className={styles.title}>Message preview</h2>
    <div className={styles.viewingWindow}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ad non velit quia eos corporis incidunt natus soluta, aspernatur minus, blanditiis sint necessitatibus inventore adipisci ipsam id hic sunt quod!
    </div>
    <h2 className={styles.title}>Variables</h2>
    <ul className={styles.varList}>
      <li className={styles.varListItem}>
        <label className={styles.label} htmlFor="firstname">
          {"{firstname}"}
        </label>
        <input id="firstname" className={styles.input} />
      </li>
      <li className={styles.varListItem}>
        <label className={styles.label} htmlFor="lastname">
          {"{lastname}"}
        </label>
        <input id="lastname" className={styles.input} />
      </li>
      <li className={styles.varListItem}>
        <label className={styles.label} htmlFor="company">
          {"{company}"}
        </label>
        <input id="company" className={styles.input} />
      </li>
      <li className={styles.varListItem}>
        <label className={styles.label} htmlFor="position">
          {"{position}"}
        </label>
        <input id="position" className={styles.input} />
      </li>
    </ul>
  </section>
  );
};

export default MessagePreview;

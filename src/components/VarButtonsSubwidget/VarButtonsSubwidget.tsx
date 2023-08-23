import { FC } from 'react';

import styles from './VarButtonsSubwidget.module.scss';

interface VarButtonsSubwidgetProps {
  arrVarNames: string[];
  onCLickVarBtn: (value: string) => void;
}

const VarButtonsSubwidget: FC<VarButtonsSubwidgetProps> = (props) => {
  const {arrVarNames, onCLickVarBtn} = props;
  return (
    <ul className={styles.varBtnList}>
      {arrVarNames.map((value) => {
        return (
          <li key={value} className={styles.btnListItem}>
            <button onClick={() => onCLickVarBtn(value)} className={styles.varBtn} type="button">{`{${value}}`}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default VarButtonsSubwidget;

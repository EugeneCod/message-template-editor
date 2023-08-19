import { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './ConditionalBranch.module.scss';
import { Textarea } from '../';

const cx = classNames.bind(styles);

const ConditionalBranch: FC = () => {
  const conditionalLabelIf = cx({
    conditionalLabel: true,
    blue: true,
  });
  const conditionalLabelThen = cx({
    conditionalLabel: true,
    pink: true,
  });
  const conditionalLabelElse = cx({
    conditionalLabel: true,
    turquoise: true,
  });
  return (
    <div className={styles.branchContainer}>
      <div className={styles.closeBtnContainer}>
        <button type="button" className={styles.closeBtn}>&#215;</button>
      </div>
      <fieldset className={styles.conditionalFieldset}>
        <div className={styles.conditionalBlock}>
          <label className={conditionalLabelIf}>IF</label>
          <Textarea />
        </div>
        <div className={styles.conditionalBlock}>
          <label className={conditionalLabelThen}>THEN</label>
          <Textarea />
        </div>
        <div className={styles.conditionalBlock}>
          <label className={conditionalLabelElse}>ELSE</label>
          <Textarea />
        </div>
      </fieldset>
    </div>
  );
};

export default ConditionalBranch;

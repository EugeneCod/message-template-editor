import { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './Label.module.scss';

interface ILabelProps {
  value: string;
}

const cx = classNames.bind(styles);

const Label:FC<ILabelProps> = (props) => {
  const { value } = props;

  const labelStyles = cx({
    conditionalLabel: true,
    blue: value === 'if',
    pink: value === 'then',
    turquoise: value === 'else',
  });

  return (
    <label className={labelStyles}>{value}</label>
  )
}

export default Label
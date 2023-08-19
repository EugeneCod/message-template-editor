import { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './Editor.module.scss';
import { ConditionalBranch, Textarea, VarButtonsSubwidget } from '../';

const cx = classNames.bind(styles);

interface IEditorProps {
  isOpen: boolean;
  onCloseEditor: () => void;
  onOpenPopupWithMessagePreview: () => void;
}

// круглые скобки &#40; &#41;
// фигурные скобки &#123; &#125;

const Editor: FC<IEditorProps> = (props) => {
  const { isOpen, onCloseEditor, onOpenPopupWithMessagePreview } = props;

  const rootStyles = cx({
    root: true,
    opened: isOpen,
  });
  const highlightedFrIf = cx({
    highlightedFr: true,
    blue: true,
  });
  const highlightedFrThen = cx({
    highlightedFr: true,
    pink: true,
  });
  const highlightedFrElse = cx({
    highlightedFr: true,
    turquoise: true,
  });
  const controlCloseBtn = cx({
    controlBtn: true,
    highlighted: true,
  });

  function addVariable(varName: string) {}

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('submit');
    
  }

  return (
    <form onSubmit={handleSubmit} className={rootStyles}>
      <div className={styles.topContainer}>
        <h1 className={styles.title}>Message Template Editor</h1>
        <VarButtonsSubwidget onCLickVarBtn={addVariable} />
        <button type="button" className={styles.conditionalBranchingBtn}>
          Click to add: <span className={highlightedFrIf}>IF</span> &#40;&#123;some_variable&#125; or
          expression&#41; <span className={highlightedFrThen}>THEN</span> &#40;then_value&#41;{' '}
          <span className={highlightedFrElse}>ELSE</span> &#40;else_value&#41;
        </button>
        <label className={styles.label} >
          Edit message
        </label>
        <Textarea />
        {/* <ConditionalBranch /> */}
      </div>
      <ul className={styles.ctrlButtonsList}>
        <li className={styles.buttonsListItem}>
          <button type="button" onClick={() => onOpenPopupWithMessagePreview()} className={styles.controlBtn}>
            Preview
          </button>
        </li>
        <li className={styles.buttonsListItem}>
          <button type="submit" className={styles.controlBtn}>
            Save
          </button>
        </li>
        <li className={styles.buttonsListItem}>
          <button type="button" onClick={() => onCloseEditor()} className={controlCloseBtn}>
            Close
          </button>
        </li>
      </ul>
    </form>
  );
};

export default Editor;

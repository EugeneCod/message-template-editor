import { FC, useState, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames/bind';

import styles from './Editor.module.scss';
import { NodeTree, VarButtonsSubwidget } from '../';
import { INITAIL_TEMPLATE, sampleData } from '../../utils/constants';
import { INodes, INodeData } from '../../types/node';
import { log } from 'console';

const cx = classNames.bind(styles);

interface IEditorProps {
  arrVarNames: string[];
  template: INodes;
  onSetTemplate: (template: INodes) => void;
  callbackSave: () => Promise<void>;
  isOpen: boolean;
  onCloseEditor: () => void;
  onOpenPopupWithMessagePreview: () => void;
}

const Editor: FC<IEditorProps> = (props) => {
  const {
    arrVarNames,
    template,
    onSetTemplate,
    callbackSave,
    isOpen,
    onCloseEditor,
    onOpenPopupWithMessagePreview,
  } = props;

  const [lastCaretData, setLastCaretData] = useState({ textareaId: 0, position: 0 });

  useEffect(() => {
    const templateIsEmpty = Object.entries(template).length === 0;
    templateIsEmpty && onSetTemplate(INITAIL_TEMPLATE);
  }, [template, onSetTemplate]);

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

  function insertVariable(varName: string) {
    const nextTemplate = {...template};
    const lastActiveNode = nextTemplate[lastCaretData.textareaId];
    if (lastActiveNode) {
      const startString = lastActiveNode.text.slice(0, lastCaretData.position);
      const endString = lastActiveNode.text.slice(lastCaretData.position);
      const resultString = `${startString}${varName}${endString}`;
      updateNodeText(resultString, lastActiveNode, nextTemplate);
    }
  }

  function updateNodeText(newText: string, node: INodeData, nextTemplate: INodes) {
    node.text = newText;
    onSetTemplate(nextTemplate);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>, id:number) {

  }

  return (
    <form onSubmit={handleSubmit} className={rootStyles}>
      <div className={styles.topContainer}>
        <h1 className={styles.title}>Message Template Editor</h1>
        <VarButtonsSubwidget arrVarNames={arrVarNames} onCLickVarBtn={insertVariable} />
        <button type="button" className={styles.conditionalBranchingBtn}>
          Click to add: <span className={highlightedFrIf}>IF</span> &#40;&#123;some_variable&#125;
          or expression&#41; <span className={highlightedFrThen}>THEN</span> &#40;then_value&#41;{' '}
          <span className={highlightedFrElse}>ELSE</span> &#40;else_value&#41;
        </button>
        <label className={styles.label}>Edit message</label>
        {/* <div className={styles.inputLines}> */}
          {/* {sampleData[0].childIds.map((id) => ( */}
            <NodeTree nodeId={0} template={sampleData} onTextAreaChange={handleTextAreaChange}/>
          {/* ))} */}
        {/* </div> */}
      </div>
      <ul className={styles.ctrlButtonsList}>
        <li className={styles.buttonsListItem}>
          <button
            type="button"
            onClick={() => onOpenPopupWithMessagePreview()}
            className={styles.controlBtn}>
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

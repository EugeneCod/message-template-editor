import { FC, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import classNames from 'classnames/bind';

import styles from './Editor.module.scss';
import { NodeTree, VarButtonsSubwidget } from '../';
import { INITAIL_TEMPLATE, sampleData } from '../../utils/constants';
import { INodes, INode } from '../../types/node';

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

  // const iduse1 = useId();  формат ':r1:',':r2:' и т.д
  // const iduse2 = useId();
  // console.log(parseInt(iduse1));
  // console.log(iduse2);

  const [lastCaretData, setLastCaretData] = useState({ textareaId: 0, position: 0 });
  const [templateIsEmpty, setTemplateIsEmpty] = useState(true);

  useEffect(() => {
    const templateIsEmpty = Object.entries(template).length === 0;
    templateIsEmpty && onSetTemplate(INITAIL_TEMPLATE);
    setTemplateIsEmpty(false);
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

  function updateNodeText(newText: string, nodeId: number) {
    const node = template[nodeId];
    const newNode = { ...node, text: newText };
    const newTemplate = { ...template, [nodeId]: newNode };
    onSetTemplate(newTemplate);
    console.log(newTemplate[nodeId]);
  }

  function insertVariable(varName: string) {
    const nodeId = lastCaretData.textareaId;
    const lastActiveNode = template[nodeId];
    if (lastActiveNode) {
      const startString = lastActiveNode.text.slice(0, lastCaretData.position);
      const endString = lastActiveNode.text.slice(lastCaretData.position);
      const resultString = `${startString}{${varName}}${endString}`;
      updateNodeText(resultString, nodeId);
    }
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>, id: number) {
    const textarea = event.target;
    const newText = textarea.value;
    updateNodeText(newText, id);
  }

  function handleTextAreaSelect(event: SyntheticEvent<HTMLTextAreaElement, Event>, id: number) {
    const textarea = event.target as EventTarget & HTMLTextAreaElement;
    setLastCaretData({
      textareaId: parseInt(textarea.id),
      position: textarea.selectionStart,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    callbackSave();
  }

  function handleDeleteBranch(nodeId: number) {
    const node = template[nodeId];
    const removedNodes = node.childIds;
    const newNode = { ...node, childIds: [] };
    const newTemplate = { ...template, [nodeId]: newNode };

    for (let id of removedNodes) {
      delete newTemplate[id];
    }

    onSetTemplate(newTemplate);
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
        {!templateIsEmpty && (
          <NodeTree
            nodeId={0}
            template={template}
            onTextAreaChange={handleTextAreaChange}
            onTextAreaSelect={handleTextAreaSelect}
            onDeleteBranch={handleDeleteBranch}
          />
        )}
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

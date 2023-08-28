import { FC, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import classNames from 'classnames/bind';

import styles from './Editor.module.scss';
import { NodeTree, VarButtonsSubwidget } from '../';
import { INITAIL_TEMPLATE } from '../../utils/constants';
import { INodes } from '../../types/node';

const cx = classNames.bind(styles);

interface IEditorProps {
  arrVarNames: string[];
  template: INodes;
  onSetTemplate: (template: INodes) => void;
  callbackSave: () => Promise<boolean>;
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
  const [templateIsEmpty, setTemplateIsEmpty] = useState(true);
  const [activeTextArea, setActiveTextArea] = useState<HTMLTextAreaElement | null>(null);

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
  }

  const setTheCaretPosition = () => {
    if (activeTextArea) {
      const position = lastCaretData.position;
      activeTextArea.focus();
      setTimeout(() => {
        activeTextArea.setSelectionRange(position, position);
      }, 1);
    }
  };

  function insertVariable(varName: string) {
    const nodeId = lastCaretData.textareaId;
    const lastActiveNode = template[nodeId];
    if (lastActiveNode) {
      const startString = lastActiveNode.text.slice(0, lastCaretData.position);
      const endString = lastActiveNode.text.slice(lastCaretData.position);
      const resultString = `${startString}{${varName}}${endString}`;
      updateNodeText(resultString, nodeId);
      setLastCaretData({
        ...lastCaretData,
        position: lastCaretData.position + varName.length + 2,
      });
      setTheCaretPosition();
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
    if (textarea !== activeTextArea) {
      setActiveTextArea(textarea);
    }
  }
  
  function addConditionalBranch() {
    const nodeId: number = lastCaretData.textareaId;
    let targetNode = template[nodeId];
    const hasChildren = targetNode.childIds.length !== 0;
    if (targetNode.name === 'if') return; //Если текущий узел "if" - завершить выполнение.
    
    const startString = template[nodeId].text.slice(0, lastCaretData.position);
    const endString = template[nodeId].text.slice(lastCaretData.position);
    let shiftedString = '';
    
    const newTemplate = {...template};

    if (hasChildren) {//Если текущий узел имеет дочерние узлы - добавить
      const newCurrentNode = {
        ...targetNode,
        text: startString,
      };
      newTemplate[nodeId] = newCurrentNode;
      targetNode = template[targetNode.childIds[3]]; //ветку в его завершающий дочерний узел.
      shiftedString = targetNode.text;
    }

    const currentIds = Object.keys(template).map(Number); //Получить числовой массив текущих id.
    const nextId = Math.max(...currentIds) + 1; //Определить следующий id узла.
    
    const newNode = {
      ...targetNode,
      childIds: [nextId, nextId + 1, nextId + 2, nextId + 3],
      text: hasChildren ? endString : startString,
    };

    newTemplate[targetNode.id] = newNode;
    newTemplate[nextId] = { id: nextId, text: '', name: 'if', childIds: [] };
    newTemplate[nextId + 1] = { id: nextId + 1, text: '', name: 'then', childIds: [] };
    newTemplate[nextId + 2] = { id: nextId + 2, text: '', name: 'else', childIds: [] };
    newTemplate[nextId + 3] = { id: nextId + 3, text: hasChildren ? shiftedString : endString, name: 'end', childIds: [] };
    onSetTemplate(newTemplate);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    callbackSave();
  }

  function recursiveChildDeletion(nodeId: number, template: INodes) {
    let childIds: number[] = template[nodeId].childIds;
    if (childIds.length) {
      childIds.forEach(id => {
        recursiveChildDeletion(id, template)
        delete template[id];
      }) 
    }
    delete template[nodeId];
  } 

  function handleDeleteBranch(nodeId: number) {
    const node = template[nodeId]; //Определить текущий активный узел.
    const removedNodes = node.childIds; //Определить ids его дочерних элементов.
    const childEnd = template[removedNodes[3]]; //Определить его дочерний 'end' элемент.
    const endText = childEnd.text; //Сохранить текст его дочернего 'end' элемента.
    const resultString = `${node.text}${endText}`; //Сохранить склеенный начальный тест с ранее сохраненным.
    const newNode = { ...node, childIds: childEnd.childIds, text: resultString }; //Создать новый узел с обновленным тестом и массивом дочерних id.
    const newTemplate = { ...template, [nodeId]: newNode }; //Создать новый шаблон с раннее объявленным новым узлом.
    delete newTemplate[childEnd.id]; //Удалить дочеринй 'end' элемент.
    removedNodes.pop(); //Удалить из массива подготовленных к удалению индексов последний, указывающий на childEnd.
    removedNodes.forEach(id => { //Удалить все вложенные дочерние узлы у 'if', 'then', 'else'.
      recursiveChildDeletion(id, newTemplate)
    })

    for (let id of removedNodes) {
      delete newTemplate[id]; // Удалить оставшиеся на верхнем уровне узлы 'if', 'then', 'else'.
    }
    onSetTemplate(newTemplate); // Обновить шаблон.
  }


  return (
    <form onSubmit={handleSubmit} className={rootStyles}>
      <div className={styles.topContainer}>
        <h1 className={styles.title}>Message Template Editor</h1>
        <VarButtonsSubwidget arrVarNames={arrVarNames} onCLickVarBtn={insertVariable} />
        <button onClick={addConditionalBranch} type="button" className={styles.conditionalBranchingBtn}>
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

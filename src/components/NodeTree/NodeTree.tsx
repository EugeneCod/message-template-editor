import { FC, ChangeEvent, SyntheticEvent } from 'react';

import styles from './NodeTree.module.scss';
import { Textarea, Label } from '..';
import { INodes } from '../../types/node';

interface INodeTreeProps {
  nodeId: number;
  template: INodes;
  onTextAreaChange: (event: ChangeEvent<HTMLTextAreaElement>, id: number) => void;
  onTextAreaSelect: (event: SyntheticEvent<HTMLTextAreaElement, Event>, id: number) => void;
  onDeleteBranch: (nodeId: number) => void;
}

const NodeTree: FC<INodeTreeProps> = (props) => {
  const { nodeId, template, onTextAreaChange, onTextAreaSelect, onDeleteBranch } = props;
  const node = template[nodeId];
  // В массиве идут то порядку Id узлов ответвлений
  // if, then, else, end
  const childIds = node.childIds;

  function handleBtnClick() {
    onDeleteBranch(nodeId);
  }

  return (
    <>
      {node && (
        <div>
          <Textarea id={nodeId} initialText={node.text} onChange={onTextAreaChange} onSelect={onTextAreaSelect} />
          {childIds.length !== 0 && (
            <>
              <div className={styles.branchContainer}>
                <div className={styles.closeBtnContainer}>
                  <button type="button" className={styles.closeBtn} onClick={handleBtnClick}>
                    &#215;
                  </button>
                </div>
                <fieldset className={styles.conditionalFieldset}>
                  <div className={styles.conditionalBlock}>
                    <Label value={'if'} />
                    <NodeTree
                      nodeId={childIds[0]}
                      template={template}
                      onTextAreaChange={onTextAreaChange}
                      onTextAreaSelect={onTextAreaSelect}
                      onDeleteBranch={onDeleteBranch}
                    />
                  </div>
                  <div className={styles.conditionalBlock}>
                    <Label value={'then'} />
                    <NodeTree
                      nodeId={childIds[1]}
                      template={template}
                      onTextAreaChange={onTextAreaChange}
                      onTextAreaSelect={onTextAreaSelect}
                      onDeleteBranch={onDeleteBranch}
                    />
                  </div>
                  <div className={styles.conditionalBlock}>
                    <Label value={'else'} />
                    <NodeTree
                      nodeId={childIds[2]}
                      template={template}
                      onTextAreaChange={onTextAreaChange}
                      onTextAreaSelect={onTextAreaSelect}
                      onDeleteBranch={onDeleteBranch}
                    />
                  </div>
                </fieldset>
              </div>
              <NodeTree
                nodeId={childIds[3]}
                template={template}
                onTextAreaChange={onTextAreaChange}
                onTextAreaSelect={onTextAreaSelect}
                onDeleteBranch={onDeleteBranch}
              />
            </>
          )}
        </div>
      )}
    </>
  );

  // <div className={styles.treeContainer}>
  //   <div className={styles.closeBtnContainer}>
  //     <button type="button" className={styles.closeBtn}>
  //       &#215;
  //     </button>
  //   </div>
  //   <fieldset className={styles.conditionalFieldset}>
  //     <div className={styles.conditionalBlock}>
  //       <label className={conditionalLabelIf}>IF</label>
  //       <Textarea />
  //     </div>
  //     <div className={styles.conditionalBlock}>
  //       <label className={conditionalLabelThen}>THEN</label>
  //       <Textarea />
  //     </div>
  //     <div className={styles.conditionalBlock}>
  //       <label className={conditionalLabelElse}>ELSE</label>
  //       <Textarea />
  //     </div>
  //   </fieldset>
  // </div>
  // );
};

export default NodeTree;

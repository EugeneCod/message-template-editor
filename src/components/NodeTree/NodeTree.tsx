import { FC, ChangeEvent } from 'react';

import styles from './NodeTree.module.scss';
import { Textarea, Label } from '..';
import { INodes } from '../../types/node';

interface INodeTreeProps {
  nodeId: number;
  template: INodes;
  onTextAreaChange: (event: ChangeEvent<HTMLTextAreaElement>, id: number) => void;
}

const NodeTree: FC<INodeTreeProps> = (props) => {
  const { nodeId, template, onTextAreaChange } = props;
  const node = template[nodeId];
  // В массиве идут то порядку Id узлов ответвлений
  // if, then, else, end
  const childIds = node.childIds;

  return (
    <>
      {node && (
        <div>
          <Textarea id={nodeId} initialText={node.text} onChange={onTextAreaChange} />
          {childIds.length !== 0 && (
            <>
              <div className={styles.branchContainer}>
                <div className={styles.closeBtnContainer}>
                  <button type="button" className={styles.closeBtn}>
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
                    />
                  </div>
                  <div className={styles.conditionalBlock}>
                    <Label value={'then'} />
                    <NodeTree
                      nodeId={childIds[1]}
                      template={template}
                      onTextAreaChange={onTextAreaChange}
                    />
                  </div>
                  <div className={styles.conditionalBlock}>
                    <Label value={'else'} />
                    <NodeTree
                      nodeId={childIds[2]}
                      template={template}
                      onTextAreaChange={onTextAreaChange}
                    />
                  </div>
                </fieldset>
              </div>
              <Textarea id={childIds[3]} initialText={template[childIds[3]].text} onChange={onTextAreaChange} />
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

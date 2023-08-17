import {FC} from 'react'
import classNames from 'classnames/bind';

import styles from './Editor.module.scss';

const cx = classNames.bind(styles);



// круглые скобки &#40; &#41;
// фигурные скобки &#123; &#125;



// import React from "react";
// const MIN_TEXTAREA_HEIGHT = 32;
// export default function App() {
//   const textareaRef = React.useRef(null);
//   const [value, setValue] = React.useState("");
//   const onChange = (event) => setValue(event.target.value);
//   React.useLayoutEffect(() => {
//     // Reset height - important to shrink on delete
//     textareaRef.current.style.height = "inherit";
//     // Set height
//     textareaRef.current.style.height = `${Math.max(
//       textareaRef.current.scrollHeight,
//       MIN_TEXTAREA_HEIGHT
//     )}px`;
//   }, [value]);
//   return (
//     <textarea
//       onChange={onChange}
//       ref={textareaRef}
//       style={{
//         minHeight: MIN_TEXTAREA_HEIGHT,
//         resize: "none"
//       }}
//       value={value}
//     />
//   );
// }




const Editor:FC = () => {

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
    <form className={styles.root}>
      <h1 className={styles.header}>Message Template Editor</h1>
      <ul className={styles.varBtnList}>
        <li className={styles.btnListItem}><button className={styles.varBtn}>{"{firstname}"}</button></li>
        <li className={styles.btnListItem}><button className={styles.varBtn}>{"{lastname}"}</button></li>
        <li className={styles.btnListItem}><button className={styles.varBtn}>{"{company}"}</button></li>
        <li className={styles.btnListItem}><button className={styles.varBtn}>{"{position}"}</button></li>
      </ul>
      <button className={styles.conditionalBranchingBtn}>
        Click to add: <span className={highlightedFrIf}>IF</span> &#40;&#123;some_variable&#125; or expression&#41; <span className={highlightedFrThen}>THEN</span> &#40;then_value&#41; <span className={highlightedFrElse}>ELSE</span> &#40;else_value&#41;
      </button>
      <label className={styles.label} htmlFor="message_begin">Edit message</label>
      <textarea className={styles.textArea} autoFocus id="message_begin" name="message_begin" ></textarea>
      <div className={styles.branchContainer}>
        <div className={styles.closeBtnContainer}>
          <button className={styles.closeBtn}>&#215;</button>
        </div>
        <fieldset className={styles.conditionalFieldset}>
          <div className={styles.conditionalBlock}>
            <label className={conditionalLabelIf} htmlFor="conditional_if">IF</label>
            <textarea className={styles.textArea} id="conditional_if" name="conditional_if" ></textarea>
          </div>
          <div className={styles.conditionalBlock}>
            <label className={conditionalLabelThen} htmlFor="conditional_then">THEN</label>
            <textarea className={styles.textArea} id="conditional_then" name="conditional_then" ></textarea>
          </div>
          <div className={styles.conditionalBlock}>
            <label className={conditionalLabelElse} htmlFor="conditional_else">ELSE</label>
            <textarea className={styles.textArea} id="conditional_else" name="conditional_else" ></textarea>
          </div>
        </fieldset>
      </div>
      <textarea className={styles.textArea} id="message_end" name="message_end" ></textarea>
      <ul className={styles.ctrlButtonsList}>
        <li className={styles.buttonsListItem}><button className={styles.controlBtn}>Preview</button></li>
        <li className={styles.buttonsListItem}><button className={styles.controlBtn}>Save</button></li>
        <li className={styles.buttonsListItem}><button className={controlCloseBtn}>Close</button></li>
      </ul>
    </form>
    
  )
}

export default Editor
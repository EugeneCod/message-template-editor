import { FC, useState } from 'react';

import styles from './App.module.scss';
import { StartButton, Editor, PopupWithMessgePreview } from '../';

const App: FC = () => {
  const [popupWithMessagePreviewIsOpen, setPopupWithMessagePreviewIsOpen] = useState(false);
  const [editorIsOpen, setEditorIsOpen] = useState(false);

  function togglePopupMessagePreview() {
    setPopupWithMessagePreviewIsOpen((prev) => !prev);
  }

  function toggleOpenEditor() {
    setEditorIsOpen((prev) => !prev);
  }

  return (
    <main className={styles.root}>
      <StartButton onOpenEditor={toggleOpenEditor} />
      <Editor
        isOpen={editorIsOpen}
        onCloseEditor={toggleOpenEditor}
        onOpenPopupWithMessagePreview={togglePopupMessagePreview}
      />
      <PopupWithMessgePreview
        isOpen={popupWithMessagePreviewIsOpen}
        onClose={togglePopupMessagePreview}
      />
    </main>
  );
};

export default App;

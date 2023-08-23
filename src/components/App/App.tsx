// Сохраниение в localStorage
//    localStorage.setItem('initialMovies', JSON.stringify(foundMovies));
// Получение из localStorage
//    const resultMovies = JSON.parse(localStorage.getItem('resultMovies')) || [];
// Удаление
//    localStorage.removeItem('resultMovies');

import { FC, useEffect, useState } from 'react';

import styles from './App.module.scss';
import { StartButton, Editor, PopupWithMessgePreview } from '../';
import { ARR_VAR_NAMES } from '../../utils/constants';
import { INodes } from '../../types/node';

const App: FC = () => {
  const [popupWithMessagePreviewIsOpen, setPopupWithMessagePreviewIsOpen] = useState(false);
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [template, setTemplate] = useState<INodes>({});

  useEffect(() => {
    //Проверить, есть ли в локальном хранилище сохраненный шаблон
    // и обновить текущей шаблон в этом случае
    const savedTemplateJson = localStorage.getItem('template');
    if (savedTemplateJson === null) {
      return;
    }
    setTemplate(JSON.parse(savedTemplateJson));
  }, []);

  function togglePopupMessagePreview() {
    setPopupWithMessagePreviewIsOpen((prev) => !prev);
  }

  function toggleOpenEditor() {
    setEditorIsOpen((prev) => !prev);
  }

  function handleUpdateTemplate(template: INodes) {
    setTemplate(template);
  }

  async function callbackSave() {
    localStorage.setItem('template', JSON.stringify(template));
  }

  return (
    <main className={styles.root}>
      <StartButton onOpenEditor={toggleOpenEditor} />
      <Editor
        arrVarNames={ARR_VAR_NAMES}
        template={template}
        onSetTemplate={handleUpdateTemplate}
        callbackSave={callbackSave}
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

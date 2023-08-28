import { FC, useEffect, useState } from 'react';

import styles from './App.module.scss';
import { ARR_VAR_NAMES } from '../../utils/constants';
import { INodes } from '../../types';
import useConfirm from '../../hooks/useConfirm';
import {
  StartButton,
  Editor,
  PopupWithMessgePreview,
  PopupWithConfirm,
  PopupWithNotification,
} from '../';

const App: FC = () => {
  const [popupWithMessagePreviewIsOpen, setPopupWithMessagePreviewIsOpen] = useState(true);
  const [popupWithNotificationOptions, setPopupWithNotificationOptions] = useState({
    isOpen: false,
    text: '',
    status: false,
  });
  const [popupWithConfirmOptions, setPopupWithConfirmOptions] = useState({
    isOpen: false,
    text: '',
  });
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [template, setTemplate] = useState<INodes>({});
  const { confirm, handleConfirm, handleCancel } = useConfirm(setPopupWithConfirmOptions);

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

  function openPopupWithNotification(text: string, status: boolean) {
    setPopupWithNotificationOptions({ isOpen: true, text, status });
  }

  function closePopupWithNotification() {
    setPopupWithNotificationOptions({ isOpen: false, text: '', status: false });
  }

  function toggleOpenEditor() {
    setEditorIsOpen((prev) => !prev);
  }

  async function confirmCloseEditor() {
    const isConfirmed = await confirm('Сохранить шаблон перед выходом?');
    if (isConfirmed) {
      const isSaved = await callbackSave();
      isSaved && toggleOpenEditor();
    } else {
      toggleOpenEditor();
    }
  }

  function handleUpdateTemplate(template: INodes) {
    setTemplate(template);
  }

  async function callbackSave(): Promise<boolean> {
    return updateLocalStorage()
      .then((res) => {
        openPopupWithNotification(res, true);
        return true;
      })
      .catch((err) => {
        openPopupWithNotification(err.message, false);
        return false;
      });
  }

  async function updateLocalStorage() {
    return new Promise<string>((resolve, reject) => {
      localStorage.setItem('template', JSON.stringify(template));
      const savedTemplate = localStorage.getItem('template');
      if (savedTemplate) {
        resolve('Шаблон успешно сохранен!');
      } else reject(new Error('При сохранении шаблона произошла ошибка!'));
    });
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
        onCloseEditor={confirmCloseEditor}
        onOpenPopupWithMessagePreview={togglePopupMessagePreview}
      />
      <PopupWithMessgePreview
        isOpen={popupWithMessagePreviewIsOpen}
        onClose={togglePopupMessagePreview}
        arrVarNames={ARR_VAR_NAMES}
        template={template}
      />
      <PopupWithConfirm
        isOpen={popupWithConfirmOptions.isOpen}
        question={popupWithConfirmOptions.text}
        onConfirm={handleConfirm}
        onClose={handleCancel}
      />
      <PopupWithNotification
        isOpen={popupWithNotificationOptions.isOpen}
        notification={popupWithNotificationOptions.text}
        status={popupWithNotificationOptions.status}
        onClose={closePopupWithNotification}
      />
    </main>
  );
};

export default App;

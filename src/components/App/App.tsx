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
  const [popupWithMessagePreviewIsOpen, setPopupWithMessagePreviewIsOpen] = useState(false);
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
  const [arrVarNames, setArrVarNames] = useState(ARR_VAR_NAMES);
  const { confirm, handleConfirm, handleCancel } = useConfirm(setPopupWithConfirmOptions);

  useEffect(() => {
    //Проверить, есть ли в локальном хранилище сохраненный шаблон
    //и переменные, и обновить текущие в этом случае
    const savedTemplateJson = localStorage.getItem('template');
    const savedArrVarNames = localStorage.getItem('arrVarNames');
    if (savedTemplateJson !== null) {
      setTemplate(JSON.parse(savedTemplateJson));
    }
    if (savedArrVarNames !== null) {
      setArrVarNames(JSON.parse(savedArrVarNames));
    }
  }, []);

  function togglePopupMessagePreview() {
    setPopupWithMessagePreviewIsOpen((prev) => !prev);
  }

  // Открыть окно с уведомлением (status определяет одну из двух картинок)
  function openPopupWithNotification(text: string, status: boolean) {
    setPopupWithNotificationOptions({ isOpen: true, text, status });
  }

  function closePopupWithNotification() {
    setPopupWithNotificationOptions({ isOpen: false, text: '', status: false });
  }

  function toggleOpenEditor() {
    setEditorIsOpen((prev) => !prev);
  }

  // Закрытие редактора с использованием диалогового окна с предложением
  // сохранить текущий шаблон
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

  // Функция сохранения текущего шаблона в локальном хранилище
  // с показом окна уведомления
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
        arrVarNames={arrVarNames}
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
        arrVarNames={arrVarNames}
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

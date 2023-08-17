import { FC, useState } from 'react'

import styles from './App.module.scss'
import { StartButton, Editor, PopupWithMessgePreview } from '../';


const App: FC = () => {
  const [popupWithMessagePreviewIsOpen, setPopupWithMessagePreviewIsOpen] = useState(true)
  
  function closePopup() {
    setPopupWithMessagePreviewIsOpen(false);
    // setPopupWithMessagePreviewIsOpen(true);
  }

  return (
    <main className={styles.root}>
      <StartButton/>
      <Editor />
      <PopupWithMessgePreview isOpen={popupWithMessagePreviewIsOpen} onClose={closePopup}/>
    </main>
  )
}

export default App

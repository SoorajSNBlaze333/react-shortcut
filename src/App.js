import React, { useEffect, useRef, useState } from 'react';
import { Portal } from './components/Portal';
import Shortcut from './components/Shortcut';
import { useOnClickOutside } from './hooks/useClickOutside';
import Backdrop from './assets/backdrop.jpg';

const data = [
  { text: 'arrangement', default: true, onClick: (val) => console.log(val) },
  { text: 'early', default: true, onClick: (val) => console.log(val) },
  { text: 'command', default: true, onClick: (val) => console.log(val) },
  { text: 'swam', onClick: (val) => console.log(val) },
  { text: 'worth', onClick: (val) => console.log(val) },
  { text: 'syllable', onClick: (val) => console.log(val) },
  { text: 'examine', onClick: (val) => console.log(val) },
  { text: 'amount', onClick: (val) => console.log(val) },
  { text: 'saddle', onClick: (val) => console.log(val) },
  { text: 'vertical', onClick: (val) => console.log(val) },
  { text: 'pocket', onClick: (val) => console.log(val) },
  { text: 'draw', onClick: (val) => console.log(val) },
  { text: 'carried', onClick: (val) => console.log(val) },
  { text: 'bark', onClick: (val) => console.log(val) },
  { text: 'deer', onClick: (val) => console.log(val) },
  { text: 'industry', onClick: (val) => console.log(val) },
  { text: 'history', onClick: (val) => console.log(val) },
  { text: 'statement', onClick: (val) => console.log(val) },
  { text: 'table', onClick: (val) => console.log(val) },
]

export default function App() {
  const [visibility, setVisibility] = useState(true);
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  // const eventRef = useRef();
  const dialogRef = useRef();
  useOnClickOutside(dialogRef, () => setVisibility(false));

  const handleShortcutKey = (e) => {
    if (e.metaKey && e.keyCode === 107) {
      setVisibility(prev => !prev);
    }
  }

  const handleKeyDown = (e) => setLastKeyPressed(e);

  useEffect(() => {
    window.addEventListener('keypress', handleShortcutKey);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleShortcutKey);
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    if (visibility) document.body.classList.add("hidden-scroll");
    else document.body.classList.remove("hidden-scroll");
  }, [visibility])

  return (
    <div>
      <img src={Backdrop} alt='' style={{ width: '100vw' }}/>
      {visibility && <Portal>
        <Shortcut
          ref={dialogRef}
          visibility={visibility}
          data={data}
          lastKeyPressed={lastKeyPressed}
        />
      </Portal>}
    </div>
  );
}
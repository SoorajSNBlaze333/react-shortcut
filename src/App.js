import React, { useEffect, useRef, useState } from 'react';
import { Portal } from './components/Portal';
import Shortcut from './components/Shortcut';
import { useOnClickOutside } from './hooks/useClickOutside';

const data = [
  { text: 'apple', default: true, onClick: (val) => console.log(val) },
  { text: 'banana', default: true, onClick: (val) => console.log(val) },
  { text: 'cucumber', default: true, onClick: (val) => console.log(val) },
  { text: 'watermelon', onClick: (val) => console.log(val) },
]

export default function App() {
  const [visibility, setVisibility] = useState(true);
  // const eventRef = useRef();
  const dialogRef = useRef();
  useOnClickOutside(dialogRef, () => setVisibility(false));

  const handleShortcutKey = (e) => {
    if (e.metaKey && e.keyCode === 107) {
      setVisibility(prev => !prev);
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', handleShortcutKey);
    return () => {
      window.removeEventListener('keypress', handleShortcutKey);
    }
  }, []);

  useEffect(() => {
    if (visibility) document.body.classList.add("hidden-scroll");
    else document.body.classList.remove("hidden-scroll");
  }, [visibility])

  return (
    <div>
      {visibility && <Portal>
        <Shortcut
          ref={dialogRef}
          visibility={visibility}
          data={data}
        />
      </Portal>}
    </div>
  );
}
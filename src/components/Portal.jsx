/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const [container] = useState(() => {
    return document.createElement(el);
  });

  useEffect(() => {
    container.classList.add(className)
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}
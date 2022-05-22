import React, { forwardRef, useEffect, useRef, useState } from 'react';

const Shortcut = forwardRef(({ visibility, data = [], lastKeyPressed }, ref) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (visibility) inputRef.current.focus();
  }, [visibility]);

  useEffect(() => {
    console.log(lastKeyPressed);
  }, [lastKeyPressed])

  const renderData = (item, index) => {
    return (<div
      key={index}
      className='react-shortcut-item'
      onClick={() => item.onClick(item.text)}
    >{item.text}</div>);
  }

  return (
    <div ref={ref} className='react-shortcut'>
      <input
        ref={inputRef}
        placeholder="Search for something"
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {query.length ? data.filter(d => d.text.toLowerCase().includes(query)).map(renderData) : data.filter(d => d.default).map(renderData)}
    </div>  
  )
})

export default Shortcut;
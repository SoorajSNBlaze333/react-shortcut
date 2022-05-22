import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Search from '../assets/search.svg';

const Shortcut = forwardRef(({ visibility, data = [], lastKeyPressed }, ref) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (visibility) inputRef.current.focus();
  }, [visibility]);

  useEffect(() => {
    // console.log(lastKeyPressed);
  }, [lastKeyPressed]);

  const renderData = (item, index) => {
    return (<div
      key={index}
      className='react-shortcut-item'
      onClick={() => item.onClick(item.text)}
    >{item.text}</div>);
  }

  const renderFilteredData = () => {
    const filteredData = data.filter(d => d.text.toLowerCase().includes(query));
    if (filteredData.length) return filteredData.map(renderData);
    return <div className='react-shortcut-items-none'>No results found for your search!</div>
  }

  return (
    <>
      <div ref={ref} className='react-shortcut-container'>
        <div className='react-shortcut-search-container'>
          <img src={Search} className='react-shortcut-search-icon' alt='magnifying'/>
          <input
            className='react-shortcut-search-input'
            ref={inputRef}
            placeholder="Search for something"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <div className='react-shortcut-items-container'>
          {query.length ? renderFilteredData() : <div className='react-shortcut-items-none'>Nothing searched</div>}
        </div>
      </div> 
      <div className='react-shortcut-filter'></div> 
    </>
  )
})

export default Shortcut;
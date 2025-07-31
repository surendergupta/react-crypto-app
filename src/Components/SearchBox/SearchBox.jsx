import React from 'react'

import './SearchBox.css'

const SearchBox = ({typedInput, setTypedInput}) => {
  return (
    <div className='searchBox'>
        <label htmlFor="search" className="visually-hidden">Search Cryptocurrency</label>
        <input 
          type="text" 
          id='search'
          className='searchInput'
          value={typedInput}
          onChange={(e) => setTypedInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.blur();
          }}
          placeholder='Search...' 
        />
    </div>
  )
}

export default SearchBox
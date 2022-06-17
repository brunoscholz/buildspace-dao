
const ContentHeader = ({title}) => {

  const switchMode = e => {
    document.documentElement.classList.toggle('light')
    e.target.classList.toggle('active')
  }

  return (
    <>
      <div className='app-content-header'>
        <h1 className='app-content-headerText'>{title}</h1>
        <button className='mode-switch' title='Switch Theme' onClick={switchMode}>
          <svg
            className='moon'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <defs></defs>
            <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'></path>
          </svg>
        </button>
        <button className='app-content-headerButton'>Propose</button>
      </div>
      <div className='app-content-actions'>
        <input className='search-bar' placeholder='Search...' type='text' />
        <div className='app-content-actions-wrapper'>
          <div className='filter-button-wrapper'>
            <button className='action-button filter jsFilter'>
              <span>Filter</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-filter'
              >
                <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
              </svg>
            </button>
            <div className='filter-menu'>
              {/* <label>Category</label>
              <select>
                <option>All Categories</option>
                <option>Furniture</option> <option>Decoration</option>
                <option>Kitchen</option>
                <option>Bathroom</option>
              </select>
              <label>Status</label>
              <select>
                <option>All Status</option>
                <option>Active</option>
                <option>Disabled</option>
              </select>
              <div className='filter-menu-buttons'>
                <button className='filter-button reset'>Reset</button>
                <button className='filter-button apply'>Apply</button>
              </div> */}
            </div>
          </div>
          <button className='action-button list active' title='List View'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-list'
            >
              <line x1='8' y1='6' x2='21' y2='6' />
              <line x1='8' y1='12' x2='21' y2='12' />
              <line x1='8' y1='18' x2='21' y2='18' />
              <line x1='3' y1='6' x2='3.01' y2='6' />
              <line x1='3' y1='12' x2='3.01' y2='12' />
              <line x1='3' y1='18' x2='3.01' y2='18' />
            </svg>
          </button>
          <button className='action-button grid' title='Grid View'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-grid'
            >
              <rect x='3' y='3' width='7' height='7' />
              <rect x='14' y='3' width='7' height='7' />
              <rect x='14' y='14' width='7' height='7' />
              <rect x='3' y='14' width='7' height='7' />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default ContentHeader
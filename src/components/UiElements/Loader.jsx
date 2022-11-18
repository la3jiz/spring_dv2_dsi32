import React from 'react'
import ReactDOM from 'react-dom'

import './Loader.css'
const Loader = () => {
    const content=(  
      <div className='loader_container'>
     
      <div class="ui active  dimmer">
        <div class="ui large text loader">Loading</div>
      </div>
      <p></p>
      <p></p>
      <p></p>
    
    </div>
    )
   return ReactDOM.createPortal(content, document.getElementById("loader"));
}

export default Loader
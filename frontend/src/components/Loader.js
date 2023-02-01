import React from 'react'
import { Spinner } from 'react-bootstrap'
function Loader() {
  return (
    <Spinner animation='border' role='status' style={{
        position:'fixed',
        left:'50%',
        top:'50%',
        height:'100px',
        width:'100px',
        margin:'auto',
        marginLeft:'-50px',
        display:'block'
    }}>
        <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
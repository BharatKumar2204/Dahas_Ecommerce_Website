import React from 'react'
import Alert from 'react-bootstrap/Alert'
function Message({varient,childeren}) {
  return (
    <Alert varient={varient}>
        {childeren}
    </Alert>
  )
}

export default Message
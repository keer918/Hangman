import React from 'react'

const Warning = ({showNotification}) => {
 
      return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <p>you have only one chance left</p>
    </div>
  )
}

export default Warning;

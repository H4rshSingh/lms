import React from 'react'
import AvailableBooks from './AvailableBooks'
import IssuedBooks from './IssuedBooks'

const Books = (props) => {
  return (
    <div>
      <AvailableBooks mode={props.mode} />
      <IssuedBooks mode={props.mode} />
    </div>
  )
}

export default Books

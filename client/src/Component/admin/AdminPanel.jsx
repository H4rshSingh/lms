import React from 'react'
import AvailableBooks from '../AvailableBooks'
import IssuedBooks from '../IssuedBooks'

const AdminPanel = (props) => {
  return (
    <div>
      <AvailableBooks mode={props.mode} />
      <IssuedBooks mode={props.mode} />
      hii
    </div>
  )
}

export default AdminPanel

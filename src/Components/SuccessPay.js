import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/SuccessPay.css'

function SuccessPay() {
  return (
    <div id='success'>
      Payment Done <br/>
      Go to <Link to='/MyBooking'>My Bookings</Link> Page to see Your Booked ticket's
    </div>
  )
}

export default SuccessPay
import React from 'react'
import TransactionSearchBar from '../../components/TransactionSearchBar'

function index() {
  return (
    <div>
      Transaction page
      <div className='flex justify-center '>
        <TransactionSearchBar></TransactionSearchBar>
      </div>
    </div>
  )
}

export default index
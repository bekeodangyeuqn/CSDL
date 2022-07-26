import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import TransactionSearchBar from "../../components/TransactionSearchBar";
import TransactionItem from "../../components/TransactionItem";
import { getAllTransactions } from '../../axios_api/transaction'
import { userContext } from '../../contexts/userProvider'

function Transaction() {
  const { user } = useContext(userContext)

  const [transactions, setTransaction] = useState([])
  const [trigger, setTrigger] = useState(false);

  const getTransactions = async () => {
    const result  = await getAllTransactions()

    if (user && (user.role === 'librarian' || user.role === 'admin')) {
      setTransaction(result.data)
    } else if (user && user.role === 'user') {
      const userTransactions = result.data.filter((trans) => trans.user.user_id === user.user_id)
      setTransaction(userTransactions)
      console.log(userTransactions)
    }
  }

  useEffect(() => {
    try {
      getTransactions()
    } catch (error) {
      console.log(error)
    }
  }, [trigger])

  if (user) {
    return (
      <div className="px-8">
        <div className="flex justify-between mb-2">
          <p className="text-xl font-extrabold">Transaction</p>
          <div className="flex justify-center ">
            <TransactionSearchBar></TransactionSearchBar>
          </div>
          {
            (user && (user.role === 'librarian' || user.role === 'admin')) ?
              <Link href='transaction/create'>
                <button className="px-2 py-1 rounded bg-sky-400 w-20">
                  Create
                </button>
              </Link>
              : <div></div>
          }
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border ">ID</th>
              <th className="border">User</th>
              <th className="border">Librarian</th>
              <th className="border">Trans date</th>
              <th className="border">Expired date</th>
              <th className="border">Status</th>
              <th className="border">Penalty</th>
              <th className="border">Penalty description</th>
              <th className="border"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <TransactionItem key={index} transaction={transaction} trigger={trigger} setTrigger={setTrigger}></TransactionItem>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  else return (
    <div className="container mx-auto text-center text-orange-500 font-extrabold">You don't have access to this page</div>
  )
}

export default Transaction;

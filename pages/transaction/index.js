import React, { useState, useEffect } from "react";
import Link from "next/link";

import TransactionSearchBar from "../../components/TransactionSearchBar";
import TransactionItem from "../../components/TransactionItem";
import { getAllTransactions } from '../../axios_api/transaction'


function Transaction() {
  const [transactions, setTransaction] = useState([])
  const [trigger, setTrigger] = useState(false);

  const getTransactions = async () => {
    const result = await getAllTransactions()
    setTransaction(result.data)
  }

  useEffect(() => {
    try {
      getTransactions()
    } catch (error) {
      console.log(error)
    }
  }, [trigger])

  return (
    <div className="px-8">
      <div className="flex justify-between mb-2">
        <p className="text-xl font-extrabold">Transaction</p>
        <div className="flex justify-center ">
        <TransactionSearchBar></TransactionSearchBar>
        </div>
        <Link href='transaction/create'>
          <button className="px-2 py-1 rounded bg-sky-400 w-20">
            Create
          </button>
        </Link>
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
            <th className="border"> </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} trigger={trigger} setTrigger={setTrigger}></TransactionItem>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;

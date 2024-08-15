import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// const customer = {
//   id: 1,
//   name: 'John Doe',
//   number: '123-456-7890',
//   details: 'Some more details about the customer',
//   transactions: [
//     { type: 'Saree', quantity: 10, rate: 5, total: 50, date: '2024-07-01' },
//     { type: 'Saree', quantity: 2, rate: 25, total: 50, date: '2024-07-10' },
//     // Add more transactions as needed
//   ],
// };

const CustomerDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [customer,setcustomer] = useState('');
  const [ transactions ,setTransactions] = useState([]);

  useEffect(()=>{
    const fetchdataByid = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/customers/getSingle/${id}`);
        setcustomer(res.data);
        setTransactions(res.data.items);
        console.log(transactions);
        console.log(`customer : ${customer}`);
      } catch (error) {
        console.log('not fetched correctly');
      }
    }
    fetchdataByid();
  },[])

  // Calculate the total of all totals
  const totalSum = transactions?.reduce((sum, transaction) => sum + transaction.total, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Detail</h2>
      <p><strong>ID:</strong> {customer._id}</p>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Number:</strong> {customer.number}</p>
      <p><strong>Details:</strong> {customer.details}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Transactions</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Rate</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">PaidAmount</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 ? (
              transactions?.map((transaction, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{transaction?.type}</td>
                  <td className="border px-4 py-2">{transaction?.quantity}</td>
                  <td className="border px-4 py-2">{transaction?.rate}</td>
                  <td className="border px-4 py-2">{transaction?.total}</td>
                  <td className="border px-4 py-2">{transaction?.paidAmount}</td>
                  <td className="border px-4 py-2">{transaction?.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {transactions?.length > 0 && (
          <div className="mt-4 text-right">
            <p className="font-semibold">Total of Totals: <span className="font-bold">{totalSum}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;

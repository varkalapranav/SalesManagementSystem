import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleAddCustomer =async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/customers/addCustomer',{
        name,
        number
      }).then(()=>{console.log('posted successfully')})
    } catch (error) {
      console.error(`${error}`);
    }
    // Add customer logic here
    console.log("Customer added front:", { name, number });
    // Reset form
    setName('');
    setNumber('');
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleAddCustomer} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState({ name: '', number: '' });

  useEffect(() => {
    // Fetch customer details by ID
    // For example purposes, using static data
    const fetchedCustomer = async ()=>{
      try {
        const res = await axios.get(`http://localhost:3000/api/customers/getSingle/${id}`);
        setCustomer(res.data);
        console.log(`customer : ${customer}`);
      } catch (error) {
        console.log('not fetched correctly');
      }
    }
    fetchedCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the updated customer details
    try {
      await axios.post(`http://localhost:3000/api/customers/editCustomer`,{
        id:id,
        changeName:customer.name,
        changeNumber:customer.number
      });
    } catch (error) {
      
    }
    // Redirect to the customer list after submission
    navigate('/customers');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
            Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={customer.number}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;

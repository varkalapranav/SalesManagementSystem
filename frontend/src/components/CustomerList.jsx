import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';

// const customers = [
//   { id: 1, name: 'John Doe', number: '123-456-7890' },
//   { id: 2, name: 'Jane Smith', number: '987-654-3210' },
//   // Add more customers as needed
// ];

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [customers,setCustomers]=useState([]);
  const [rendereditems,setRenderedItems] = useState(null);
  const [balance,setBalance] = useState(null);

  useEffect(()=>{
    fetchdata();
  },[])

  const fetchdata = async ()=>{
    try {
     const res= await axios.get('http://localhost:4000/api/customers/getcust')
      
        setCustomers(res.data);
        console.log(customers);
      
    } catch (error) {
      console.error(error);
    }
  }


  const fetchreqdata = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/customers/getSingle/${selectedCustomerId}`);
      console.log(res.data.items);
      setRenderedItems(res.data.items);
      const totalBalance = res.data.items.reduce((sum, item) => sum + item.balanceAmount, 0);
      setBalance(totalBalance);
      console.log(balance);
    } catch (error) {
      console.error(`${error}`);
    }
  }

 
  useEffect(() => {
    if (isModalOpen && selectedCustomerId) {
      fetchreqdata();
    }
  }, [isModalOpen, selectedCustomerId]);

  const handleDelete = async (id) => {
    // Add logic to delete the customer
    try{
      await axios.delete(`http://localhost:4000/api/customers/delete/${id}`);

      // setCustomers(customers.filter((customer) => customer.id !== id));
      fetchdata();
    }catch(error){
      console.log('not deleted error');
    }
    console.log(`Customer with ID : ${id} deleted`);
  };

  const handlePaymentSubmit = async () => {

    setIsModalOpen(false);
    await fetchdata();
  };

  // const handleOpenModal = (customer) => {
  //   setIsModalOpen(true);
  // };

  customers=customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">Customer List</h2>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Number</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="border px-4 py-2 text-center">{customer._id}</td>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer?.number}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <Link
                        className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded"
                        to={`/customers/${customer._id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="text-white bg-green-500 hover:bg-green-700 py-1 px-3 rounded"
                        to={`/customers/edit/${customer._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="text-white bg-yellow-500 hover:bg-yellow-700 py-1 px-3 rounded"
                        onClick={() => {
                          setSelectedCustomerId(customer._id);
                          setIsModalOpen(true);
                        }}
                      >
                        Add Payment
                      </button>
                      <Link
                        className="text-white bg-purple-500 hover:bg-purple-700 py-1 px-3 rounded"
                        to={`/customers/add-items/${customer._id}`}
                      >
                        Add Items
                      </Link>
                      <button
                        className="text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
                        onClick={() => handleDelete(customer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        items={rendereditems}
        balance={balance}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPayment}
      /> */}

      <Modal
          isOpen={isModalOpen}
          items={rendereditems}
          onClose={() => setIsModalOpen(false)}
          onPaymentSubmit={handlePaymentSubmit}
          customerId={selectedCustomerId}
        />
    </div>
  );
};

export default CustomerList;

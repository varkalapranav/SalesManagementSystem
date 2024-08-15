import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddItems = () => {
  const {id}=useParams();
  const [items, setItems] = useState([
    { type: '', quantity: '', rate: '', total: '', date: '' },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddRow = () => {
    setItems([...items, { type: '', quantity: '', rate: '', total: '', date: '' }]);
  };

  const handleRemoveRow = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/customers/updateCustomer/${id}`,{
        items:items
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log(`error update : ${error}`);
    }
    console.log('Submitted items:', items);
    // Add your form submission logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Items</h2>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Rate</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">PaidAmount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="type"
                      value={item.type}
                      onChange={(e) => handleInputChange(index, e)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(index, e)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="rate"
                      value={item.rate}
                      onChange={(e) => handleInputChange(index, e)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="total"
                      value={item.total}
                      onChange={(e) => handleInputChange(index, e)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="paidAmount"
                      value={item.paidAmount}
                      onChange={(e) => handleInputChange(index, e)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      name="date"
                      value={item.date}
                      onChange={(e) => handleInputChange(index, e)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddRow}
            className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mb-4"
          >
            Add Row
          </button>
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;

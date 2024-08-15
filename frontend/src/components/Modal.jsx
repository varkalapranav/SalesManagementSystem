// Modal.js
// Modal.js
import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ items, isOpen, onClose, onPaymentSubmit ,customerId}) => {
  const [paymentAmounts, setPaymentAmounts] = useState({});

  const handlePaymentChange = (index, amount) => {
    setPaymentAmounts(prev => ({
      ...prev,
      [index]: amount,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const [index, amount] of Object.entries(paymentAmounts)) {
      if (amount && items[index]) {
        try {
          // Send the payment update request to the backend
          await axios.post(`http://localhost:4000/api/customers/addBalance`, {
            customerId: customerId,
            itemId: items[index]._id,
            paymentAmount: amount,
          });
        } catch (error) {
          console.error('Error updating payment:', error);
        }
      }
    }
    onPaymentSubmit();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-[500px]">
        <h3 className="text-lg font-bold mb-2">Add Payment</h3>
        <form onSubmit={handleSubmit}>
          {items?.map((item, index) => (
            <div key={item._id} className="mb-4">
              <h4 className="font-semibold">{item.type}</h4>
              <div className="flex justify-around items-center mb-2">
                <label className="block text-sm font-medium">
                  Balance Amount: {item.balanceAmount}
                </label>
                <input
                  type="number"
                  className="p-2 border rounded w-[150px]"
                  placeholder="Payment Amount"
                  value={paymentAmounts[index] || ''}
                  onChange={(e) => handlePaymentChange(index, parseFloat(e.target.value))}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-700 py-1 px-3 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Modal;











// import axios from 'axios';
// import React from 'react';
// import { useState,useEffect } from 'react';


// const Modal = ({ items,balance ,isOpen, onClose, onSubmit }) => {
//   console.log(items);
//   const [amount,setAmount]=useState(null);

//   const handlechange=(e)=>{
//     setAmount(()=>{
//       [e.target.name] ? e.target.value : console.log('not')
//     });
//     console.log(amount);
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const amount = event.target.elements.amount.value;
//     onSubmit(amount);
//     onClose();
//   };

//   if (!isOpen) return null;


//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-4 rounded shadow-lg w-[500px]">
//         <h3 className="text-lg font-bold mb-2">Add Payment</h3>
//         <form onSubmit={handleSubmit}>
//           <div className=''>
//           {
//             items?.map((item,index)=>{
//               return<>
              
//                 <h1>{item.type}</h1>
//                 <div className='flex'>
//                    <div className="mb-4 flex justify-around">
//                   <label className="block text-sm font-medium mb-1" htmlFor="amount">
//                   Balance Amount
//               </label>
//               <input
//                 type="number"
//                 id={`balance${index}`}
//                 name={`balance${index}`}
//                 className="p-2 border rounded w-[90px]"
//                 value={item.balanceAmount || 0}
//                 required
//               />
//             {/* </div> */}
//             {/* <div className="mb-4"> */}
//               {/* <label className="block text-sm font-medium mb-1" htmlFor="amount">
//                 Amount
//               </label> */}
//               <input
//                 type="number"
//                 id="amount"
//                 name={`amount${index}`}
//                 className="p-2 border rounded w-[150px]"
//                 placeholder='paidAmount'
//                 value={amount}
//                 onChange={handlechange}
//                 required
//               />
//             </div>
//               </div>
//               </>
//             })
//           }
          
//           </div>
        
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               className="text-white bg-gray-500 hover:bg-gray-700 py-1 px-3 rounded"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;

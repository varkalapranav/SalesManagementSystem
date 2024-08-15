import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Revenue = () => {
  // Revenue logic here
  const [customers,setCustomers]=useState([]);
  const [balance,setBalance]=useState(0);
  const [total,setTotal]=useState(0);
  const [paid,setPaid]=useState(0);

  useEffect(()=>{
    fetchdata();
    
  },[])

  const fetchdata = async ()=>{
    try {
     const res= await axios.get('http://localhost:3000/api/customers/getcust')
      
        setCustomers(res.data);
        console.log(customers);
        let totalAmount=0;
        let totalbalance=0;
        let totalPaid=0;
        res.data.map( (item,index)=>{
          console.log(item.items);
          totalAmount += item.items.reduce((sum, itemx) => sum + itemx.total, totalAmount);
          totalbalance +=  item.items.reduce((sum, itemx) => sum + itemx.balanceAmount, totalbalance);
          totalPaid +=  item.items.reduce((sum, itemx) => sum + itemx.paidAmount, totalPaid);
          console.log("in",totalbalance,totalAmount,totalPaid);
         
        })

        setBalance(totalbalance);
        setTotal(totalAmount);
        setPaid(totalPaid);

        console.log(totalbalance,totalAmount,totalPaid);
        // const totalAmount = await res.data.items.reduce((sum, item) => sum + item.total, 0);
        // const totalbalance = await res.data.items.reduce((sum, item) => sum + item.balanceAmount, 0);
        // const totalPaid = await res.data.items.reduce((sum, item) => sum + item.paidAmount, 0);
        // setBalance(totalbalance);
        // setTotal(totalAmount);
        // setPaid(totalPaid);
    } catch (error) {
      console.error(error);
    }
  }
  
  // useEffect(()=>{
  //   const fetchdata = async ()=>{
  //     try {
  //      const res= await axios.get('http://localhost:3000/api/customers/getcust')
        
  //         setCustomers(res.data);
  //         console.log(customers);
          
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchdata();
  // },[])


  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Revenue</h2>
      <p>Display revenue information here.</p>
      <p>Expenditure : {total}</p>
      <p>Amount to be paid : {paid}</p>
      <p>Amount to be paid by all customers : {balance}</p>
    </div>
  );
};

export default Revenue;

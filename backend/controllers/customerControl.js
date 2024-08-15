import mongoose from "mongoose";
import {Customer} from "../models/Customers.js";

const cust = async (req, res) => {
    const { name, number } = req.body;
    console.log(name , number);
    if (!name || !number) {
        return res.status(400).send("Fill all the fields.");
    }

    // for (const item of items) {
    //     const { type, quantity, rate, paidAmount } = item;
    //     if (!type || !quantity || !rate || !paidAmount) {
    //         return res.status(400).send("Each item must include type, quantity, and rate.");
    //     }
    // }

    try {
        await Customer.create({ name, number});
        res.status(201).send("Customer created successfully.");
    } catch (error) {
        res.status(500).send("Server error.");
    }
}


const edit = async (req, res) => {
    console.log(req.body);
    const { id, changeName, changeNumber } = req.body;
    try {
        const exist = await Customer.findById( id );
        console.log(exist);
        if (!exist) {
            return res.status(404).send("Customer not found.");
        }
        
        // Update the fields if they are provided
        if (changeName) {
            exist.name = changeName;
        }
        if (changeNumber) {
            exist.number = changeNumber;
        }
        await exist.save();
        console.log(exist);

        
        res.status(200).json({
            name: exist.name,
            number: exist.number,
        });
    } catch (error) {
        res.status(500).send("Server error.");
    }
}

const add = async (req, res) => {
    console.log(req.body);
    const { items } = req.body;

    console.log(req.params.id);
    const custid = req.params.id;
    // Check if customer exists
    const customer = await Customer.findById(custid);
    if (!customer) {
        return res.status(404).send("Customer not found.");
    }

    // Validate request body
    // if (!Array.isArray(items) || items.length === 0) {
    //     return res.status(400).send("Name and items must be provided.");
    // }

    for (const item of items) {
        console.log(item);
        const { type, quantity, rate, total ,paidAmount} = item;
        if (!type || !quantity || !rate || !total || !paidAmount) {
            return res.status(400).send("Each item must include type, quantity, and rate.");
        }

        // Calculate total for each item
        item.total = item.quantity * item.rate;
        item.paidAmount = paidAmount;
        item.balanceAmount=item.total-item.paidAmount;
        item.date = new Date();
    }

    try {
        // Add items to the customer's items array
        customer.items = [...customer.items, ...items];
        console.log(customer);
        await customer.save();
        res.status(201).send("Items added successfully.");
    } catch (error) {
        console.error(`back ${error}`);
        res.status(500).send("Server error.");
    }
};

const deleteCustomer = async (req,res) => {
    // const { name } = req.body;
    // console.log(req.body.id);
    const custid=req.params.id;
    try {
        // Find the customer by name and delete
        const customer = await Customer.findByIdAndDelete(custid);
        if (!customer) {
            return res.status(404).send("Customer not found.");
        }

        res.status(200).send("Customer deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
};

const updateBalance = async (req, res) => {
    const { itemId, paymentAmount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).send("Invalid item ID.");
    }

    try {
        // Find the customer who has the item
        const customer = await Customer.findOne({ "items._id": itemId });
        if (!customer) {
            return res.status(404).send("Customer not found1.");
        }

        // Find the item by itemId
        const itemIndex = customer.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).send("Item not found.");
        }

        // Update the balance amount
        const item = customer.items[itemIndex];
        item.balanceAmount -= paymentAmount;

        // If balance amount is zero or less, remove the item
        if (item.balanceAmount <= 0) {
            customer.items.splice(itemIndex, 1);
        }

        // Save the updated customer document
        await customer.save();

        res.status(200).send("Payment updated successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
};



const updateAmount = async (req, res) => {
    console.log("updatebalance",req.body);
  const { customerId, itemId, paymentAmount } = req.body;

  try {
    const customer = await Customer.findOne({ _id: customerId, 'items._id': itemId });
    console.log(customer);
    if (!customer) {
      return res.status(404).send('Customer or item not found');
    }

    const item = customer.items.id(itemId);
    if (item.balanceAmount<=paymentAmount) {
        console.log("item",item);
      item.paidAmount += paymentAmount;
      item.balanceAmount = item.total - item.paidAmount;
      await customer.save();
      res.send('Payment updated successfully');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).send('Server error');
  }
};



const getcust = async (req,res)=>{
    try{
        const customers = await Customer.find({});
        // console.log(customers);
        res.status(200).json(customers);
    }catch(error){
        console.error(error);
    }
    
}

const getSingleCust = async (req,res) =>{
    const custid=req.params.id;
    try {
       const cust = await Customer.findById(custid);
    //    console.log(`single : ${cust}`);
       res.status(201).json(cust);
    } catch (error) {
        console.error(`error while fetching : ${error}`);
    }
}


export { cust, edit,add, deleteCustomer, updateAmount ,getcust,getSingleCust};

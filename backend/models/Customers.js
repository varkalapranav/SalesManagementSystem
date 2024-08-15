import mongoose from "mongoose";

// Define the item schema
const itemSchema = new mongoose.Schema({
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    total: { type: Number },
    date: { type: Date, default: Date.now },
    paidAmount:{type:Number, required:true},
    balanceAmount:{type:Number}
});

// Pre-validate hook to calculate the total for each item
itemSchema.pre('validate', function(next) {
    if (this.rate && this.quantity) {
        this.total = this.rate * this.quantity;
        
    }
    if (this.total && this.paidAmount !== undefined) {
        this.balanceAmount = this.total - this.paidAmount;
    }
    next();
});

// Define the customer schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    number: { type: Number, required: true },
    items: [itemSchema]
});

const Customer = mongoose.model('Customer', customerSchema);

export  {Customer };

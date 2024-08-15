import express from "express";

import { cust,edit,add, deleteCustomer,updateAmount,getcust, getSingleCust} from "../controllers/customerControl.js";



const Routes = express.Router();

Routes.route("/addCustomer").post(cust);
Routes.route("/editCustomer").post(edit);
// Routes.route("/addCustomer").post(add);
Routes.post('/updateCustomer/:id', add);
Routes.delete('/delete/:id',deleteCustomer);
Routes.post('/addBalance',updateAmount);
Routes.get('/getcust',getcust);
Routes.get('/getSingle/:id',getSingleCust)
export default Routes;
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Components/Login';

import Navbar from './Components/Navbar/Navbar';

import Register from './Components/Register';
import Mainhome from './Components/Maincontaint/Home/Home';
import About from './Components/Maincontaint/About/About';
import Student from './Components/Maincontaint/Student/Student';
import Dashboard from './Components/Dashboard';


import Home from './Components/Home';
import Employee from './Components/Employee';

import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';

//mt trial
import AddProduct from './screens/AddProduct';
import ShowProducts from './screens/ShowProducts';
import EditProduct from './screens/EditProduct';
import ProductDetail from './screens/ProductDetail';


import Rating from './productcomponents/Rating';
import AddUser from './screens/AddUser';
import Mylogin from './screens/Mylogin';



function App() {
  return (
    <Router>

      <div className='n-stick'><Navbar /></div>
      <div className='body-s'>

        <Routes>
          <Route path='/' element={<Mainhome />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/student" element={<Student />} />
          <Route path='/addUser' element={<AddUser />}></Route>
         
          <Route path='/mylogin' element={<Mylogin />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/employee_login' element={<EmployeeLogin />}></Route>
          <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
          <Route path='/start' element={<Start />}></Route>

          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/products' element={<ShowProducts />} />


          <Route path='/product/edit/:id' element={<EditProduct />} />
          <Route path='/product/:id' element={<ProductDetail />} />



          <Route path='/dashboard' element={
            <PrivateRoute >
              <Dashboard />
            </PrivateRoute>
          }>

            <Route path='' element={<Home />}></Route>
            <Route path='/dashboard/employee' element={<Employee />}></Route>
            <Route path='/dashboard/products' element={<ShowProducts />}></Route>
            <Route path='/dashboard/product/edit/:id' element={<EditProduct  />}></Route>
         
           
            <Route path='/dashboard/addProduct' element={<AddProduct />}></Route>
            <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>

          </Route>
        </Routes>

      </div>



    </Router>


  )
}

export default App

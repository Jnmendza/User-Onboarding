import React from 'react';
import Form from './components/Form';
import './App.css';

//Dependencies
import { withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;

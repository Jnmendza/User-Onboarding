import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnBoardForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className="on-board-form">
            <Form>
                <Field type='text' name='name' placeholder='Full Name' />
                {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}

                <Field type='email' name='email' placeholder='Email' />
                {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}

                <Field type='password' name='password' placeholder='Password' />
                {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}

                <label>
                    Terms of Service
                    <Field type='checkbox' name='checkbox' checked={values.checkbox} />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name:{user.name}</li>
                    <li>E-mail:{user.email}</li>
                    <li>Password:{user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikOnBoardForm = withFormik({
    mapPropsToStatus({name, email, password, checkbox}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            checkbox: checkbox || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must add your name'),
        email: Yup.string().email().required('You must add your email'),
        password: Yup.string().min(9).required('Please add the password'),
    }),
    handleSubmit(values, { setStatus }) {
        // console.log(values)
        axios
            .post('https://reqres.in/api/users_', values)
            .then(response => {setStatus(response.data); })
            .catch(error => console.log(error.response));
    }


})(OnBoardForm);

console.log('THIS IS THE HOC', FormikOnBoardForm)
export default FormikOnBoardForm;
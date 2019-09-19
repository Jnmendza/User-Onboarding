import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const onBoardForm = ({ values, errors, touched, status }) => {
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
                <Field type='text' name='email' placeholder='Email' />
                {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
                <Field type='text' name='password' placeholder='Password' />
                {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}

                <label>
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms} />
                </label>
                <button type="submit">Submit!</button>
            </Form>
        </div>
    );
};

const FormikOnBoardForm = withFormik({
    mapPropsToStatus({name, email, password, terms}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must add your name'),
        email: Yup.string().required('You must add your email'),
        password: Yup.string().required('Please add the password you cant remember'),
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users_', values)
            .then(response => {setStatus(response.data); })
            .catch(error => console.log(error.response));
    }
})(onBoardForm);

console.log('THIS IS THE HOC', FormikOnBoardForm)
export default FormikOnBoardForm;
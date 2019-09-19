import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const onBoardForm = ({ values }) => {
    return (
        <div className="on-board-form">
            <Form>
                <Field type='text' name='name' placeholder='Full Name' />
                <Field type='text' name='email' placeholder='Email' />
                <Field type='text' name='password' placeholder='Password' />
                <label>
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms} />
                </label>
                <button>Submit!</button>
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
    }
})(onBoardForm);

export default FormikOnBoardForm;
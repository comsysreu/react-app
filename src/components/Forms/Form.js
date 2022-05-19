import React from 'react';
import {
    Form as RBForm,
} from 'react-bootstrap';
import {
    useFormikContext
} from 'formik';

// Component intended to be used as direct child of <Formik />
const Form = (props) => {
    const { handleReset, handleSubmit } = useFormikContext();
    return (
        <RBForm onReset={handleReset} onSubmit={handleSubmit} {...props} />
    );
};

export default Form;

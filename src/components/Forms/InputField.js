import React from 'react';
import {
    Form,
} from 'react-bootstrap';
import {
    useField,
} from 'formik';

// This component is for use inside a Formik form
const InputField = (props) => {
    const {
        label,
        labelProps,   // these are passed to the <label />
        placeholder = label,
        onChange,
        ...otherProps // these are passed to the <input />
    } = props;

    const [field, meta] = useField(props);
    const handleChangeCustom = (...args) => {
        if (onChange)
            onChange(...args);

        return field.onChange(...args);
    };
    return (
        <Form.Group controlId={field.name} style={{ width: '100%' }}>
            {label &&
                <Form.Label {...labelProps}>{label}</Form.Label>
            }
            <Form.Control
                {...field}
                onChange={handleChangeCustom}
                placeholder={placeholder}
                isValid={meta.touched && !meta.error}
                isInvalid={meta.touched && meta.error}
                {...otherProps}
            />
            <Form.Control.Feedback type={meta.touched && meta.error ? 'invalid' : 'valid'} className="custom-class">
                {meta.error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default InputField;

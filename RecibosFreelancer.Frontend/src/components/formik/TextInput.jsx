import { Form } from "react-bootstrap";

function TextInput({ name, label, placeholder, values, touched, errors, handleChange }) {
    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                value={values[name]}
                onChange={handleChange}
                type="text"
                placeholder={placeholder}
                isInvalid={touched[name] && !!errors[name]} // If exist error on "name"
            />
            <Form.Control.Feedback type="invalid">
                {errors[name]}
            </Form.Control.Feedback>
        </>
    );
}

export default TextInput;
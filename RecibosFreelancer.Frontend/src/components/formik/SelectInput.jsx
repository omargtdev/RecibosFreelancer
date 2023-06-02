import { Form } from "react-bootstrap";

function SelectInput({ name, label, options, setFieldValue }) {
    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                name={name}
                onChange={e => setFieldValue(name, e.currentTarget.selectedOptions[0].value)}
            >
                {options.map(({ key, description }) => 
                    <option key={key} value={key}>{description}</option>
                )}
            </Form.Select>
        </>
    );
}

export default SelectInput;
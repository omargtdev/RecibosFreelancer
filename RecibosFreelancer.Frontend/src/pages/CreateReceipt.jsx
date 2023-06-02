import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";

import Receipt from "../entities/Receipt";
import ReceiptService from "../services/ReceiptService";
import SelectInput from "../components/formik/SelectInput";
import TextInput from "../components/formik/TextInput";

const receiptService = new ReceiptService();

function CreateReceipt() {

    const handleSubmit = receipt => {
        receiptService.generateReceipt(receipt)
            .then(blobPdf => {
                // Download the PDF
                const url = URL.createObjectURL(blobPdf);
                const link = document.createElement("a");
                link.href = url;
                link.download = "receipt.pdf";
                link.click();
            
                URL.revokeObjectURL(url);
            })
            .catch(errors => console.log(errors));
    }


    return (
        <Container className="my-3">
            <h1>Crear recibo</h1>
            <Formik
                onSubmit={handleSubmit}
                initialValues={new Receipt()}
                validationSchema={Receipt.getValidationSchema()}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <fieldset className="mb-3">
                        <legend>Datos del recibo</legend>
                        <Form.Group className="mb-3">
                            <TextInput
                                name="title"
                                label="Título"
                                placeholder="Coloque el titulo del recibo"
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <TextInput
                                name="description"
                                label="Descripción"
                                placeholder="Coloque la descripción del recibo"
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" className="mb-3">
                                <SelectInput
                                    name="currencyType"
                                    label="Tipo de Moneda"
                                    setFieldValue={setFieldValue}
                                    options={Object.values(Receipt.CurrencyTypes)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <TextInput
                                    name="amount"
                                    label="Monto"
                                    placeholder="Coloque el monto a cobrar"
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control
                                name="logo"
                                type="file"
                                onChange={e => setFieldValue("logo", e.currentTarget.files[0])}
                                isInvalid={touched.logo && !!errors.logo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.logo}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </fieldset>
                    <fieldset>
                        <legend>Datos de la persona</legend>
                        <Form.Group className="mb-3">
                            <TextInput
                                name="fullname"
                                label="Nombres Completos"
                                placeholder="Coloque sus nombres completos"
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <TextInput
                                name="address"
                                label="Dirección"
                                placeholder="Coloque su dirección de domicilio"
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" className="mb-3">
                                <SelectInput
                                    name="documentType"
                                    label="Tipo de Documento"
                                    setFieldValue={setFieldValue}
                                    options={Object.values(Receipt.DocumentTypes)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <TextInput
                                    name="documentNumber"
                                    label="Numero de DOcumento"
                                    placeholder="Coloque su número de documento"
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                    </fieldset>
                    <Button type="submit">Generar</Button>
                </Form>
                )}
            </Formik>
        </Container>
    )
}

export default CreateReceipt;
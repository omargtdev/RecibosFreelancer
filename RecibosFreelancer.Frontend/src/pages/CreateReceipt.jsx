import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";

import Receipt from "../entities/Receipt";
import ReceiptService from "../services/ReceiptService";

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
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                type="text"
                                placeholder="Coloque el titulo del recibo"
                                isInvalid={touched.title && !!errors.title} // If exist error on city
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                style={{ resize: "none" }}
                                name="description"
                                as="textarea"
                                placeholder="Coloque la descripción del recibo"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={touched.description && !!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>Tipo moneda</Form.Label>
                                <Form.Select
                                    onChange={e => setFieldValue("currencyType", e.currentTarget.selectedOptions[0].value)}
                                    name="currencyType"
                                >
                                    {Object.values(Receipt.CurrencyTypes).map(({ key, description }) => 
                                        <option key={key} value={key}>{description}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Monto</Form.Label>
                                <Form.Control
                                    name="amount"
                                    value={values.amount}
                                    onChange={handleChange}
                                    isInvalid={touched.amount && !!errors.amount}
                                    type="text"
                                    placeholder="Coloque el monto a cobrar"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                {errors.amount}
                            </Form.Control.Feedback>
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
                            <Form.Label>Nombres Completos</Form.Label>
                            <Form.Control
                                name="fullname"
                                type="text"
                                placeholder="Coloque sus nombres completos"
                                onChange={handleChange}
                                value={values.fullname}
                                isInvalid={touched.fullname && !!errors.fullname}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fullname}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                name="address"
                                type="text"
                                placeholder="Coloque sus dirección de domicilio"
                                onChange={handleChange}
                                value={values.address}
                                isInvalid={touched.fullname && !!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Select
                                    name="documentType"
                                    onChange={e => setFieldValue("documentType", e.currentTarget.selectedOptions[0].value)}
                                >
                                    {Object.values(Receipt.DocumentTypes).map(({ key, description }) => 
                                        <option key={key} value={key}>{description}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Numero de Documento</Form.Label>
                                <Form.Control
                                    name="documentNumber"
                                    type="text"
                                    placeholder="Coloque su número de documento"
                                    onChange={handleChange}
                                    value={values.documentNumber}
                                    isInvalid={touched.documentNumber && !!errors.documentNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.documentNumber}
                                </Form.Control.Feedback>
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
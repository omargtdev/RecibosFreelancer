import { createElement, useState } from "react";
import Receipt from "../types/Receipt";
import ReceiptService from "../services/ReceiptService";
import { Button, Col, Container, Form, FormSelect, Row } from "react-bootstrap";

const receiptService = new ReceiptService();

function CreateReceipt() {

    const [formValidated, setFormValidated] = useState(false);
    const [receipt, setReceipt] = useState(new Receipt());
    
    const handleSubmit = (e) => {
        receiptService.generateReceipt(receipt)
            .then(blobPdf => {
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
            <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
                <fieldset className="mb-3">
                    <legend>Datos del recibo</legend>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Coloque el titulo del recibo"
                        />
                        <Form.Control.Feedback type="invalid">Se requiere de un titulo</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            style={{ resize: "none" }}
                            as="textarea"
                            required
                            placeholder="Coloque la descripción del recibo"
                        />
                        <Form.Control.Feedback type="invalid">Se requiere de una descripción</Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Tipo moneda</Form.Label>
                            <Form.Select>
                                <option value={0}>Soles (S/.)</option>
                                <option value={1}>Dolares ($)</option>
                                <option value={2}>Euros (E)</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Coloque el monto a cobrar"
                            />
                            <Form.Control.Feedback type="invalid">Se requiere un monto</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </fieldset>
                <Button type="submit">Generar</Button>
            </Form>
            <form
                className="mt-4 needs-validation"
                onSubmit={e => handleSubmit(e)}>
                <fieldset className="mb-3">
                    <legend>Datos del recibo</legend>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Título</label>
                        <input
                            type="text"
                            id="title"
                            onChange={e => setReceipt({ ...receipt, title: e.target.value.trim() })}
                            className="form-control"
                            placeholder="Coloque el titulo del recibo" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripcion</label>
                        <textarea
                            maxLength={200}
                            id="description"
                            style={{ resize: "none" }}
                            className="form-control"
                            onChange={e => setReceipt({ ...receipt, description: e.target.value.trim() })}
                            placeholder="Coloque la descripción del recibo">
                        </textarea>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="currencyType" className="form-label">Tipo de moneda</label>
                            <select
                                id="currencyType"
                                className="form-select"
                                onChange={e => setReceipt({ ...receipt, typeCurrency: e.target.value })}
                            >
                                <option value="1">Soles (S/.)</option>
                                <option value="2">Dolares ($)</option>
                                <option value="3">Euros (E)</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="amount" className="form-label">Cantidad</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Coloque el monto"
                                onChange={e => setReceipt({ ...receipt, amount: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="logo" className="form-label">Logo</label>
                        <input
                            type="file"
                            id="logo"
                            className="form-control"
                            placeholder="Coloque el monto"
                            onChange={e => setReceipt({ ...receipt, logo: e.target.files[0] })}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Datos de la persona</legend>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Nombres Completos</label>
                        <input
                            type="text"
                            id="fullName"
                            className="form-control"
                            placeholder="Coloque sus nombres completos de la persona."
                            onChange={e => setReceipt({ ...receipt, fullname: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Direccion</label>
                        <input
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Coloque su direccion del recibo"
                            onChange={e => setReceipt({ ...receipt, address: e.target.value })}
                        />
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="documentType" className="form-label">Tipo de documento</label>
                            <select
                                id="documentType"
                                className="form-select"
                                onChange={e => setReceipt({ ...receipt, typeDocument: e.target.value })}
                            >
                                <option value="1">DNI</option>
                                <option value="2">RUC</option>
                                <option value="3">Carnet de extranjeria</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="amount" className="form-label">Numero de documento</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Coloque su numero de documento"
                                onChange={e => setReceipt({ ...receipt, documentNumber: e.target.value })}
                            />
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="btn btn-primary">Generar</button>
            </form>
        </Container>
    )
}

export default CreateReceipt;

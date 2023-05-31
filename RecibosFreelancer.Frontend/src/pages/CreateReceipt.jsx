import { useState } from "react";
import Receipt from "../types/Receipt";
import ReceiptService from "../services/ReceiptService";

const receiptService = new ReceiptService();

function CreateReceipt() {

    const [receipt, setReceipt] = useState(new Receipt());
    
    const generateReceipt = (e) => {
        e.preventDefault();

        receiptService.generateReceipt(receipt)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className="container my-3">
            <h1>Crear recibo</h1>
            <form 
                className="mt-4 needs-validation"
                onSubmit={e => generateReceipt(e)}>
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
                                <option value={"null"}>-- Seleccione un tipo --</option>
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
                                <option value={"null"}>-- Seleccione un tipo --</option>
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
        </div>
    )
}

export default CreateReceipt;

import * as yup from "yup";

class Receipt{

    static #logoSize = 160 * 1024;
    static #logoSupportedFormats = [
        "image/png",
        "image/jpg",
        "image/jpeg",
    ]

    title = "";
    description = "";
    currencyType = Receipt.CurrencyTypes.PEN;
    amount = "";
    logo = "";
    
    fullname = "";
    address = "";
    documentType = Receipt.DocumentTypes.DNI;
    documentNumber = "";

    static CurrencyTypes = {
        PEN: { key: 0, description: "Soles (S/.)" },
        USD: { key: 1, description: "Dolares" },
        EUR: { key: 2, description: "Euros" }
    }

    static DocumentTypes = {
        DNI: { key: 0, description: "DNI" },
        RUC: { key: 1, description: "RUC" },
        ForeignCard: { key: 2, description: "Carnet de extranjeria" }
    }

    static getValidationSchema(){
        return yup.object().shape({
            title: yup.string()
                .trim()
                .required("El titulo es requerido")
                .max(20, "El maximo número de caracteres es 20"),
            description: yup.string()
                .trim()
                .required("La descripcion es requerida")
                .max(150, "El maximo número de caracteres es 150"),
            currencyType: yup.number()
                .oneOf(
                    Object.values(Receipt.CurrencyTypes).map(({ key }) => key), // Getting the keys [0, 1, 2]
                    "Debe escoger un tipo de moneda valido"),
            amount: yup.number()
                .required("El monto es requerido")
                .typeError("El monto debe ser un número decimal")
                .min(1, "El monto no debe ser menor a 0")
                .max(10000, "El monto no puede ser mayor a 10000"),
            logo: yup.mixed()
                .required("Una imagen es requerida")
                .test(
                    "fileFormat",
                    "El formato del archivo no es el correcto",
                    value => value && this.#logoSupportedFormats.includes(value.type)
                )
                .test(
                    "fileSize",
                    "El archivo es muy grande (160 MB maximos)",
                    value => value && value.size <= this.#logoSize
                ),
            fullname: yup.string().trim().required("El nombre es requerido"),
            address: yup.string().trim().required("La direcciónn es requerida"),
            documentType: yup.number()
                .oneOf(
                    Object.values(Receipt.DocumentTypes).map(({ key }) => key), // Getting the keys [0, 1, 2]
                    "Debe escoger un tipo de documento alido"),
            documentNumber: yup.string()
                .required("El numero de documento es requerido")
                .matches(/^[0-9]*$/, "El numero de documento solo debe tener números")
        })
    }
}

export default Receipt;
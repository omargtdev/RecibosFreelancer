import Receipt from "../types/Receipt";

class ReceiptService {

    #API_URL = "http://localhost:5232/api";

    /**
     * 
     * @param {Receipt} receipt The receipt with data to generate
     * @return {Promise}        Response of the service
     */
    generateReceipt = (receipt) => {
        const formData = new FormData();
        Object.entries(receipt).forEach(([key, value]) => {
            formData.append(key, value)
        })

        return new Promise((resolve, reject) => {
            fetch(`${this.#API_URL}/receipt/generate`, {
                method: "post",
                body: formData
            })
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }

}

export default ReceiptService;


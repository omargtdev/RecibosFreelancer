import Receipt from "../types/Receipt";

class ReceiptService {

    #API_URL = "http://localhost:5232/api";

    /**
     * 
     * @param {Receipt} receipt The receipt with data to generate
     * @return {Promise}        Response of the service (blob)
     */
    generateReceipt = (receipt) => {
        const formData = new FormData();
        Object.entries(receipt).forEach(([key, value]) => {
            formData.append(key, value)
        })

        return new Promise(async (resolve, reject) => {
            const result = await fetch(`${this.#API_URL}/receipt/generate`, {
                method: "post",
                body: formData
            });

            if(result.status !== 200){
                const { errors } = await result.json();
                return reject(errors);
            }

            resolve(await result.blob());
        });
    }

}

export default ReceiptService;


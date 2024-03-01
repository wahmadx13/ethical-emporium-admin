import { IProduct } from '../../../types/addProduct'
//Create Product
const createProduct = async (product: IProduct, jwtToken: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding product: ', err);
    }
};

const productServices = { createProduct };
export default productServices;
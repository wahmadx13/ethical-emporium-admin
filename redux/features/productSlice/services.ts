import { IProduct } from '../../../types/addProduct'

//Get All Products
const getProducts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting all Products', err)
    }
}

//Get A Product
const getProduct = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product/${id}`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting product', err)
    }
}

//Create Product
const createProduct = async (product: IProduct, jwtToken: string,) => {
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

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product/`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding product: ', err);
    }
};

//Delete A Product
const deleteAProduct = async (product: { id: Object, imageIds: string[] }, jwtToken: string) => {
    const { id } = product
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product/${id}`, requestOptions)
    } catch (err) {
        console.log('error in deleting product: ', err)
    }
}

const productServices = { getProducts, getProduct, createProduct, deleteAProduct };
export default productServices;
//Get All Product Categories
const getProductCategories = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product-category`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting all product categories', err)
    }
}

//Get A Product Category
const getProductCategory = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product-category/${id}`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting product category', err)
    }
}

//Create A Product Category
const createProductCategory = async (ProductCategory: { title: string }, jwtToken: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ProductCategory)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product-category`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding product category: ', err)
    }
};

//Update A Product Category
const updateProductCategory = async (productCategory: { title: string, id: string }, jwtToken: string) => {
    const { id } = productCategory;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productCategory)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product-category/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding product category: ', err)
    }
};

//Delete A Product Category
const deleteProductCategory = async (productCategory: { id: Object }, jwtToken: string) => {
    const { id } = productCategory;
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productCategory)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/product-category/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in deleting product category: ', err)
    }
}

const productCategoryServices = { getProductCategories, getProductCategory, createProductCategory, updateProductCategory, deleteProductCategory }
export default productCategoryServices 
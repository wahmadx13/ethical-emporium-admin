//Get All Brands
const getBrands = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/brand`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting all brands', err)
    }
}

//Get A Brand
const getBrand = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/brand/${id}`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting brand', err)
    }
}

//Create A Brand
const createBrand = async (brand: { title: string }, jwtToken: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brand)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/brand`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding brand: ', err)
    }
};

//Update A Brand
const updateBrand = async (brand: { title: string, id: string }, jwtToken: string) => {
    const { id } = brand;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brand)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/brand/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding brand: ', err)
    }
};

//Delete A Brand
const deleteBrand = async (brand: { id: Object }, jwtToken: string) => {
    const { id } = brand;
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brand)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/brand/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in deleting brand: ', err)
    }
}

const brandServices = { getBrands, getBrand, createBrand, updateBrand, deleteBrand }
export default brandServices 
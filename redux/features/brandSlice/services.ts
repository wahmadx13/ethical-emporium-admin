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
        console.log('error in adding product: ', err)
    }
};

const brandServices = { getBrands, createBrand }
export default brandServices 
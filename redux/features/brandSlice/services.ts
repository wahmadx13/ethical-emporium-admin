

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
        console.log('response', response);
        const data = await response.json();
        console.log('data', data)
        return data
    } catch (err) {
        console.log('error in adding product: ', err)
    }
};

const brandServices = { createBrand }
export default brandServices 
//Get All Colors
const getColors = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/color`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting all colors', err)
    }
}

//Get A Color
const getColor = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/color/${id}`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting color', err)
    }
}

//Create A Color
const createColor = async (color: { title: string }, jwtToken: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(color)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/color`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding color: ', err)
    }
};

//Update A Color
const updateColor = async (color: { title: string, id: string }, jwtToken: string) => {
    const { id } = color;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(color)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/color/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding color: ', err)
    }
};

//Delete A Color
const deleteColor = async (color: { id: Object }, jwtToken: string) => {
    const { id } = color;
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(color)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/color/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in deleting color: ', err)
    }
}

const colorServices = { getColors, getColor, createColor, updateColor, deleteColor }
export default colorServices 
//Get All Users
const getUsers = async (jwtToken: string) => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/user/users`, requestOptions);
        const data = response.json();
        return data;
    } catch (err) {
        console.log('Error in getting all users', err);
    }
}

//Update User
const restrictUser = async (user: { id: string; isBlocked: boolean }, jwtToken: string) => {
    const { id } = user;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/user/restrict-user/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in blocking user: ', err)
    }
};


const userServices = { getUsers, restrictUser }
export default userServices
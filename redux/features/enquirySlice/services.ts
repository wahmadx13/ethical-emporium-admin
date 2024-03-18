//Get All Enquiries
const getEnquiries = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/enquiry`, {
            method: 'GET'
        });
        const data = response.json();
        return data;
    } catch (err) {
        console.log('Error in getting all enquiries', err);
    }
}

//Update A Enquiry
const updateEnquiry = async (enquiry: { id: string, status: string }, jwtToken: string) => {
    const { id } = enquiry;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enquiry)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/enquiry/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding color: ', err)
    }
};

const enquiryServices = { getEnquiries, updateEnquiry };
export default enquiryServices;
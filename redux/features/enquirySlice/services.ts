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

const enquiryServices = { getEnquiries };
export default enquiryServices;
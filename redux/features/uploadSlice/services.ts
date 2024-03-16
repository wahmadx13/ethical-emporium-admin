//Upload Images
const uploadTargetImages = async (imageData: File[], jwtToken: string, prodId: string, path: string) => {
    try {
        const formData = new FormData();
        imageData.forEach(file => {
            formData.append('images', file);
        });
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
            },
            body: formData,
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/${path}/upload-${path}-images/${prodId}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding product Images: ', err);
    }
};

//Delete Images
const deleteTargetImages = async (imageId: string, jwtToken: string, prodId: string, path: string) => {
    console.log('imageId', imageId)
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageId: imageId })
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/${path}/delete-${path}-images/${prodId}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in deleting product images: ', err);
    }
};

const uploadServices = { uploadTargetImages, deleteTargetImages }
export default uploadServices;
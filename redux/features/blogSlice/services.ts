import { IBlog, IUpdateBlogFieldTypes } from '../../types/blog';

//Get All Blogs
const getBlogs = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog`, {
            method: 'GET'
        });
        const data = response.json();
        return data;
    } catch (err) {
        console.log('Error in getting all blogs', err);
    }
}

//Get A Blog
const getBlog = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog/${id}`, {
            method: 'GET'
        });
        const data = response.json();
        return data;
    } catch (err) {
        console.log('Error in getting blog', err);
    }
}

//Create Blog
const createBlog = async (blog: IBlog, jwtToken: string,) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog/`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding product: ', err);
    }
};

//Update Blog
const updateBlog = async (blog: IUpdateBlogFieldTypes, jwtToken: string) => {
    const { id } = blog;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in updating blog: ', err);
    }
};

//Delete A Blog
const deleteABlog = async (blog: { id: Object, imageIds?: string[] }, jwtToken: string) => {
    const { id } = blog
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        }

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('error in deleting blog: ', err);
    }
}

const blogServices = { getBlogs, getBlog, createBlog, updateBlog, deleteABlog };
export default blogServices;
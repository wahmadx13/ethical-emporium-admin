//Get All Blog Categories
const getBlogCategories = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog-category`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting all blog categories', err)
    }
}

//Get A Blog Category
const getBlogCategory = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog-category/${id}`, {
            method: 'GET'
        });
        const data = response.json()
        return data;
    } catch (err) {
        console.log('Error in getting blog category', err)
    }
}

//Create A Blog Category
const createBlogCategory = async (blogCategory: { title: string }, jwtToken: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogCategory)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog-category`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding blog category: ', err)
    }
};

//Update A Blog Category
const updateBlogCategory = async (blogCategory: { title: string, id: string }, jwtToken: string) => {
    const { id } = blogCategory;
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogCategory)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog-category/${id}`, requestOptions);
        const data = await response.json();
        return data
    } catch (err) {
        console.log('error in adding blog category: ', err)
    }
};

//Delete A Blog Category
const deleteBlogCategory = async (blogCategory: { id: Object }, jwtToken: string) => {
    const { id } = blogCategory;
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogCategory)
        };

        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/blog-category/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in deleting blog category: ', err)
    }
}

const blogCategoryServices = { getBlogCategories, getBlogCategory, createBlogCategory, updateBlogCategory, deleteBlogCategory }
export default blogCategoryServices 
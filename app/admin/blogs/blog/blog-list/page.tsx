'use client';
import { useCallback, useEffect, useState } from 'react';
import { Box, useDisclosure, Grid, GridItem } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import Modal from '../../../../../components/Modal';
import {
  getAllBlogs,
  deleteABlog,
  resetBlogState,
} from '../../../../../redux/features/blogSlice';
import ItemCard from '../../../../../components/ItemCard';

export default function BlogList() {
  const [blogId, setBlogId] = useState<Object>(null);
  const [imageIds, setImageIds] = useState<string[]>(null);
  const [BlogTitle, setBlogTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 200) {
      toast.success(message, { toastId: 'blog-deleting-success' });
    } else {
      toast.error(message, { toastId: 'blog-deleting-error' });
    }
  }, []);

  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allBlogs, isLoading, deletedBlog } = useAppSelector(
    (state) => state.blogReducer,
  );

  useEffect(() => {
    toastNotification(deletedBlog?.statusCode, deletedBlog?.message);
  }, [deletedBlog?.message, deletedBlog?.statusCode, toastNotification]);

  useEffect(() => {
    if (!allBlogs?.length) {
      dispatch(getAllBlogs());
    }
  }, [allBlogs?.length, dispatch]);

  const handleModalOpen = (id: Object, title: string, assetIds: string[]) => {
    setImageIds(assetIds);
    setBlogId(id);
    setBlogTitle(title);
    onOpen();
  };

  const handleDeleteProduct = async () => {
    await dispatch(deleteABlog({ blog: { id: blogId, imageIds }, jwtToken }));
    onClose();
    setImageIds(null);
    setBlogId(null);
    setBlogTitle(null);
    dispatch(resetBlogState());
  };

  const handleCancel = () => {
    setImageIds(null);
    setBlogId(null);
    setBlogTitle(null);
    onClose();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} width="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {allBlogs
          ? allBlogs.map((blog) => (
              <GridItem w="100%" key={blog._id.toString()}>
                <ItemCard
                  id={blog._id}
                  name={blog.title}
                  image={blog.images[0]?.url}
                  images={blog.images}
                  handleModelOpen={handleModalOpen}
                  author={blog.author}
                  likes={blog.likes}
                  dislikes={blog.dislikes}
                  url={`/admin/blogs/blog/blog-details/${blog._id.toString()}`}
                />
              </GridItem>
            ))
          : ''}
        <Modal
          modalTitle="Delete Product?"
          modalBody={`Are you sure you want to delete product title: ${BlogTitle}`}
          isOpen={isOpen}
          onClose={handleCancel}
          onDelete={handleDeleteProduct}
          isLoading={isLoading}
        />
      </Grid>
    </Box>
  );
}

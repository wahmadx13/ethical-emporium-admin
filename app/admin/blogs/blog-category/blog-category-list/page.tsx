'use client';
import { useCallback, useEffect, useState } from 'react';
import { Box, Icon, SimpleGrid, Td, Tr, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Table from '../../../../../components/Table';
import Modal from '../../../../../components/Modal';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { CiTrash } from 'react-icons/ci';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  getAllBlogCategories,
  deleteABlogCategory,
  resetState,
} from '../../../../../redux/features/blogCategorySlice';
import { capitalizeFirstLetter } from '../../../../../utils/helper';

const columns = [
  {
    title: 'Serial',
    dataIndex: 'serial',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];
export default function BlogCategoryList() {
  const [blogCategoryId, setBlogCategoryId] = useState<Object>(null);
  const [blogCategoryTitle, setBlogTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 200) {
      toast.success(message, { toastId: 'blog-category-deleting-success' });
    } else {
      toast.error(message, { toastId: 'blog-category-deleting-error' });
    }
  }, []);

  const { allBlogCategories, isLoading } = useAppSelector(
    (state) => state.blogCategoryReducer,
  );
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const getBlogCategories = useCallback(() => {
    if (!allBlogCategories.length) {
      dispatch(getAllBlogCategories());
    }
  }, [allBlogCategories.length, dispatch]);

  useEffect(() => {
    getBlogCategories();
  }, [getBlogCategories]);

  const handleModalOpen = (id: Object, title: string) => {
    setBlogCategoryId(id);
    setBlogTitle(title);
    onOpen();
  };

  const handleDeleteBlogCategory = async () => {
    const response = await dispatch(
      deleteABlogCategory({
        blogCategory: { id: blogCategoryId },
        jwtToken,
      }),
    );
    try {
      toastNotification(response.payload.statusCode, response.payload.message);
    } catch (err) {
      toast.error('Something went wrong!', {
        toastId: 'blog-category-deleting-error',
      });
    }
    onClose();
    setBlogCategoryId(null);
    setBlogTitle(null);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} width="100%">
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 2 }}
        gap="20px"
        mb="20px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        {allBlogCategories ? (
          <Table caption="All Available Blog Categories" cols={columns}>
            {allBlogCategories?.map(({ _id, title }, i) => {
              return (
                <Tr key={_id.toString()} className="table-end">
                  <Td>{i + 1}</Td>
                  <Td>{capitalizeFirstLetter(title)}</Td>
                  <Td>
                    <Link
                      href={`/admin/blogs/blog-category/update-blog-category/${_id.toString()}`}
                    >
                      <Icon
                        as={FiEdit}
                        width="20px"
                        height="20px"
                        color="inherit"
                        style={{ cursor: 'pointer' }}
                      />
                    </Link>
                    <Icon
                      as={CiTrash}
                      width="20px"
                      height="20px"
                      color="inherit"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleModalOpen(_id, title)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Table>
        ) : (
          ''
        )}
        <Modal
          modalTitle="Delete Blog Category?"
          modalBody={`Are you sure you want to delete ${blogCategoryTitle} blog category`}
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteBlogCategory}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Box>
  );
}

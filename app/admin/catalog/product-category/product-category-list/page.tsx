'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Icon, SimpleGrid, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { CiTrash } from 'react-icons/ci';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import Table from '../../../../../components/Table';
import Modal from '../../../../../components/Modal';
import {
  getAllProductCategories,
  deleteAProductCategory,
  resetState,
} from '../../../../../redux/features/productCategorySlice';

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
export default function AddProductCategory() {
  const [productCategoryId, setProductCategoryId] = useState<Object>(null);
  const [productCategoryTitle, setProductTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 200) {
      toast.success(message, { toastId: 'product-category-deleting-success' });
    } else {
      toast.error(message, { toastId: 'product-category-deleting-error' });
    }
  }, []);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllProductCategories());
  }, [dispatch]);

  const { allProductCategories, isLoading } = useAppSelector(
    (state) => state.productCategoryReducer,
  );
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const handleModalOpen = (id: Object, title: string) => {
    setProductCategoryId(id);
    setProductTitle(title);
    onOpen();
  };

  const handleDeleteProductCategory = async () => {
    const response = await dispatch(
      deleteAProductCategory({
        productCategory: { id: productCategoryId },
        jwtToken,
      }),
    );
    try {
      toastNotification(response.payload.statusCode, response.payload.message);
    } catch (err) {
      toast.error('Something went wrong!', {
        toastId: 'product-category-deleting-error',
      });
    }
    onClose();
    setProductCategoryId(null);
    setProductTitle(null);
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
        <Table caption="All Available Product Categories" cols={columns}>
          {allProductCategories?.map(({ _id, title }, i) => {
            return (
              <Tr key={_id.toString()} className="table-end">
                <Td>{i + 1}</Td>
                <Td>{title}</Td>
                <Td>
                  <Link
                    href={`/admin/catalog/product-category/update-product-category/${_id.toString()}`}
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
        <Modal
          modalTitle="Delete Product Category?"
          modalBody={`Are you sure you want to delete ${productCategoryTitle} product category`}
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteProductCategory}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Box>
  );
}

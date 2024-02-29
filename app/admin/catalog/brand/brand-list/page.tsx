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
  getAllBrands,
  deleteABrand,
  resetState,
} from '../../../../../redux/features/brandSlice';

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
export default function BrandList() {
  const [brandId, setBrandId] = useState<Object>(null);
  const [brandTitle, setBrandTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 200) {
      toast.success(message, { toastId: 'brand-deleting-success' });
    } else {
      toast.error(message, { toastId: 'brand-deleting-error' });
    }
  }, []);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllBrands());
  }, [dispatch]);

  const { allBrands, isLoading } = useAppSelector(
    (state) => state.brandReducer,
  );
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const handleModalOpen = (id: Object, title: string) => {
    setBrandId(id);
    setBrandTitle(title);
    onOpen();
  };

  const handleDeleteBrand = async () => {
    const response = await dispatch(
      deleteABrand({ brand: { id: brandId }, jwtToken }),
    );
    try {
      toastNotification(response.payload.statusCode, response.payload.message);
    } catch (err) {
      toast.error('Something went wrong!', {
        toastId: 'brand-deleting-error',
      });
    }
    onClose();
    setBrandId(null);
    setBrandTitle(null);
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
        <Table caption="All Available Brands" cols={columns}>
          {allBrands?.map(({ _id, title }, i) => {
            return (
              <Tr key={_id.toString()} className="table-end">
                <Td>{i + 1}</Td>
                <Td>{title}</Td>
                <Td>
                  <Link
                    href={`/admin/catalog/brand/update-brand/${_id.toString()}`}
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
          modalTitle="Delete Brand?"
          modalBody={`Are you sure you want to delete ${brandTitle} brand`}
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteBrand}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Box>
  );
}

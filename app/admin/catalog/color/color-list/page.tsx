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
  getAllColors,
  deleteAColor,
  resetState,
} from '../../../../../redux/features/colorSlice';

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
export default function ColorList() {
  const [colorId, setColorId] = useState<Object>(null);
  const [colorTitle, setColorTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 200) {
      toast.success(message, { toastId: 'color-deleting-success' });
    } else {
      toast.error(message, { toastId: 'color-deleting-error' });
    }
  }, []);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllColors());
  }, [dispatch]);

  const { allColors, isLoading } = useAppSelector(
    (state) => state.colorReducer,
  );
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const handleModalOpen = (id: Object, title: string) => {
    setColorId(id);
    setColorTitle(title);
    onOpen();
  };

  const handleDeleteColor = async () => {
    const response = await dispatch(
      deleteAColor({ color: { id: colorId }, jwtToken }),
    );
    try {
      toastNotification(response.payload.statusCode, response.payload.message);
    } catch (err) {
      toast.error('Something went wrong!', {
        toastId: 'color-deleting-error',
      });
    }
    onClose();
    setColorId(null);
    setColorTitle(null);
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
        <Table caption="All Available Colors" cols={columns}>
          {allColors?.map(({ _id, title }, i) => {
            return (
              <Tr key={_id.toString()} className="table-end">
                <Td>{i + 1}</Td>
                <Td>{title}</Td>
                <Td>
                  <Link
                    href={`/admin/catalog/color/update-color/${_id.toString()}`}
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
          modalTitle="Delete Color?"
          modalBody={`Are you sure you want to delete ${colorTitle} color`}
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteColor}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Box>
  );
}

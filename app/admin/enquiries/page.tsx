'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  GridItem,
  Icon,
  SimpleGrid,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { CiTrash } from 'react-icons/ci';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import Table from '../../../components/Table';
import { getAllEnquiries } from '../../../redux/features/enquirySlice';

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
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];
export default function EnquiryList() {
  const [enquiryId, setEnquiryId] = useState<Object>(null);
  const [username, setUsername] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { allEnquiries } = useAppSelector((state) => state.enquiryReducer);

  const getEnquiries = useCallback(() => {
    if (!allEnquiries.length) {
      dispatch(getAllEnquiries());
    }
  }, [allEnquiries.length, dispatch]);

  useEffect(() => {
    getEnquiries();
  }, [dispatch, getEnquiries]);

  const handleModalOpen = (id: Object, username: string) => {
    setEnquiryId(id);
    setUsername(username);
    onOpen();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} width="100%">
      <Table caption="All Available Enquiries by users" cols={columns}>
        {allEnquiries?.map(
          ({ _id, name, email, mobile, comment, status }, i) => {
            return (
              <Tr key={_id.toString()} className="table-end">
                <Td>{i + 1}</Td>
                <Td>{name}</Td>
                <Td>{email}</Td>
                <Td>{mobile}</Td>
                <Td>{comment}</Td>
                <Td>{status}</Td>
                <Td>
                  <Icon
                    as={FiEdit}
                    width="20px"
                    height="20px"
                    color="inherit"
                    cursor="pointer"
                  />
                  <Icon
                    as={CiTrash}
                    width="20px"
                    height="20px"
                    color="inherit"
                    cursor="pointer"
                    onClick={() => handleModalOpen(_id, name)}
                  />
                </Td>
              </Tr>
            );
          },
        )}
      </Table>
    </Box>
  );
}

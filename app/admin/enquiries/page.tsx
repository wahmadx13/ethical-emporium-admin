'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { CiTrash } from 'react-icons/ci';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Modal from '../../../components/Modal';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  deleteAnEnquiry,
  getAllEnquiries,
  updateAnEnquiry,
} from '../../../redux/features/enquirySlice';
import { ISelectProps } from '../../../types/addProduct';

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
  const [updateEnquiry, setUpdateEnquiry] = useState<boolean>(false);
  const [updateEnquiryStatus, setUpdateEnquiryStatus] = useState<string>(null);
  const [validateEnquiry, setValidateEnquiry] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const statusOpt = ['Submitted', 'Contacted', 'In Progress', 'Resolved'];

  const statusOptions = statusOpt?.map((option) => ({
    value: option.replace(/\s+|_+|-+/g, '').toLowerCase(),
    label: option,
  }));

  const { allEnquiries, isLoading } = useAppSelector(
    (state) => state.enquiryReducer,
  );

  const { jwtToken } = useAppSelector((state) => state.authReducer);

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

  const handleUpdateStatus = async () => {
    try {
      const response = await dispatch(
        updateAnEnquiry({
          enquiryData: {
            id: enquiryId.toString(),
            status: updateEnquiryStatus,
          },
          jwtToken,
        }),
      );

      console.log('response', response);

      if (response.payload?.statusCode === 200) {
        toast.success('Enquiry status updated successfully');
      } else {
        toast.error('Something went wrong while updating status');
      }
    } catch (err) {
      toast.error('Internal server error');
    }
    setUpdateEnquiry(false);
    setUpdateEnquiryStatus(null);
    setValidateEnquiry(false);
  };

  const handleClose = () => {
    setEnquiryId(null);
    setUsername(null);
    onClose();
  };

  const handleDeleteEnquiry = async () => {
    try {
      const response = await dispatch(
        deleteAnEnquiry({ enquiry: { id: enquiryId }, jwtToken }),
      );
      if (response.payload?.statusCode === 200) {
        toast.success(`Enquiry by ${username} deleted successfully`);
      } else {
        toast.success('Something went wrong');
      }
    } catch (err) {
      toast.error('Something went wrong!', {
        toastId: 'enquiry-deleting-error',
      });
    }
    setEnquiryId(null);
    setUsername(null);
    onClose();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} width="100%">
      {allEnquiries.length > 0 ? (
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
                  <Td>
                    {updateEnquiry ? (
                      <Flex direction="column" gap="10px">
                        <Select
                          formLabel="Select a Status"
                          multipleOpt={false}
                          name="category"
                          placeholder="Select a status from options"
                          options={statusOptions}
                          value={status}
                          validationError={validateEnquiry}
                          setValidationError={setValidateEnquiry}
                          onChange={(value: ISelectProps) => {
                            setUpdateEnquiryStatus(value.label);
                            setEnquiryId(_id);
                          }}
                        />
                        <Button
                          isDisabled={validateEnquiry}
                          isLoading={isLoading}
                          variant="brand"
                          fontWeight="500"
                          onClick={handleUpdateStatus}
                        >
                          Update Status
                        </Button>
                      </Flex>
                    ) : (
                      status
                    )}
                  </Td>
                  <Td>
                    <Icon
                      as={FiEdit}
                      width="20px"
                      height="20px"
                      color="inherit"
                      cursor="pointer"
                      onClick={() => setUpdateEnquiry(true)}
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
      ) : (
        ''
      )}
      <Modal
        modalTitle="Delete Color?"
        modalBody={`Are you sure you want to delete enquiry by ${username}`}
        isOpen={isOpen}
        onClose={handleClose}
        onDelete={handleDeleteEnquiry}
        isLoading={isLoading}
      />
    </Box>
  );
}

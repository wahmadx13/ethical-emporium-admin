'use client';
import { useCallback, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Td,
  Tr,
  Text,
  Checkbox,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import Table from '../../../components/Table';
import { getAllUsers, restrictUser } from '../../../redux/features/userSlice';

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
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];
export default function UserList() {
  const dispatch = useAppDispatch();

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const { allUsers } = useAppSelector((state) => state.userReducer);
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const getUsers = useCallback(() => {
    if (!allUsers?.length) {
      dispatch(getAllUsers(jwtToken));
    }
  }, [allUsers?.length, dispatch, jwtToken]);

  useEffect(() => {
    getUsers();
  }, [allUsers, getUsers]);

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
        {allUsers?.length ? (
          <Table caption="All Available Colors" cols={columns}>
            {allUsers?.map(
              ({ _id, name, email, phoneNumber, isBlocked }, i) => {
                return (
                  <Tr key={_id.toString()} className="table-end">
                    <Td>{i + 1}</Td>
                    <Td>{name}</Td>
                    <Td>{email}</Td>
                    <Td>{phoneNumber}</Td>
                    <Td>
                      <Flex alignContent="center" justify="flex-end" gap={6}>
                        <Text
                          fontWeight="bold"
                          color={textColor}
                          fontSize="md"
                          textAlign="center"
                        >
                          Block User?
                        </Text>
                        <Checkbox
                          me="16px"
                          colorScheme="brandScheme"
                          defaultChecked={isBlocked}
                          onChange={(e) =>
                            dispatch(
                              restrictUser({
                                userData: {
                                  id: _id.toString(),
                                  isBlocked: e.target.checked,
                                },
                                jwtToken,
                              }),
                            )
                          }
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              },
            )}
          </Table>
        ) : (
          ''
        )}
      </SimpleGrid>
    </Box>
  );
}

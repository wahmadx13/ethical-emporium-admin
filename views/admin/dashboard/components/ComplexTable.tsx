import { useCallback, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import Table from '../../../../components/Table';
// Custom components
import Card from '../../../../components/card/Card';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
// Assets
import {
  getAllUsers,
  restrictUser,
} from '../../../../redux/features/userSlice';


// const columns = columnsDataCheck;
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
export default function ComplexTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const dispatch = useAppDispatch();

  const { allUsers } = useAppSelector((state) => state.userReducer);
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const getUsers = useCallback(async () => {
    if (!allUsers?.length) {
      await dispatch(getAllUsers(jwtToken));
      allUsers?.sort(
        (prevUser, nextUser) =>
          new Date(nextUser.createdAt).getTime() -
          new Date(prevUser.createdAt).getTime(),
      );
    }
  }, [allUsers, dispatch, jwtToken]);

  useEffect(() => {
    getUsers();
    console.log('AllUsers', allUsers);
  }, [allUsers, getUsers]);

  const recentlyCreatedUsers = allUsers.slice(0, 10);

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Recently Registered Users
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Box>
        {recentlyCreatedUsers?.length ? (
          <Table caption="Recently Registered Users" cols={columns}>
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
      </Box>
    </Card>
  );
}

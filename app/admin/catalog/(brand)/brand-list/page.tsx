'use client';
import { useEffect } from 'react';
import { Box, Icon, SimpleGrid, Td, Tr } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import Table from '../../../../../components/Table';
import { getAllBrands } from '../../../../../redux/features/brandSlice';
import { FiEdit } from 'react-icons/fi';
import { CiTrash } from 'react-icons/ci';

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
export default function AddBrand() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const { allBrands } = useAppSelector((state) => state.brandReducer);

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
                  <Icon
                    as={FiEdit}
                    width="20px"
                    height="20px"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                  />
                  <Icon
                    as={CiTrash}
                    width="20px"
                    height="20px"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                  />
                </Td>
              </Tr>
            );
          })}
        </Table>
      </SimpleGrid>
    </Box>
  );
}

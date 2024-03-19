import { ReactNode } from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

export interface ITableCols {
  title: string;
  dataIndex: string;
}

export default function Table(props: {
  cols: ITableCols[];
  children: ReactNode;
  caption: string;
}) {
  const { cols, children, caption, ...rest } = props;

  return (
    <TableContainer border="1px" borderRadius="1rem" padding="1rem">
      <ChakraTable variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr className="table-end">
            {cols.map((col) => (
              <Th key={col.dataIndex}>{col.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
        <Tfoot>
          <Tr className="table-end">
            {cols.map((col) => (
              <Th key={col.dataIndex}>{col.title}</Th>
            ))}
          </Tr>
        </Tfoot>
      </ChakraTable>
    </TableContainer>
  );
}

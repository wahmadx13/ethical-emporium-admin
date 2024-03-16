import {
  Checkbox as ChakraCheckbox,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ICheckboxProps } from '../../types/checkbox';

export default function Checkbox(props: ICheckboxProps) {
  const { onChange, checked, label } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Flex alignItems="center">
      <ChakraCheckbox
        me="16px"
        colorScheme="brandScheme"
        onChange={onChange}
        defaultChecked={checked}
      />
      <Text fontWeight="bold" color={textColor} fontSize="md" textAlign="start">
        {label}
      </Text>
    </Flex>
  );
}

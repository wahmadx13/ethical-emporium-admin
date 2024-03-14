import {
  FormControl as ChakraFormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IFormControlProps } from '../../types/addProduct';

export default function FormControl(props: IFormControlProps) {
  const {
    formLabel,
    onChange,
    onBlur,
    value,
    name,
    placeholder,
    type,
    formikTouched,
    formikError,
    defaultValue,
  } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  return (
    <ChakraFormControl marginBottom="2rem">
      <FormLabel
        display="flex"
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={textColor}
        mb="8px"
      >
        {formLabel}
        <Text color={brandStars}>*</Text>
      </FormLabel>
      {type === 'number' ? (
        <NumberInput
          placeholder={placeholder}
          variant="auth"
          fontWeight="500"
          color="inherit"
          mb="15px"
          size="lg"
          ms={{ base: '0px', md: '0px' }}
          defaultValue={defaultValue}
          min={0}
        >
          <NumberInputField
            color="inherit"
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            fontSize="sm"
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      ) : (
        <Input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: '0px', md: '0px' }}
          type={type}
          placeholder={placeholder}
          fontWeight="500"
          size="lg"
        />
      )}
      <Text mb="10px" color="red.500" fontSize="1rem">
        {formikTouched && formikError}
      </Text>
    </ChakraFormControl>
  );
}

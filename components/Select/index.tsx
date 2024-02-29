import {
  FormControl,
  FormLabel,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { CreatableSelect, Select as ChakraSelect } from 'chakra-react-select';
import { IFormControlSelectProps } from '../../types/addProduct';

export default function Select(props: IFormControlSelectProps) {
  const {
    formLabel,
    onChange,
    onBlur,
    name,
    placeholder,
    formikTouched,
    formikError,
    multipleOpt,
    options,
  } = props;

  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  return (
    <FormControl marginBottom="2rem">
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

      {!multipleOpt ? (
        <ChakraSelect
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          closeMenuOnSelect={true}
          selectedOptionStyle="check"
          size="lg"
        />
      ) : name === 'tags' ? (
        <CreatableSelect
          isMulti
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          closeMenuOnSelect={false}
          options={options}
          size="lg"
        />
      ) : (
        <ChakraSelect
          isMulti
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          placeholder={placeholder}
          closeMenuOnSelect={false}
          size="lg"
        />
      )}
      <Text mb="10px" color="red.500" fontSize="1rem">
        {formikTouched && formikError}
      </Text>
    </FormControl>
  );
}

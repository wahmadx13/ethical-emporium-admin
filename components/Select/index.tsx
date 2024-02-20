import { ChangeEvent, FocusEventHandler } from 'react';
import {
  FormControl,
  FormLabel,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

import {
  Select as ChakraSelect,
  MultiValue,
  ActionMeta,
} from 'chakra-react-select';

interface IFormControlProps {
  formLabel?: string;
  onChange?: any;
  onBlur?: any;
  multiChange?: any;
  multiBlur?: any;
  value?: string[] | string;
  isRequired?: boolean;
  placeholder?: string;
  name?: string;
  type?: string;
  formikTouched?: boolean;
  formikError?: string | string[];
  children?: any;
  multipleOpt?: boolean;
  options?: any;
}

export default function Select(props: IFormControlProps) {
  const {
    formLabel,
    onChange,
    onBlur,
    value,
    name,
    placeholder,
    formikTouched,
    formikError,
    multipleOpt,
    options,
    multiChange,
    multiBlur,
  } = props;

  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  // console.log('value', name);
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
      {multipleOpt ? (
        <ChakraSelect
          variant="auth"
          isMulti
          name={name}
          options={options}
          placeholder={placeholder}
          onChange={multiChange}
          onBlur={multiBlur}
          closeMenuOnSelect={false}
          size="lg"
          value={value}
        />
      ) : (
        <ChakraSelect
          variant="auth"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          size="lg"
          options={options}
          selectedOptionStyle="check"
        />
      )}
      <Text mb="10px" color="red.500" fontSize="1rem">
        {formikTouched && formikError}
      </Text>
    </FormControl>
  );
}

import {
  FormControl,
  FormLabel,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { SingleSelect, MultipleSelect } from 'react-select-material-ui';
import { IFormControlSelectProps } from '../../types/addProduct';

export default function Select(props: IFormControlSelectProps) {
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
    noOptionMessage,
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

      {!multipleOpt ? (
        <SingleSelect
          name={name}
          value={value}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <MultipleSelect
          name={name}
          value={value}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          onBlur={onBlur}
          SelectProps={{
            msgNoOptionsAvailable: noOptionMessage,
          }}
        />
      )}
      <Text mb="10px" color="red.500" fontSize="1rem">
        {formikTouched && formikError}
      </Text>
    </FormControl>
  );
}

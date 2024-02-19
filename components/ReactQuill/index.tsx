import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  FormControl,
  FormLabel,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

interface IReactQuillProps {
  onChange?: any;
  onBlur?: any;
  formLabel?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  formikTouched?: boolean;
  formikError?: string;
}

export default function CustomReactQuill(props: IReactQuillProps) {
  const {
    formLabel,
    onChange,
    onBlur,
    placeholder,
    value,
    name,
    formikTouched,
    formikError,
  } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
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
      <ReactQuill
        className="react-quill"
        theme="snow"
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
      />
      <Text mb="10px" color="red.500" fontSize="1rem">
        {formikTouched && formikError}
      </Text>
    </FormControl>
  );
}

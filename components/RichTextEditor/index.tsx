import {
  FormControl,
  FormLabel,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { IRichTextEditor } from '../../types/addProduct';

export default function RichTextEditor(props: IRichTextEditor) {
  const {
    formLabel,
    onChange,
    onBlur,
    placeholder,
    value,
    formikTouched,
    formikError,
  } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  return (
    <FormControl marginBottom="2rem" className="rich-editor">
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
      <Editor
        onEditorChange={onChange}
        apiKey={process.env.NEXT_TINYMCE_API_KEY}
        onBlur={onBlur}
        value={value}
        initialValue={placeholder}
        init={{
          plugins:
            'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount linkchecker',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
      />
      <Text mb="10px" color="red.500" fontSize="1rem">
        {formikTouched && formikError}
      </Text>
    </FormControl>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '../../../../../components/FormControl';
import RichTextEditor from '../../../../../components/RichTextEditor';
import Select from '../../../../../components/Select';
import ReactDropzone from '../../../../../components/ReactDropzone';
import { IAddProduct } from '../../../../../types/addProduct';

//RAW DATA

//Color Data
const colorOptions: string[] = [
  'Red',
  'Violet',
  'Blue',
  'Indigo',
  'White',
  'Black',
  'Pink',
  'Other',
];

//Brand Select
const brandOptions: string[] = ['Apple', 'Samsung', 'Dell', 'HP'];

//Tags Select
export const tagsOptions = [
  { value: 'apple', label: 'Apple', brand: 'apple' },
  { value: 'samsung', label: 'Samsung', brand: 'samsung' },
  { value: 'huawei', label: 'Huawei', brand: 'huawei' },
  { value: 'dell', label: 'Dell', brand: 'dell' },
];

export const tagsData = [
  {
    label: 'Tags',
    options: tagsOptions,
  },
];

//Category Select
const categoryOptions: string[] = [
  'Laptop',
  'Smart TV',
  'Smart Watch',
  'Mobile Phones',
  'Mobile Accessories',
  'Laptop Accessories',
];

export default function AddProduct() {
  //React States
  const [isProductAdded, setIsProductAdded] = useState<boolean>(false);
  const [productDescription, setProductDescription] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [selectTags, setSelectTags] = useState<string[]>([]);

  const schema = yup.object().shape({
    title: yup.string().required("Product's Title is Required"),
    description: yup.string().required("Product's description is Required"),
    price: yup.number().required("Product's price is required"),
    brand: yup.string().required("Product's brand is required"),
    category: yup.string().required('Pick at least one category'),
    color: yup
      .array()
      .min(1, 'Color must have at least one item')
      .required('Pick at least one color'),
    quantity: yup.number().required("Product's quantity is required"),
    tags: yup
      .array()
      .min(1, 'Tags must have at least one item')
      .required('Pick at least one tag'),
  });

  const handleUploadProduct = () => {
    setIsProductAdded(true);
  };

  const handleColorSelect = (values: string[]) => {
    setColors(values);
  };

  const handleTagsSelect = (values: string[]) => {
    setSelectTags(values);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      brand: '',
      category: '',
      color: [],
      quantity: 0,
      tags: [],
    },
    validationSchema: schema,
    onSubmit: (values: IAddProduct) => {
      console.log('ProductValues', values);
    },
  });

  const hasErrors = Object.keys(formik.errors).length > 0;
  useEffect(() => {
    formik.values.description = productDescription ? productDescription : '';
    formik.values.color = colors ? colors : [];
    formik.values.tags = selectTags ? selectTags : [];
    console.log('formikValues', formik.values);
  }, [
    colors,
    formik.errors,
    formik.touched,
    formik.values,
    productDescription,
    selectTags,
  ]);

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
        {!isProductAdded ? (
          <form action="" onSubmit={formik.handleSubmit}>
            <FormControl
              formLabel="Product Title"
              name="title"
              type="text"
              placeholder="Enter Product Title"
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              value={formik.values.title}
              formikTouched={formik.touched.title}
              formikError={formik.errors.title}
            />
            <RichTextEditor
              formLabel="Product Description"
              placeholder="Enter Product Description"
              onChange={(content: string) => {
                formik.setFieldValue('description', content);
                setProductDescription(content);
              }}
              onBlur={formik.handleBlur('description')}
              value={formik.values.description}
              formikTouched={formik.touched.description}
              formikError={formik.errors.description}
            />
            <FormControl
              formLabel="Enter Product Price"
              name="price"
              type="number"
              placeholder="0.00"
              value={formik.values.price}
              onChange={formik.handleChange('price')}
              onBlur={formik.handleBlur('price')}
              formikTouched={formik.touched.price}
              formikError={formik.errors.price}
            />
            <FormControl
              formLabel="Enter Product Quantity"
              name="quantity"
              type="number"
              placeholder="0.00"
              onChange={formik.handleChange('quantity')}
              onBlur={formik.handleBlur('quantity')}
              value={formik.values.quantity}
              formikTouched={formik.touched.quantity}
              formikError={formik.errors.quantity}
            />
            <Select
              formLabel="Select Brand"
              multipleOpt={false}
              name="brand"
              placeholder="Select a brand From the options"
              value={formik.values.brand}
              options={brandOptions}
              onChange={formik.handleChange('brand')}
              onBlur={formik.handleBlur('brand')}
              formikTouched={formik.touched.brand}
              formikError={formik.errors.brand}
            />
            <Select
              formLabel="Select Product Category"
              multipleOpt={false}
              name="category"
              placeholder="Select a product category from options"
              value={formik.values.category}
              options={categoryOptions}
              onChange={formik.handleChange('category')}
              onBlur={formik.handleBlur('category')}
              formikTouched={formik.touched.category}
              formikError={formik.errors.category}
            />
            <Select
              formLabel="Select Colors"
              multipleOpt={true}
              name="color"
              placeholder="Select at least on color from the options"
              value={formik.values.category}
              options={colorOptions}
              onChange={(values: string[]) => handleColorSelect(values)}
              onBlur={formik.handleBlur('color')}
              formikTouched={formik.touched.color}
              formikError={formik.errors.color}
              noOptionMessage="All available color options are selected"
            />
            <Select
              formLabel="Select Tags"
              multipleOpt={true}
              name="tags"
              placeholder="Select at least on tag from the options"
              value={formik.values.category}
              options={colorOptions}
              onChange={(values: string[]) => handleTagsSelect(values)}
              onBlur={formik.handleBlur('tags')}
              formikTouched={formik.touched.tags}
              formikError={formik.errors.tags}
              noOptionMessage="All available tags options are selected"
            />
            <Button
              isDisabled={hasErrors}
              onClick={handleUploadProduct}
              variant="brand"
              fontWeight="500"
              type="submit"
            >
              Add Product
            </Button>
          </form>
        ) : (
          <ReactDropzone setIsProductAdded={setIsProductAdded} />
        )}
      </SimpleGrid>
    </Box>
  );
}

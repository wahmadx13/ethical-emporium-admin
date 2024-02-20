'use client';
import { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '../../../../../components/FormControl';
import CustomReactQuill from '../../../../../components/ReactQuill';
import Select from '../../../../../components/Select';
import ReactDropzone from '../../../../../components/ReactDropzone';
import { IAddProduct } from '../../../../../types/addProduct';

//RAW DATA

//Colors Select
export const colorOptions = [
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
];

//Brand Select
export const brandsOptions = [
  { value: 'apple', label: 'Apple', brand: 'apple' },
  { value: 'samsung', label: 'Samsung', brand: 'samsung' },
  { value: 'huawei', label: 'Huawei', brand: 'huawei' },
  { value: 'dell', label: 'Dell', brand: 'dell' },
];

export const groupedOptions = [
  {
    label: 'Brands',
    options: brandsOptions,
  },
];

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
export const categoryOptions = [
  { value: 'laptop', label: 'Laptop', brand: 'laptop' },
  { value: 'mobile', label: 'Mobile', brand: 'mobile' },
  { value: 'smart-watch', label: 'Smart Watch', brand: 'smart-watch' },
];

export const categoryData = [
  {
    label: 'Tags',
    options: categoryOptions,
  },
];

const mappedColorOptions = colorOptions.map((option) => ({
  ...option,
  colorScheme: option.value,
}));

export default function AddProduct() {
  //React States
  const [isProductAdded, setIsProductAdded] = useState<boolean>(false);

  const schema = yup.object().shape({
    title: yup.string().required("Product's Title is Required"),
    description: yup.string().required("Product's description is Required"),
    price: yup.number().required("Product's price is required"),
    brand: yup.string().required("Product's brand is required"),
    category: yup.array().min(1).required('Pick at least one category'),
    color: yup.array().min(1).required('Pick at least one color'),
    quantity: yup.number().required("Product's quantity is required"),
    tags: yup.array().min(1).required('Pick at least one tag'),
  });

  const handleUploadProduct = () => {
    setIsProductAdded(true);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      brand: '',
      category: [],
      color: [],
      quantity: 0,
      tags: [],
    },
    validationSchema: schema,
    onSubmit: (values: IAddProduct) => {
      console.log('ProductValues', values);
    },
  });

  useEffect(() => {
    console.log('formikValues', formik.values);
  }, [formik.values]);

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
              isRequired={true}
              type="text"
              placeholder="Enter Product Title"
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              value={formik.values.title}
              formikTouched={formik.touched.title}
              formikError={formik.errors.title}
            />
            <CustomReactQuill
              name="description"
              formLabel="Product Description"
              placeholder="Enter Product Description"
              onChange={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              value={formik.values.description}
              formikTouched={formik.touched.description}
              formikError={formik.errors.description}
            />
            <FormControl
              formLabel="Enter Product Price"
              name="price"
              isRequired={true}
              type="number"
              defaultValue={0.0}
              onChange={formik.handleChange('price')}
              onBlur={formik.handleBlur('price')}
              formikTouched={formik.touched.price}
              formikError={formik.errors.price}
            />
            <Select
              formLabel="Brand"
              name="brand"
              placeholder="Select Brand"
              options={groupedOptions}
              // onChange={formik.handleChange('brand')}
              // onBlur={formik.handleBlur('brand')}
              formikTouched={formik.touched.brand}
              formikError={formik.errors.brand}
            />
            <Select
              formLabel="Product Category"
              name="category"
              placeholder="Select Products Category"
              multipleOpt={true}
              options={categoryData}
              multiChange={formik.handleChange('category')}
              multiBlur={formik.handleBlur('category')}
              formikTouched={formik.touched.category}
              formikError={formik.errors.category}
            />
            <Select
              formLabel="Colors"
              name="color"
              placeholder="Select Colors"
              multipleOpt={true}
              options={mappedColorOptions}
              onChange={formik.handleChange('color')}
              onBlur={formik.handleBlur('color')}
              formikTouched={formik.touched.color}
              formikError={formik.errors.color}
            />
            <FormControl
              formLabel="Enter Product Quantity"
              name="quantity"
              isRequired={true}
              type="number"
              defaultValue={0.0}
              onChange={formik.handleChange('quantity')}
              onBlur={formik.handleBlur('quantity')}
              value={formik.values.quantity}
              formikTouched={formik.touched.quantity}
              formikError={formik.errors.quantity}
            />
            <Select
              formLabel="Tags"
              name="tags"
              placeholder="Select Tags"
              multipleOpt={true}
              options={tagsData}
              onChange={formik.handleChange('tags')}
              onBlur={formik.handleBlur('tags')}
              formikTouched={formik.touched.tags}
              formikError={formik.errors.tags}
            />
            <Button
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

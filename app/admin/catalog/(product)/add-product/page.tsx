'use client';
import { Box, Grid, SimpleGrid } from '@chakra-ui/react';
import FormControl from '../../../../../components/FormControl';
import CustomReactQuill from '../../../../../components/ReactQuill';
import Select from '../../../../../components/Select';
import Upload from '../../../../../views/admin/profile/components/Upload';
import ReactDropzone from '../../../../../components/ReactDropzone';

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
    options: tagsOptions,
  },
];

const mappedColorOptions = colorOptions.map((option) => ({
  ...option,
  colorScheme: option.value,
}));

export default function AddProduct() {
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
        <form action="">
          <FormControl
            formLabel="Product Title"
            name="name"
            isRequired={true}
            type="text"
            placeholder="Enter Product Title"
          />
          <CustomReactQuill
            formLabel="Product Description"
            placeholder="Enter Product Description"
          />
          <FormControl
            formLabel="Enter Product Price"
            name="price"
            isRequired={true}
            type="number"
            defaultValue={0.0}
          />
          <Select
            formLabel="Brand"
            name="brand"
            placeholder="Select Brand"
            options={groupedOptions}
          />
          <Select
            formLabel="Product Category"
            name="tag"
            placeholder="Select Products Category"
            multipleOpt={true}
            options={categoryData}
          />
          <Select
            formLabel="Colors"
            name="color"
            placeholder="Select Colors"
            multipleOpt={true}
            options={mappedColorOptions}
          />
          <FormControl
            formLabel="Enter Product Quantity"
            name="quantity"
            isRequired={true}
            type="number"
            defaultValue={0.0}
          />
          <Select
            formLabel="Tags"
            name="tag"
            placeholder="Select Tags"
            multipleOpt={true}
            options={tagsData}
          />
        </form>
        <ReactDropzone />
      </SimpleGrid>
    </Box>
  );
}

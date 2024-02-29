'use client';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '../../../../../components/FormControl';
import RichTextEditor from '../../../../../components/RichTextEditor';
import Select from '../../../../../components/Select';
import ReactDropzone from '../../../../../components/ReactDropzone';
import {
  capitalizeFirstLetter,
  transformStringToLowerCase,
} from '../../../../../utils/helper';
import { IAddProduct } from '../../../../../types/addProduct';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  getAllBrands,
  resetState,
} from '../../../../../redux/features/brandSlice';
import { getAllProductCategories } from '../../../../../redux/features/productCategorySlice';
import { getAllColors } from '../../../../../redux/features/colorSlice';
import { tagSelect } from '../../../../../utils/constants';
import {
  ISelectProps,
  ISelectColorProps,
} from '../../../../../types/addProduct';

export default function AddProduct() {
  //React States
  const [isProductAdded, setIsProductAdded] = useState<boolean>(false);
  const [productDescription, setProductDescription] = useState<string>(null);
  const [brand, setBrand] = useState<ISelectProps>(null);
  const [category, setCategory] = useState<ISelectProps>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [selectTags, setSelectTags] = useState<string[]>([]);

  //Dispatch
  const dispatch = useAppDispatch();

  //Getting all the required values
  const getValuesForSelection = useCallback(() => {
    dispatch(resetState());
    dispatch(getAllBrands());
    dispatch(getAllProductCategories());
    dispatch(getAllColors());
  }, [dispatch]);

  //Use Effect
  useEffect(() => {
    getValuesForSelection();
  }, [getValuesForSelection]);

  //States from redux
  const { allBrands } = useAppSelector((state) => state.brandReducer);
  const { allProductCategories } = useAppSelector(
    (state) => state.productCategoryReducer,
  );
  const { allColors } = useAppSelector((state) => state.colorReducer);

  //Options for brand select
  const brandOptions = allBrands?.map((option) => ({
    value: transformStringToLowerCase(option.title),
    label: capitalizeFirstLetter(option.title),
  }));

  //Option for category select
  const categoryOptions = allProductCategories?.map((option) => ({
    value: option.title,
    label: capitalizeFirstLetter(option.title),
  }));

  //Option for category select
  const colorOptions = allColors?.map((option) => ({
    value: option.title.toLowerCase(),
    label: capitalizeFirstLetter(option.title),
  }));

  const mappedColorOptions = colorOptions.map((option) => ({
    ...option,
    colorScheme: option.value,
  }));

  //Formik validation
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

  //Various onChange handlers for selection
  const handleBrandSelect = (value: ISelectProps) => {
    setBrand(value);
  };

  const handleCategorySelect = (value: ISelectProps) => {
    setCategory(value);
  };

  const handleColorSelect = (values: ISelectColorProps[]) => {
    const colorValues = values.map((color) => color.value);
    setColors(colorValues);
  };

  const handleTagsSelect = (values: ISelectProps[]) => {
    const tagValues = values.map((tag) => tag.value);
    setSelectTags(tagValues);
  };

  //Formik form submission
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
      setIsProductAdded(true);
    },
  });

  //Checking for any potential formik validation errors
  const hasErrors = Object.keys(formik.errors).length > 0;

  //Assigning values form select component to formik subsequent values
  useEffect(() => {
    formik.values.description = productDescription ? productDescription : '';
    formik.values.brand = brand ? brand?.value : null;
    formik.values.category = category ? category?.value : null;
    formik.values.color = colors ? colors : [];
    formik.values.tags = selectTags ? selectTags : [];
    console.log('formikValues', formik.values);
  }, [
    brand,
    category,
    colors,
    formik.errors,
    formik.touched,
    formik.values,
    productDescription,
    selectTags,
  ]);

  //Rendering the component
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
              options={brandOptions}
              onChange={(value: ISelectProps) => handleBrandSelect(value)}
              onBlur={formik.handleBlur('brand')}
              formikTouched={formik.touched.brand}
              formikError={formik.errors.brand}
            />
            <Select
              formLabel="Select Product Category"
              multipleOpt={false}
              name="category"
              placeholder="Select a product category from options"
              options={categoryOptions}
              onChange={(value: ISelectProps) => handleCategorySelect(value)}
              onBlur={formik.handleBlur('category')}
              formikTouched={formik.touched.category}
              formikError={formik.errors.category}
            />
            <Select
              formLabel="Select Colors"
              multipleOpt={true}
              name="color"
              placeholder="Select at least on color from the options"
              options={mappedColorOptions}
              onChange={(values: ISelectColorProps[]) =>
                handleColorSelect(values)
              }
              onBlur={formik.handleBlur('color')}
              formikTouched={formik.touched.color}
              formikError={formik.errors.color}
            />
            <Select
              formLabel="Select Tags"
              multipleOpt={true}
              name="tags"
              placeholder="Select at least on tag from the options"
              options={tagSelect}
              onChange={(values: ISelectProps[]) => handleTagsSelect(values)}
              onBlur={formik.handleBlur('tags')}
              formikTouched={formik.touched.tags}
              formikError={formik.errors.tags}
            />
            <Button
              isDisabled={hasErrors}
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

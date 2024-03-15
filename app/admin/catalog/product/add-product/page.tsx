'use client';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Text, color } from '@chakra-ui/react';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '../../../../../components/FormControl';
import RichTextEditor from '../../../../../components/RichTextEditor';
import Select from '../../../../../components/Select';
import ReactDropzone from '../../../../../components/ReactDropzone';
import { capitalizeFirstLetter } from '../../../../../utils/helper';
import { IProduct } from '../../../../../types/addProduct';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import { getAllBrands } from '../../../../../redux/features/brandSlice';
import { getAllProductCategories } from '../../../../../redux/features/productCategorySlice';
import { getAllColors } from '../../../../../redux/features/colorSlice';
import {
  createAProduct,
  resetProductState,
} from '../../../../../redux/features/productSlice';
import {
  uploadImages,
  resetUploadState,
} from '../../../../../redux/features/uploadSlice';
import { tagSelect } from '../../../../../utils/constants';
import {
  ISelectProps,
  ISelectColorProps,
} from '../../../../../types/addProduct';

export default function AddProduct() {
  //React States
  const [createdProductId, setCreatedProductId] = useState<string>(null);
  const [productDescription, setProductDescription] = useState<string>(null);
  const [brand, setBrand] = useState<ISelectProps>(null);
  const [category, setCategory] = useState<ISelectProps>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [selectTags, setSelectTags] = useState<string[]>([]);

  //Form Validation errors states
  const [validateDescription, setValidateDescription] =
    useState<boolean>(false);
  const [validateBrand, setValidateBrand] = useState<boolean>(false);
  const [validateCategory, setValidateCategory] = useState<boolean>(false);
  const [validateColor, setValidateColor] = useState<boolean>(false);
  const [validateTag, setValidateTag] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<boolean>(false);

  //Dispatch
  const dispatch = useAppDispatch();

  //States from redux
  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allBrands } = useAppSelector((state) => state.brandReducer);
  const { allProductCategories } = useAppSelector(
    (state) => state.productCategoryReducer,
  );
  const { allColors } = useAppSelector((state) => state.colorReducer);
  const { isLoading } = useAppSelector((state) => state.productReducer);
  const { imageLoading } = useAppSelector((state) => state.uploadReducer);

  //Getting all the required values
  const getAllBrand = useCallback(() => {
    if (!allBrands.length) {
      dispatch(getAllBrands());
    }
  }, [allBrands.length, dispatch]);

  const getProductCategories = useCallback(() => {
    if (!allProductCategories.length) {
      dispatch(getAllProductCategories());
    }
  }, [allProductCategories.length, dispatch]);

  const getAllAllColors = useCallback(() => {
    if (!allColors.length) {
      dispatch(getAllColors());
    }
  }, [allColors.length, dispatch]);

  //Options for brand select
  const brandOptions = allBrands?.map((option) => ({
    value: option.title.toLowerCase().replace(/[\s_-]/g, ''),
    label: capitalizeFirstLetter(option.title),
  }));

  //Option for category select
  const categoryOptions = allProductCategories?.map((option) => ({
    value: option.title,
    label: capitalizeFirstLetter(option.title),
  }));

  //Option for color select
  const colorOptions = allColors?.map((option) => ({
    value: option.title.toLowerCase(),
    label: capitalizeFirstLetter(option.title),
  }));

  const mappedColorOptions = colorOptions?.map((option) => ({
    ...option,
    colorScheme: option.value,
  }));

  //Formik validation
  const schema = yup.object().shape({
    title: yup.string().required("Product's Title is Required"),
    price: yup.number().required("Product's price is required"),
    quantity: yup.number().required("Product's quantity is required"),
  });

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
    onSubmit: async (values: IProduct) => {
      setValidationErrors(false);
      const slug = slugify(values.title, { lower: true });
      const product = {
        ...values,
        brand: brand.value,
        category: category.value,
        color: colors,
        description: productDescription,
        tags: selectTags,
        slug,
      };
      if (
        !product.description.length ||
        !product.brand.length ||
        !product.category.length ||
        !product.color.length
      ) {
        setValidationErrors(true);
        return;
      } else {
        setValidationErrors(false);
        const response = await dispatch(
          createAProduct({ addProductData: product, jwtToken }),
        );
        if (response && response.payload.statusCode === 200) {
          setCreatedProductId(response.payload?.createNewProduct._id);
          toast.success('Product creation successful');
          console.log('createdProductId', createdProductId);
          dispatch(resetProductState());
        } else {
          toast.error('Something went wrong or duplicate title');
        }
        formik.resetForm();
      }
    },
  });

  //Handlers for setting fields states
  const handleDescription = useCallback((content: string) => {
    setProductDescription(content);
  }, []);

  const handleBrandSelect = useCallback((value: ISelectProps) => {
    setBrand(value);
  }, []);

  const handleCategorySelect = useCallback((value: ISelectProps) => {
    setCategory(value);
  }, []);

  const handleColorSelect = useCallback((values: ISelectColorProps[]) => {
    const colorValues = values.map((color) => color.value);
    setColors(colorValues);
  }, []);

  const handleTagsSelect = useCallback((values: ISelectProps[]) => {
    const tagValues = values.map((tag) => tag.value);
    setSelectTags(tagValues);
  }, []);

  //Checking for any potential formik validation errors
  const hasErrors = Object.keys(formik.errors).length > 0;

  //Use Effect
  useEffect(() => {
    getAllBrand();
    getProductCategories();
    getAllAllColors();
  }, [getAllAllColors, getAllBrand, getProductCategories]);

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
        {!createdProductId ? (
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
              onChange={(content: string) => handleDescription(content)}
              setDescription={setProductDescription}
              value={productDescription}
              validationError={validateDescription}
              setValidationError={setValidateDescription}
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
              value={brand?.value}
              validationError={validateBrand}
              setValidationError={setValidateBrand}
              onChange={(value: ISelectProps) => handleBrandSelect(value)}
            />
            <Select
              formLabel="Select Product Category"
              multipleOpt={false}
              name="category"
              placeholder="Select a product category from options"
              options={categoryOptions}
              value={category?.value}
              validationError={validateCategory}
              setValidationError={setValidateCategory}
              onChange={(value: ISelectProps) => handleCategorySelect(value)}
            />
            <Select
              formLabel="Select Colors"
              multipleOpt={true}
              name="color"
              placeholder="Select at least on color from the options"
              options={mappedColorOptions}
              value={colors}
              validationError={validateColor}
              setValidationError={setValidateColor}
              onChange={(values: ISelectColorProps[]) =>
                handleColorSelect(values)
              }
            />
            <Select
              formLabel="Select Tags"
              multipleOpt={true}
              name="tags"
              placeholder="Select at least on tag from the options"
              options={tagSelect}
              value={selectTags}
              validationError={validateTag}
              setValidationError={setValidateTag}
              onChange={(values: ISelectProps[]) => handleTagsSelect(values)}
            />
            {validationErrors && (
              <Text mb="10px" color="red.500" fontSize="1rem">
                All fields are required.
              </Text>
            )}
            <Button
              isDisabled={hasErrors}
              isLoading={isLoading}
              variant="brand"
              fontWeight="500"
              type="submit"
            >
              Add Product
            </Button>
          </form>
        ) : (
          <ReactDropzone
            resetState={resetUploadState}
            uploadImages={uploadImages}
            jwtToken={jwtToken}
            targetId={createdProductId}
            path="product"
            isLoading={imageLoading}
            setTargetId={setCreatedProductId}
          />
        )}
      </SimpleGrid>
    </Box>
  );
}

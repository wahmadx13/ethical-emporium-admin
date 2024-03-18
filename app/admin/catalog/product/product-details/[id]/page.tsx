'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  useColorMode,
  Text,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import FormControl from '../../../../../../components/FormControl';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import { getAllColors } from '../../../../../../redux/features/colorSlice';
import RichTextEditor from '../../../../../../components/RichTextEditor';
import Select from '../../../../../../components/Select';
import ReactDropzone from '../../../../../../components/ReactDropzone';
import { uploadImages } from '../../../../../../redux/features/uploadSlice';
import {
  ISelectColorProps,
  ISelectProps,
} from '../../../../../../types/addProduct';
import { getAllBrands } from '../../../../../../redux/features/brandSlice';
import { getAllProductCategories } from '../../../../../../redux/features/productCategorySlice';
import { capitalizeFirstLetter } from '../../../../../../utils/helper';
import {
  updateAProduct,
  getAProduct,
} from '../../../../../../redux/features/productSlice';
import { tagSelect } from '../../../../../../utils/constants';
import Card from '../../../../../../components/card/Card';
import UpdateDocumentButtons from '../../../../../../components/UpdateDocumentButtons';
import Information from '../../../../../../views/admin/profile/components/Information';
import { FiEdit } from 'react-icons/fi';
import ReactCarousel from '../../../../../../components/ReactCarousel';
import Checkbox from '../../../../../../components/Checkbox';
import {
  IUpdateProductState,
  IEditState,
} from '../../../../../../types/updateStates';

const initialEditState = {
  title: false,
  description: false,
  price: false,
  quantity: false,
  brand: false,
  category: false,
  colors: false,
  tags: false,
  images: false,
};

export default function ProductDetails(props: { params: { id: string } }) {
  const { id } = props.params;
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'navy.700');

  //States from redux
  const { isLoading, product } = useAppSelector(
    (state) => state.productReducer,
  );
  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allBrands } = useAppSelector((state) => state.brandReducer);
  const { allProductCategories } = useAppSelector(
    (state) => state.productCategoryReducer,
  );
  const { allColors } = useAppSelector((state) => state.colorReducer);
  const { imageLoading } = useAppSelector((state) => state.uploadReducer);

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  //React States;
  const [productState, setProductState] = useState<IUpdateProductState>({
    title: product?.title,
    productDescription: product?.description,
    price: product?.price,
    quantity: product?.quantity,
    brand: product?.brand,
    category: product?.category,
    colors: product?.color,
    selectTags: product?.tags,
  });

  const [editState, setEditState] = useState<IEditState>(initialEditState);

  //Dispatch
  const dispatch = useAppDispatch();

  // Get Current Product
  const getProduct = useCallback(() => {
    if (!product) {
      dispatch(getAProduct(id));
    }
  }, [dispatch, id, product]);

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

  //Handlers for setting fields states
  const handleDescription = useCallback((content: string) => {
    setProductState((prevState: IUpdateProductState) => ({
      ...prevState,
      productDescription: content,
    }));
  }, []);

  const handleBrandSelect = useCallback((value: ISelectProps) => {
    const brandValue = value.value;
    setProductState((prevState: IUpdateProductState) => ({
      ...prevState,
      brand: brandValue,
    }));
  }, []);

  const handleCategorySelect = useCallback((value: ISelectProps) => {
    const categoryValue = value.value;
    setProductState((prevState: IUpdateProductState) => ({
      ...prevState,
      category: categoryValue,
    }));
  }, []);

  const handleColorSelect = useCallback((values: ISelectColorProps[]) => {
    console.log('values', values);
    const colorValues = values?.map((color) => color.value);
    setProductState((prevState: IUpdateProductState) => ({
      ...prevState,
      colors: colorValues,
    }));
  }, []);

  const handleTagsSelect = useCallback((values: ISelectProps[]) => {
    const tagValues = values.map((tag) => tag.value);
    setProductState((prevState: IUpdateProductState) => ({
      ...prevState,
      selectTags: tagValues,
    }));
  }, []);

  //Handlers for updating the product's fields
  const handleUpdateTitle = async () => {
    if (product && productState.title === product.title) {
      toast.info("Change product's title before updating");
      return;
    }
    const slug = slugify(productState.title, { lower: true });
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, title: productState.title, slug },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          title: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          title: response.payload?.updateProduct.title,
        }));
        toast.success("Product's title updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's title");
    }
  };

  const handleUpdateDescription = async () => {
    if (
      (product &&
        productState?.productDescription
          ?.replace(/\s+/g, '')
          ?.replace(/\\+/g, '') ===
          product.description.replace(/\s+/g, '')?.replace(/\\+/g, '')) ||
      !productState.productDescription
    ) {
      toast.info("Change product's description before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, description: productState.productDescription },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          description: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          productDescription: response.payload?.updateProduct.description,
        }));
        toast.success("Product's description updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's description");
    }
  };

  const handleUpdatePrice = async () => {
    if (product && productState.price === product.price) {
      toast.info("Change product's price before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, price: productState.price },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          price: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          price: response.payload?.updateProduct.price,
        }));
        toast.success("Product's description updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's description");
    }
  };

  const handleUpdateQuantity = async () => {
    if (product && productState.quantity === product.quantity) {
      toast.info("Change product's quantity before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, price: productState.quantity },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          quantity: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          quantity: response.payload?.updateProduct.quantity,
        }));
        toast.success("Product's quantity updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's quantity");
    }
  };

  const handleUpdateBrand = async () => {
    if (product && productState.brand === product.brand) {
      toast.info("Change product's brand before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, price: productState.price },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          brand: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          brand: response.payload?.updateProduct.brand,
        }));
        toast.success("Product's brand updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's brand");
    }
  };

  const handleUpdateCategory = async () => {
    if (product && productState.category === product.category) {
      toast.info("Change product's category before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, category: productState.category },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          category: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          category: response.payload?.updateProduct.category,
        }));
        toast.success("Product's category updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's category");
    }
  };

  const handleUpdateColors = async () => {
    if (!productState.colors || !productState.colors.length) {
      toast.warning("Cannot update product's colors with empty values");
      return;
    }
    const prevColors = product.color.slice().sort();
    const updatedColors = productState.colors.slice().sort();
    for (let i = 0; i < prevColors.length; i++) {
      if (prevColors[i] === updatedColors[i]) {
        toast.info("Change product's title before updating");
        return;
      }
      break;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, color: productState.colors },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          colors: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          colors: response.payload?.updateProduct.color,
        }));
        toast.success("Product's colors updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's colors");
    }
  };

  const handleUpdateTags = async () => {
    if (!productState.selectTags || !productState.selectTags.length) {
      toast.warning("Cannot update product's tags with empty values");
      return;
    }
    const prevTags = product.tags.slice().sort();
    const updatedTags = productState.selectTags.slice().sort();
    for (let i = 0; i < prevTags.length; i++) {
      if (prevTags[i] === updatedTags[i]) {
        toast.info("Change product's title before updating");
        return;
      }
      break;
    }
    try {
      const response = await dispatch(
        updateAProduct({
          productData: { id, tags: productState.selectTags },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IEditState) => ({
          ...prevState,
          tags: false,
        }));
        setProductState((prevState: IUpdateProductState) => ({
          ...prevState,
          selectTags: response.payload?.updateProduct.tags,
        }));
        toast.success("Product's tags updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating product's tags");
    }
  };

  //Use Effect
  useEffect(() => {
    getAllBrand();
    getProductCategories();
    getAllAllColors();
  }, [getAllAllColors, getAllBrand, getProductCategories]);

  //Getting the current product
  useEffect(() => {
    getProduct();
  }, [getProduct]);

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
        {product && (
          <Card mb={{ base: '0px', '2xl': '20px' }}>
            {editState.title ? (
              <Flex direction="column">
                <FormControl
                  formLabel="Product Title"
                  name="title"
                  type="text"
                  placeholder="Enter Product Title"
                  onChange={(e: any) =>
                    setProductState((prevState: IUpdateProductState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  value={productState?.title}
                />
                <UpdateDocumentButtons
                  name="Product's Title"
                  onClickCancel={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      title: false,
                    }))
                  }
                  isLoading={isLoading}
                  onClickUpdate={handleUpdateTitle}
                />
              </Flex>
            ) : (
              <Flex direction="row" justify="space-between" alignItems="center">
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt="10px"
                  mb="4px"
                >
                  {product.title}
                </Text>
                <Icon
                  as={FiEdit}
                  width="20px"
                  height="20px"
                  color="inherit"
                  cursor="pointer"
                  onClick={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      title: true,
                    }))
                  }
                />
              </Flex>
            )}
            {editState.description ? (
              <Flex direction="column">
                <RichTextEditor
                  formLabel="Product Description"
                  placeholder={product?.description}
                  onChange={(content: string) => handleDescription(content)}
                  setDescription={setProductState}
                  value={productState?.productDescription}
                />
                <UpdateDocumentButtons
                  name="Product's Description"
                  onClickCancel={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      description: false,
                    }))
                  }
                  isLoading={isLoading}
                  onClickUpdate={handleUpdateDescription}
                />
              </Flex>
            ) : (
              <Card bg={bg} marginBottom="1.5rem">
                <Flex
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Text
                    color={textColorSecondary}
                    fontSize="md"
                    me="26px"
                    mb="40px"
                    width="100%"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  <Icon
                    as={FiEdit}
                    width="20px"
                    height="20px"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        description: true,
                      }))
                    }
                  />
                </Flex>
              </Card>
            )}
            <SimpleGrid columns={2} gap="20px" marginBottom="1.5rem">
              {editState.price ? (
                <Flex direction="column">
                  <FormControl
                    formLabel="Enter Product Price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    onChange={(e: any) =>
                      setProductState((prevState: IUpdateProductState) => ({
                        ...prevState,
                        price: e.target.value,
                      }))
                    }
                    value={productState.price}
                    defaultValue={product?.price}
                  />
                  <UpdateDocumentButtons
                    name="Product's Price"
                    onClickCancel={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        price: false,
                      }))
                    }
                    isLoading={isLoading}
                    onClickUpdate={handleUpdatePrice}
                  />
                </Flex>
              ) : (
                <Information
                  boxShadow={cardShadow}
                  title="Price"
                  value={product?.price}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      price: true,
                    }))
                  }
                />
              )}
              {editState.quantity ? (
                <Flex direction="column">
                  <FormControl
                    formLabel="Enter Product Quantity"
                    name="quantity"
                    type="number"
                    placeholder="0.00"
                    onChange={(e: any) =>
                      setProductState((prevState: IUpdateProductState) => ({
                        ...prevState,
                        quantity: e.target.value,
                      }))
                    }
                    value={productState.quantity}
                    defaultValue={product?.quantity}
                  />
                  <UpdateDocumentButtons
                    name="Product's Quantity"
                    onClickCancel={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        quantity: false,
                      }))
                    }
                    isLoading={isLoading}
                    onClickUpdate={handleUpdateQuantity}
                  />
                </Flex>
              ) : (
                <Information
                  boxShadow={cardShadow}
                  title="Quantity"
                  value={product?.quantity}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      quantity: true,
                    }))
                  }
                />
              )}
              {editState.brand ? (
                <Flex direction="column">
                  <Select
                    formLabel="Select Brand"
                    multipleOpt={false}
                    name="brand"
                    placeholder="Select a brand From the options"
                    options={brandOptions}
                    value={product?.brand}
                    onChange={(value: ISelectProps) => handleBrandSelect(value)}
                  />
                  <UpdateDocumentButtons
                    name="Product's Brand"
                    onClickCancel={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        brand: false,
                      }))
                    }
                    isLoading={isLoading}
                    onClickUpdate={handleUpdateBrand}
                  />
                </Flex>
              ) : (
                <Information
                  boxShadow={cardShadow}
                  title="Brand"
                  value={capitalizeFirstLetter(product?.brand)}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      brand: true,
                    }))
                  }
                />
              )}
              {editState.category ? (
                <Flex direction="column">
                  <Select
                    formLabel="Select Category"
                    multipleOpt={false}
                    name="category"
                    placeholder="Select a category From the options"
                    options={categoryOptions}
                    value={product?.category}
                    onChange={(value: ISelectProps) =>
                      handleCategorySelect(value)
                    }
                  />
                  <UpdateDocumentButtons
                    name="Product's Category"
                    onClickCancel={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        category: false,
                      }))
                    }
                    isLoading={isLoading}
                    onClickUpdate={handleUpdateCategory}
                  />
                </Flex>
              ) : (
                <Information
                  boxShadow={cardShadow}
                  title="Category"
                  value={capitalizeFirstLetter(product?.category)}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      category: true,
                    }))
                  }
                />
              )}
              {editState.colors ? (
                <Flex direction="column">
                  <Select
                    formLabel="Select Colors"
                    multipleOpt={true}
                    name="color"
                    placeholder="Select at least one color from the options"
                    options={mappedColorOptions}
                    value={productState.colors}
                    onChange={(values: ISelectColorProps[]) =>
                      handleColorSelect(values)
                    }
                  />
                  <UpdateDocumentButtons
                    name="Product's Color"
                    onClickCancel={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        colors: false,
                      }))
                    }
                    isLoading={isLoading}
                    onClickUpdate={handleUpdateColors}
                  />
                </Flex>
              ) : (
                <Information
                  boxShadow={cardShadow}
                  title="Colors"
                  value={product?.color.map(
                    (col, index) =>
                      capitalizeFirstLetter(col) +
                      (index < product.color.length - 1 ? ', ' : ''),
                  )}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      colors: true,
                    }))
                  }
                />
              )}
              {editState.tags ? (
                <Flex direction="column">
                  <Select
                    formLabel="Select Tags"
                    multipleOpt={true}
                    name="tags"
                    placeholder="Select at least one tag from the options"
                    options={tagSelect}
                    value={productState.selectTags}
                    onChange={(values: ISelectColorProps[]) =>
                      handleTagsSelect(values)
                    }
                  />
                  <UpdateDocumentButtons
                    name="Product's Tag"
                    onClickCancel={() =>
                      setEditState((prevState: IEditState) => ({
                        ...prevState,
                        tags: false,
                      }))
                    }
                    isLoading={isLoading}
                    onClickUpdate={handleUpdateTags}
                  />
                </Flex>
              ) : (
                <Information
                  boxShadow={cardShadow}
                  title="Tags"
                  value={product?.tags.map(
                    (col, index) =>
                      capitalizeFirstLetter(col) +
                      (index < product.tags.length - 1 ? ', ' : ''),
                  )}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      tags: true,
                    }))
                  }
                />
              )}
              <Information
                boxShadow={cardShadow}
                title="Sold"
                value={product.sold}
                editable={false}
              />
              <Information
                boxShadow={cardShadow}
                title="Total Ratings"
                value={product.totalRating}
                editable={false}
              />
            </SimpleGrid>
            {editState.images ? (
              <Flex direction="column">
                <ReactDropzone
                  path="product"
                  targetId={product._id.toString()}
                  jwtToken={jwtToken}
                  uploadImages={uploadImages}
                  isLoading={imageLoading}
                  setEditImage={setEditState}
                />
                <Button
                  marginTop="1rem"
                  alignItems="center"
                  border="1px"
                  borderRadius="1rem"
                  padding="0.5rem"
                  borderColor={colorMode === 'dark' ? '#e5e7eb' : '#9ca3af'}
                  onClick={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      editImages: false,
                    }))
                  }
                >
                  Cancel
                </Button>
              </Flex>
            ) : product.images.length ? (
              <Card bg={bg} marginBottom="1rem">
                <ReactCarousel
                  images={product?.images}
                  edit={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      images: true,
                    }))
                  }
                  path="blog"
                  targetId={id}
                />
              </Card>
            ) : (
              <Card bg={bg} textAlign="center">
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="sm"
                  mt="10px"
                  mb="4px"
                  cursor="pointer"
                  onClick={() =>
                    setEditState((prevState: IEditState) => ({
                      ...prevState,
                      images: true,
                    }))
                  }
                >
                  This Product do not have any images to preview. Want to
                  upload? Click here
                </Text>
              </Card>
            )}
            <Information
              boxShadow={cardShadow}
              title="Reviews"
              ratings={product.ratings}
              editable={false}
              marginTop="1.5rem"
            />
            <Card
              w="100%"
              mb="20px"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              bg={bg}
              marginTop="1.5rem"
            >
              <Checkbox
                label="Add To Featured"
                checked={product.featured}
                onChange={(e) => {
                  dispatch(
                    updateAProduct({
                      productData: { id, featured: e.target.checked },
                      jwtToken,
                    }),
                  );
                }}
              />
              <Checkbox
                label="Add To Trending"
                checked={product.trending}
                onChange={(e) => {
                  dispatch(
                    updateAProduct({
                      productData: { id, trending: e.target.checked },
                      jwtToken,
                    }),
                  );
                }}
              />
              <Checkbox
                label="Add To New Arrival"
                checked={product.newArrival}
                onChange={(e) => {
                  dispatch(
                    updateAProduct({
                      productData: { id, newArrival: e.target.checked },
                      jwtToken,
                    }),
                  );
                }}
              />
            </Card>
          </Card>
        )}
      </SimpleGrid>
    </Box>
  );
}
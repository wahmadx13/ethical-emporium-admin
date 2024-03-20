'use client';
import { useCallback, useEffect } from 'react';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../../../components/card/Card';
import Information from '../../../../../../views/admin/profile/components/Information';
import Checkbox from '../../../../../../components/Checkbox';
import ProjectTitle from '../../../../../../views/admin/components/ProjectTitle';
import ProjectDescription from '../../../../../../views/admin/components/ProjectDescription';
import ProjectCategory from '../../../../../../views/admin/components/ProjectCategory';
import ProjectTags from '../../../../../../views/admin/components/ProjectTags';
import ProductPrice from '../../../../../../views/admin/product/components/ProductPrice';
import ProjectImages from '../../../../../../views/admin/components/ProjectImages';
import ProductQuantity from '../../../../../../views/admin/product/components/ProductQuantity';
import ProjectBrand from '../../../../../../views/admin/product/components/ProductBrand';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import { uploadImages } from '../../../../../../redux/features/uploadSlice';
import { getAllProductCategories } from '../../../../../../redux/features/productCategorySlice';
import {
  updateAProduct,
  getAProduct,
} from '../../../../../../redux/features/productSlice';
import { capitalizeFirstLetter } from '../../../../../../utils/helper';
import { tagSelect } from '../../../../../../utils/constants';
import ProductColors from '../../../../../../views/admin/product/components/ProductColors';

export default function ProductDetails(props: { params: { id: string } }) {
  const { id } = props.params;
  const bg = useColorModeValue('white', 'navy.700');

  //States from redux
  const { isLoading, product } = useAppSelector(
    (state) => state.productReducer,
  );
  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allProductCategories } = useAppSelector(
    (state) => state.productCategoryReducer,
  );
  const { imageLoading } = useAppSelector((state) => state.uploadReducer);

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  //Dispatch
  const dispatch = useAppDispatch();

  // Get Current Product
  const getProduct = useCallback(() => {
    if (!product) {
      dispatch(getAProduct(id));
    }
  }, [dispatch, id, product]);

  //Getting all the required values
  const getProductCategories = useCallback(() => {
    if (!allProductCategories.length) {
      dispatch(getAllProductCategories());
    }
  }, [allProductCategories.length, dispatch]);

  //Option for category select
  const categoryOptions = allProductCategories?.map((option) => ({
    value: option.title,
    label: capitalizeFirstLetter(option.title),
  }));

  //Use Effect
  useEffect(() => {
    getProductCategories();
  }, [getProductCategories]);

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
            <ProjectTitle
              projectThunkHandler={updateAProduct}
              targetId={id}
              jwtToken={jwtToken}
              formLabel="Product Title"
              placeholder="Enter Product Title"
              buttonName="Product's Title"
              isLoading={isLoading}
              projectTitle={product.title}
            />
            <ProjectDescription
              projectThunkHandler={updateAProduct}
              targetId={id}
              jwtToken={jwtToken}
              formLabel="Product Description"
              placeholder={product?.description}
              buttonName="Product's Description"
              isLoading={isLoading}
              projectDescription={product?.description}
            />
            <SimpleGrid columns={2} gap="20px" marginBottom="1.5rem">
              <ProductPrice
                projectThunkHandler={updateAProduct}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Enter Product Price"
                placeholder="0.00"
                buttonName="Product's Price"
                isLoading={isLoading}
                productPrice={product.price}
              />
              <ProductQuantity
                projectThunkHandler={updateAProduct}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Enter Product Quantity"
                placeholder="0.00"
                buttonName="Product's Quantity"
                isLoading={isLoading}
                productQuantity={product.quantity}
              />
              <ProjectBrand
                projectThunkHandler={updateAProduct}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Select Brand"
                placeholder="Select a brand From the options"
                buttonName="Product's Brand"
                isLoading={isLoading}
                projectBrand={product?.brand}
              />
              <ProjectCategory
                projectThunkHandler={updateAProduct}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Select Category"
                placeholder="Select a category From the options"
                buttonName="Product's Category"
                isLoading={isLoading}
                projectCategoryTitle={product?.category}
                categoryOptions={categoryOptions}
              />
              <ProductColors
                projectThunkHandler={updateAProduct}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Select Colors"
                placeholder="Select at least one color from the options"
                buttonName="Product's Colors"
                isLoading={isLoading}
                productColors={product?.color}
              />
              <ProjectTags
                projectThunkHandler={updateAProduct}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Select Tags"
                placeholder="Select at least one tag from the options"
                buttonName="Product's Tag"
                tagsSelect={tagSelect}
                isLoading={isLoading}
                projectTags={product?.tags}
              />
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
            <ProjectImages
              projectThunkHandler={uploadImages}
              targetId={id}
              jwtToken={jwtToken}
              isLoading={imageLoading}
              path="product"
              productImages={product.images}
            />
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
                      projectData: { id, featured: e.target.checked },
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
                      projectData: { id, trending: e.target.checked },
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
                      projectData: { id, newArrival: e.target.checked },
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
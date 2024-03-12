'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, useDisclosure, Grid, GridItem } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import Modal from '../../../../../components/Modal';
import {
  getAllProducts,
  deleteAProduct,
  resetProductState,
} from '../../../../../redux/features/productSlice';
import ItemCard from '../../../../../components/ItemCard';

export default function ProductList() {
  const [productId, setProductId] = useState<Object>(null);
  const [imageIds, setImageIds] = useState<string[]>(null);
  const [productTitle, setProductTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 200) {
      toast.success(message, { toastId: 'product-deleting-success' });
    } else {
      toast.error(message, { toastId: 'product-deleting-error' });
    }
  }, []);

  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allProducts, isLoading, deletedProduct } = useAppSelector(
    (state) => state.productReducer,
  );

  useEffect(() => {
    toastNotification(deletedProduct?.statusCode, deletedProduct?.message);
  }, [deletedProduct?.message, deletedProduct?.statusCode, toastNotification]);

  useEffect(() => {
    if (!allProducts?.length) {
      dispatch(getAllProducts());
    }
  }, [allProducts?.length, dispatch]);

  const handleModalOpen = (id: Object, title: string, assetIds: string[]) => {
    setImageIds(assetIds);
    setProductId(id);
    setProductTitle(title);
    onOpen();
  };

  const handleDeleteProduct = async () => {
    await dispatch(
      deleteAProduct({ product: { id: productId, imageIds }, jwtToken }),
    );
    onClose();
    setImageIds(null);
    setProductId(null);
    setProductTitle(null);
    dispatch(resetProductState());
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} width="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {allProducts
          ? allProducts.map((product) => (
              <GridItem w="100%" key={product._id.toString()}>
                <ItemCard
                  id={product._id}
                  name={product.title}
                  image={product.images[0]?.url}
                  images={product.images}
                  handleModelOpen={handleModalOpen}
                  colors={product.color}
                  brand={product.brand}
                  isProduct={true}
                  totalRating={product.totalRating}
                />
              </GridItem>
            ))
          : ''}
        <Modal
          modalTitle="Delete Product?"
          modalBody={`Are you sure you want to delete product title: ${productTitle}`}
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteProduct}
          isLoading={isLoading}
        />
      </Grid>
    </Box>
  );
}

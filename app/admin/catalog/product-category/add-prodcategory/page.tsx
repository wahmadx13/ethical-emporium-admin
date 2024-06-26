'use client';
import { useCallback } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FormControl from '../../../../../components/FormControl';
import { IAddProductCategory } from '../../../../../types/productCategory';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  createAProductCategory,
  resetState,
} from '../../../../../redux/features/productCategorySlice';

export default function AddProductCategory() {
  const dispatch = useAppDispatch();

  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { isLoading } = useAppSelector((state) => state.productCategoryReducer);

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 304) {
      toast.warning(message, { toastId: 'product-category-adding-warning' });
    } else if (status === 200) {
      toast.success(message, { toastId: 'product-category-adding-success' });
    }
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required('Product Category Name is Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: async (values: IAddProductCategory) => {
      const response = await dispatch(
        createAProductCategory({ productCategoryData: values, jwtToken }),
      );
      try {
        toastNotification(
          response.payload.statusCode,
          response.payload.message,
        );
      } catch (err) {
        toast.error('Something went wrong!', {
          toastId: 'product-category-adding-error',
        });
      }
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
      formik.resetForm();
    },
  });

  const hasErrors = Object.keys(formik.errors).length > 0;

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
        <form action="" onSubmit={formik.handleSubmit}>
          <FormControl
            formLabel="Product Category Title"
            name="title"
            type="text"
            placeholder="Enter Product Category Name"
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
            formikTouched={formik.touched.title}
            formikError={formik.errors.title}
          />
          <Button
            isDisabled={hasErrors}
            isLoading={isLoading}
            variant="brand"
            fontWeight="500"
            type="submit"
          >
            Add Product Category
          </Button>
        </form>
      </SimpleGrid>
    </Box>
  );
}

'use client';
import { useCallback } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FormControl from '../../../../../components/FormControl';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import {
  createBrand,
  resetState,
} from '../../../../../redux/features/brandSlice';
import { IAddBrand } from '../../../../../types/brand';

export default function AddBrand() {
  const dispatch = useAppDispatch();

  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { isLoading } = useAppSelector((state) => state.brandReducer);

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 304) {
      toast.warning(message, { toastId: 'brand-adding-warning' });
    } else if (status === 200) {
      toast.success(message, { toastId: 'brand-adding-success' });
    }
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required('Brand Name is Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: async (values: IAddBrand) => {
      const response = await dispatch(
        createBrand({ brandData: values, jwtToken }),
      );
      try {
        toastNotification(
          response.payload.statusCode,
          response.payload.message,
        );
      } catch (err) {
        toast.error('Something went wrong!', {
          toastId: 'brand-adding-error',
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
            formLabel="Brand Title"
            name="title"
            type="text"
            placeholder="Enter Brand Name"
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
            Add Brand
          </Button>
        </form>
      </SimpleGrid>
    </Box>
  );
}

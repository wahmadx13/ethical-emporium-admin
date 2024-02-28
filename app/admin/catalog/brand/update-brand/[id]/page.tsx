'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, SimpleGrid, useColorMode } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import FormControl from '../../../../../../components/FormControl';
import { IAddBrand } from '../../../../../../types/brand';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import {
  getABrand,
  updateABrand,
  resetState,
} from '../../../../../../redux/features/brandSlice';

export default function AddBrand(props: { params: { id: string } }) {
  const { id } = props.params;
  const [brandTitle, setBrandTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { brand, isLoading, isSuccess } = useAppSelector(
    (state) => state.brandReducer,
  );

  const { colorMode } = useColorMode();

  const toastNotification = useCallback((status: number, message: string) => {
    if (status === 304) {
      toast.warning(message, { toastId: 'brand-updating-warning' });
    } else if (status === 200) {
      toast.success(message, { toastId: 'brand-updating-success' });
    }
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required('Brand Name is Required'),
  });

  const getBrand = useCallback(() => {
    dispatch(getABrand(id));
  }, [dispatch, id]);

  useEffect(() => {
    getBrand();
    setBrandTitle(brand?.title);
  }, [brand?.title, getBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandTitle,
    },
    validationSchema: schema,
    onSubmit: async (values: IAddBrand) => {
      const brandData = {
        ...values,
        id,
      };
      const response = await dispatch(updateABrand({ brandData, jwtToken }));
      try {
        toastNotification(
          response.payload.statusCode,
          response.payload.message,
        );
        dispatch(resetState());
        router.push('/admin/catalog/brand/brand-list');
      } catch (err) {
        toast.error('Something went wrong!', {
          toastId: 'brand-updating-error',
        });
      }
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
          <Box display="flex" alignContent="center" width="fit-content">
            <Link href="/admin/catalog/brand/brand-list">
              <Box
                display="flex"
                alignItems="center"
                border="1px"
                borderRadius="1rem"
                padding="0.5rem"
                width="fit-content"
                borderColor={colorMode === 'dark' ? '#e5e7eb' : '#9ca3af'}
              >
                <MdKeyboardArrowLeft
                  width="20px"
                  height="20px"
                  color="inherit"
                />{' '}
                Back to brands?
              </Box>
            </Link>
            <Button
              isDisabled={hasErrors}
              isLoading={isLoading}
              variant="brand"
              fontWeight="500"
              type="submit"
              marginLeft="0.5rem"
            >
              Edit Brand
            </Button>
          </Box>
        </form>
      </SimpleGrid>
    </Box>
  );
}

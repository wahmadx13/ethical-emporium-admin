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
import { IAddColor } from '../../../../../../types/color';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import {
  getAColor,
  updateAColor,
  resetState,
} from '../../../../../../redux/features/colorSlice';

export default function UpdateColor(props: { params: { id: string } }) {
  const { id } = props.params;
  const [colorTitle, setColorTitle] = useState<string>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { color, isLoading } = useAppSelector((state) => state.colorReducer);

  const { colorMode } = useColorMode();

  const toastNotification = useCallback((status: number, message: string) => {
    if (message === 'DuplicateKey') {
      toast.warning(`Color already exist. Please try adding new one`, {
        toastId: 'color-updating-warning',
      });
    }
    if (status === 200) {
      toast.success(message, {
        toastId: 'color-updating-success',
      });
    }
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required('Color Name is Required'),
  });

  const getColor = useCallback(() => {
    dispatch(getAColor(id));
  }, [dispatch, id]);

  useEffect(() => {
    getColor();
    setColorTitle(color?.title);
  }, [color?.title, getColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorTitle,
    },
    validationSchema: schema,
    onSubmit: async (values: IAddColor) => {
      const colorData = {
        ...values,
        id,
      };
      const response = await dispatch(updateAColor({ colorData, jwtToken }));
      try {
        toastNotification(
          response.payload.statusCode,
          response.payload.message.codeName,
        );
        if (response.payload.statusCode === 200) {
          dispatch(resetState());
          router.push('/admin/catalog/color/color-list');
        }
      } catch (err) {
        toast.error('Something went wrong!', {
          toastId: 'color-updating-error',
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
            formLabel="Color Title"
            name="title"
            type="text"
            placeholder="Enter Color Color"
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
            formikTouched={formik.touched.title}
            formikError={formik.errors.title}
          />
          <Box display="flex" alignContent="center" width="fit-content">
            <Link href="/admin/catalog/color/color-list">
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
                Back to colors?
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
              Edit Color
            </Button>
          </Box>
        </form>
      </SimpleGrid>
    </Box>
  );
}

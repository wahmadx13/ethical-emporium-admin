'use client';
import { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '../../../../../components/FormControl';
import { IAddBrand } from '../../../../../types/brand';

export default function AddBrand() {
  const schema = yup.object().shape({
    title: yup.string().required('Brand Name is Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values: IAddBrand) => {
      console.log('brandValues', values);
    },
  });

  const hasErrors = Object.keys(formik.errors).length > 0;
  useEffect(() => {
    console.log('formikValues', formik.values);
  }, [formik.values]);

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

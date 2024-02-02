'use client';

import React from 'react';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { ILoginProps } from 'types/signin';
import { useAppDispatch } from '../../../redux/hooks';
import { login } from '../../../redux/features/auth';

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email should be valid')
      .required('Email is Required'),
    password: yup.string().required('Password is Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values: ILoginProps) => {
      dispatch(login(values));
    },
  });

  return (
    <DefaultAuthLayout
      illustrationBackground={'/img/auth/ethical-emporium.jpg'}
    >
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: '0px', md: '0px' }}
                type="email"
                placeholder="test@example.com"
                mb="15px"
                fontWeight="500"
                size="lg"
              />
              <Text mb="10px" color="red.500" fontSize="1rem">
                {formik.touched.email && formik.errors.email}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  value={formik.values.password}
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Enter Your Password"
                  mb="15"
                  size="lg"
                  type={show ? 'text' : 'password'}
                  variant="auth"
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Text mb="10px" color="red.500" fontSize="1rem">
                {formik.touched.password && formik.errors.password}
              </Text>
            </FormControl>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <Link href="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </Link>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          ></Flex>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
'use client';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '../../../../../components/FormControl';
import RichTextEditor from '../../../../../components/RichTextEditor';
import Select from '../../../../../components/Select';
import ReactDropzone from '../../../../../components/ReactDropzone';
import { capitalizeFirstLetter } from '../../../../../utils/helper';
import { IBlog } from '../../../../../redux/types/blog';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import { getAllBlogCategories } from '../../../../../redux/features/blogCategorySlice';
import {
  createABlog,
  resetBlogState,
} from '../../../../../redux/features/blogSlice';
import {
  uploadImages,
  resetUploadState,
} from '../../../../../redux/features/uploadSlice';
import { tagSelect } from '../../../../../utils/constants';
import { ISelectProps } from '../../../../../types/addProduct';

export default function AddBlog() {
  //React States
  const [createdBlogId, setCreatedBlogId] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);
  const [category, setCategory] = useState<ISelectProps>(null);
  const [selectTags, setSelectTags] = useState<string[]>([]);

  //Form Validation errors states
  const [validateDescription, setValidateDescription] =
    useState<boolean>(false);
  const [validateCategory, setValidateCategory] = useState<boolean>(false);
  const [validateTag, setValidateTag] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<boolean>(false);

  //Dispatch
  const dispatch = useAppDispatch();

  //States from redux
  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allBlogCategories } = useAppSelector(
    (state) => state.blogCategoryReducer,
  );
  const { isLoading } = useAppSelector((state) => state.blogReducer);
  const { imageLoading } = useAppSelector((state) => state.uploadReducer);

  //Getting all the required values
  const getBlogCategories = useCallback(() => {
    if (!allBlogCategories?.length) {
      dispatch(getAllBlogCategories());
    }
  }, [allBlogCategories?.length, dispatch]);

  //Option for category select
  const categoryOptions = allBlogCategories?.map((option) => ({
    value: option.title,
    label: capitalizeFirstLetter(option.title),
  }));

  //Formik validation
  const schema = yup.object().shape({
    title: yup.string().required("Blog's Title is Required"),
  });

  //Formik form submission
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      tags: [],
    },
    validationSchema: schema,
    onSubmit: async (values: IBlog) => {
      setValidationErrors(false);
      const slug = slugify(values.title, { lower: true });
      const blog = {
        ...values,
        category: category.value,
        description: description,
        tags: selectTags,
        slug,
      };
      if (!blog.description.length || !blog.category.length) {
        setValidationErrors(true);
        return;
      } else {
        setValidationErrors(false);
        const response = await dispatch(
          createABlog({ addBlogData: blog, jwtToken }),
        );
        if (response && response.payload.statusCode === 200) {
          setCreatedBlogId(response.payload?.newBlog._id);
          toast.success('Blog creation successful');
          dispatch(resetBlogState());
        } else {
          toast.error('Something went wrong or duplicate title');
        }
        formik.resetForm();
      }
    },
  });

  //Handlers for setting fields states
  const handleDescription = useCallback((content: string) => {
    setDescription(content);
  }, []);

  const handleCategorySelect = useCallback((value: ISelectProps) => {
    setCategory(value);
  }, []);

  const handleTagsSelect = useCallback((values: ISelectProps[]) => {
    const tagValues = values.map((tag) => tag.value);
    setSelectTags(tagValues);
  }, []);

  //Checking for any potential formik validation errors
  const hasErrors = Object.keys(formik.errors).length > 0;

  //Use Effect
  useEffect(() => {
    getBlogCategories();
  }, [getBlogCategories]);

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
        {!createdBlogId ? (
          <form action="" onSubmit={formik.handleSubmit}>
            <FormControl
              formLabel="Blog Title"
              name="title"
              type="text"
              placeholder="Enter Blog Title"
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              value={formik.values.title}
              formikTouched={formik.touched.title}
              formikError={formik.errors.title}
            />
            <RichTextEditor
              formLabel="Blog Description"
              placeholder="Enter Blog Description"
              onChange={(content: string) => handleDescription(content)}
              setDescription={setDescription}
              value={description}
              validationError={validateDescription}
              setValidationError={setValidateDescription}
            />
            <Select
              formLabel="Select Blog Category"
              multipleOpt={false}
              name="category"
              placeholder="Select a blog category from options"
              options={categoryOptions}
              value={category?.value}
              validationError={validateCategory}
              setValidationError={setValidateCategory}
              onChange={(value: ISelectProps) => handleCategorySelect(value)}
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
              Add Blog
            </Button>
          </form>
        ) : (
          <ReactDropzone
            resetState={resetUploadState}
            uploadImages={uploadImages}
            jwtToken={jwtToken}
            targetId={createdBlogId}
            path="blog"
            isLoading={imageLoading}
            setTargetId={setCreatedBlogId}
          />
        )}
      </SimpleGrid>
    </Box>
  );
}

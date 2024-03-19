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
import { FiEdit } from 'react-icons/fi';
import FormControl from '../../../../../../components/FormControl';
import Select from '../../../../../../components/Select';
import ReactDropzone from '../../../../../../components/ReactDropzone';
import RichTextEditor from '../../../../../../components/RichTextEditor';
import ReactCarousel from '../../../../../../components/ReactCarousel';
import Card from '../../../../../../components/card/Card';
import UpdateDocumentButtons from '../../../../../../components/UpdateDocumentButtons';
import Information from '../../../../../../views/admin/profile/components/Information';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import { uploadImages } from '../../../../../../redux/features/uploadSlice';
import { getAllBlogCategories } from '../../../../../../redux/features//blogCategorySlice';
import {
  updateABlog,
  getABlog,
} from '../../../../../../redux/features/blogSlice';
import { capitalizeFirstLetter } from '../../../../../../utils/helper';
import { tagSelect } from '../../../../../../utils/constants';
import {
  ISelectColorProps,
  ISelectProps,
} from '../../../../../../types/addProduct';
import {
  IUpdateBlogState,
  IBlogEditState,
} from '../../../../../../types/updateStates';

const initialEditState = {
  title: false,
  description: false,
  category: false,
  tags: false,
  images: false,
};

export default function BlogDetails(props: { params: { id: string } }) {
  const { id } = props.params;
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'navy.700');

  //States from redux
  const { isLoading, blog } = useAppSelector((state) => state.blogReducer);
  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allBlogCategories } = useAppSelector(
    (state) => state.blogCategoryReducer,
  );
  const { imageLoading } = useAppSelector((state) => state.uploadReducer);

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );
  //React States;
  const [blogState, setBlogState] = useState<IUpdateBlogState>({
    title: blog?.title,
    category: blog?.category,
    selectTags: blog?.tags,
  });

  const [description, setDescription] = useState<string>(blog?.description);

  const [editState, setEditState] = useState<IBlogEditState>(initialEditState);

  //Dispatch
  const dispatch = useAppDispatch();

  // Get Current Blog
  const getBlog = useCallback(() => {
    if (!blog) {
      dispatch(getABlog(id));
    }
  }, [blog, dispatch, id]);

  //Getting all the required values

  const getBlogCategories = useCallback(() => {
    if (!allBlogCategories.length) {
      dispatch(getAllBlogCategories());
    }
  }, [allBlogCategories.length, dispatch]);

  //Option for category select
  const categoryOptions = allBlogCategories?.map((option) => ({
    value: option.title,
    label: capitalizeFirstLetter(option?.title),
  }));

  //Handlers for setting fields states
  const handleDescription = useCallback((content: string) => {
    setBlogState((prevState: IUpdateBlogState) => ({
      ...prevState,
      description: content,
    }));
  }, []);

  const handleCategorySelect = useCallback((value: ISelectProps) => {
    const categoryValue = value.value;
    setBlogState((prevState: IUpdateBlogState) => ({
      ...prevState,
      category: categoryValue,
    }));
  }, []);

  const handleTagsSelect = useCallback((values: ISelectProps[]) => {
    const tagValues = values.map((tag) => tag.value);
    setBlogState((prevState: IUpdateBlogState) => ({
      ...prevState,
      selectTags: tagValues,
    }));
  }, []);

  //Handlers for updating the blog's fields
  const handleUpdateTitle = async () => {
    if (blog && blogState.title === blog.title) {
      toast.info("Change blog's title before updating");
      return;
    }
    const slug = slugify(blogState.title, { lower: true });
    try {
      const response = await dispatch(
        updateABlog({
          blogData: { id, title: blogState.title, slug },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IBlogEditState) => ({
          ...prevState,
          title: false,
        }));
        setBlogState((prevState: IUpdateBlogState) => ({
          ...prevState,
          title: response.payload?.updateBlog.title,
        }));
        toast.success("Blog's title updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating blog's title");
    }
  };

  const handleUpdateDescription = async () => {
    if (
      (blog &&
        description?.replace(/\s+/g, '')?.replace(/\\+/g, '') ===
          blog.description.replace(/\s+/g, '')?.replace(/\\+/g, '')) ||
      !description
    ) {
      toast.info("Change blog's description before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateABlog({
          blogData: { id, description: description },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IBlogEditState) => ({
          ...prevState,
          description: false,
        }));
        setBlogState((prevState: IUpdateBlogState) => ({
          ...prevState,
          description: response.payload?.updateBlog.description,
        }));
        toast.success("Blog's description updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating blog's description");
    }
  };

  const handleUpdateCategory = async () => {
    if (blog && blogState.category === blog.category) {
      toast.info("Change blog's category before updating");
      return;
    }
    try {
      const response = await dispatch(
        updateABlog({
          blogData: { id, category: blogState.category },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IBlogEditState) => ({
          ...prevState,
          category: false,
        }));
        setBlogState((prevState: IUpdateBlogState) => ({
          ...prevState,
          category: response.payload?.updateBlog.category,
        }));
        toast.success("Blog's category updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating blog's category");
    }
  };

  const handleUpdateTags = async () => {
    if (!blogState.selectTags || !blogState.selectTags.length) {
      toast.warning("Cannot update blog's tags with empty values");
      return;
    }
    const prevTags = blog.tags.slice().sort();
    const updatedTags = blogState.selectTags.slice().sort();
    for (let i = 0; i < prevTags.length; i++) {
      if (prevTags[i] === updatedTags[i]) {
        toast.info("Change blog's title before updating");
        return;
      }
      break;
    }
    try {
      const response = await dispatch(
        updateABlog({
          blogData: { id, tags: blogState.selectTags },
          jwtToken,
        }),
      );
      if (response.payload.statusCode === 200) {
        setEditState((prevState: IBlogEditState) => ({
          ...prevState,
          tags: false,
        }));
        setBlogState((prevState: IUpdateBlogState) => ({
          ...prevState,
          selectTags: response.payload?.updateBlog.tags,
        }));
        toast.success("Blog's tags updated successfully");
      }
    } catch (err) {
      toast.error("Something went wrong while updating blog's tags");
    }
  };

  //Use Effect
  useEffect(() => {
    getBlogCategories();
  }, [getBlogCategories]);

  //Getting the current blog
  useEffect(() => {
    getBlog();
  }, [getBlog]);

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
        {blog && (
          <Card mb={{ base: '0px', '2xl': '20px' }}>
            {editState.title ? (
              <Flex direction="column">
                <FormControl
                  formLabel="Blog Title"
                  name="title"
                  type="text"
                  placeholder="Enter Blog Title"
                  onChange={(e: any) =>
                    setBlogState((prevState: IUpdateBlogState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  value={blogState?.title}
                />
                <UpdateDocumentButtons
                  name="Blog's Title"
                  onClickCancel={() =>
                    setEditState((prevState: IBlogEditState) => ({
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
                  {blog.title}
                </Text>
                <Icon
                  as={FiEdit}
                  width="20px"
                  height="20px"
                  color="inherit"
                  cursor="pointer"
                  onClick={() =>
                    setEditState((prevState: IBlogEditState) => ({
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
                  formLabel="Blog Description"
                  placeholder={blog?.description}
                  onChange={(content: string) => handleDescription(content)}
                  setDescription={setDescription}
                  value={description}
                />
                <UpdateDocumentButtons
                  name="Blog's Description"
                  onClickCancel={() =>
                    setEditState((prevState: IBlogEditState) => ({
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
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                  <Icon
                    as={FiEdit}
                    width="20px"
                    height="20px"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setEditState((prevState: IBlogEditState) => ({
                        ...prevState,
                        description: true,
                      }))
                    }
                  />
                </Flex>
              </Card>
            )}
            <SimpleGrid columns={2} gap="20px" marginBottom="1.5rem">
              {editState.category ? (
                <Flex direction="column">
                  <Select
                    formLabel="Select Category"
                    multipleOpt={false}
                    name="category"
                    placeholder="Select a category From the options"
                    options={categoryOptions}
                    value={blog?.category}
                    onChange={(value: ISelectProps) =>
                      handleCategorySelect(value)
                    }
                  />
                  <UpdateDocumentButtons
                    name="Blog's Category"
                    onClickCancel={() =>
                      setEditState((prevState: IBlogEditState) => ({
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
                  value={capitalizeFirstLetter(blog?.category)}
                  edit={() =>
                    setEditState((prevState: IBlogEditState) => ({
                      ...prevState,
                      category: true,
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
                    value={blogState.selectTags}
                    onChange={(values: ISelectColorProps[]) =>
                      handleTagsSelect(values)
                    }
                  />
                  <UpdateDocumentButtons
                    name="Blog's Tag"
                    onClickCancel={() =>
                      setEditState((prevState: IBlogEditState) => ({
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
                  value={blog?.tags.map(
                    (col, index) =>
                      capitalizeFirstLetter(col) +
                      (index < blog.tags.length - 1 ? ', ' : ''),
                  )}
                  edit={() =>
                    setEditState((prevState: IBlogEditState) => ({
                      ...prevState,
                      tags: true,
                    }))
                  }
                />
              )}
              <Information
                boxShadow={cardShadow}
                title="Author"
                value={blog.author}
                editable={false}
              />
              <Information
                boxShadow={cardShadow}
                title="Likes"
                value={blog.likes.length ? blog.likes.length : 0}
                editable={false}
              />
              <Information
                boxShadow={cardShadow}
                title="Dislikes"
                value={blog.dislikes.length ? blog.dislikes.length : 0}
                editable={false}
              />
              <Information
                boxShadow={cardShadow}
                title="Number Of Views"
                value={blog.numberOfViews}
                editable={false}
              />
            </SimpleGrid>
            {editState.images ? (
              <Flex direction="column">
                <ReactDropzone
                  path="blog"
                  targetId={blog._id.toString()}
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
                    setEditState((prevState: IBlogEditState) => ({
                      ...prevState,
                      images: false,
                    }))
                  }
                >
                  Cancel
                </Button>
              </Flex>
            ) : blog.images.length ? (
              <Card bg={bg} marginBottom="1rem">
                <ReactCarousel
                  images={blog?.images}
                  edit={() =>
                    setEditState((prevState: IBlogEditState) => ({
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
                    setEditState((prevState: IBlogEditState) => ({
                      ...prevState,
                      images: true,
                    }))
                  }
                >
                  This Blog do not have any images to preview. Want to upload?
                  Click here
                </Text>
              </Card>
            )}
          </Card>
        )}
      </SimpleGrid>
    </Box>
  );
}

'use client';
import { useCallback, useEffect } from 'react';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../../../components/card/Card';
import ProjectTitle from '../../../../../../views/admin/components/ProjectTitle';
import ProjectDescription from '../../../../../../views/admin/components/ProjectDescription';
import ProjectCategory from '../../../../../../views/admin/components/ProjectCategory';
import ProjectTags from '../../../../../../views/admin/components/ProjectTags';
import ProjectImages from '../../../../../../views/admin/components/ProjectImages';
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

export default function BlogDetails(props: { params: { id: string } }) {
  const { id } = props.params;

  //States from redux
  const { isLoading, blog } = useAppSelector((state) => state.blogReducer);
  const { jwtToken } = useAppSelector((state) => state.authReducer);
  const { allBlogCategories } = useAppSelector(
    (state) => state.blogCategoryReducer,
  );
  const { imageLoading } = useAppSelector((state) => state.uploadReducer);

  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

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
            <ProjectTitle
              projectThunkHandler={updateABlog}
              targetId={id}
              jwtToken={jwtToken}
              formLabel="Blog Title"
              placeholder="Enter Blog Title"
              buttonName="Blog's Title"
              isLoading={isLoading}
              projectTitle={blog.title}
            />
            <ProjectDescription
              projectThunkHandler={updateABlog}
              targetId={id}
              jwtToken={jwtToken}
              formLabel="Blog Description"
              placeholder={blog?.description}
              buttonName="Blog's Description"
              isLoading={isLoading}
              projectDescription={blog?.description}
            />
            <SimpleGrid columns={2} gap="20px" marginBottom="1.5rem">
              <ProjectCategory
                projectThunkHandler={updateABlog}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Select Category"
                placeholder="Select a category From the options"
                buttonName="Blog's Category"
                isLoading={isLoading}
                projectCategoryTitle={blog?.category}
                categoryOptions={categoryOptions}
              />
              <ProjectTags
                projectThunkHandler={updateABlog}
                targetId={id}
                jwtToken={jwtToken}
                formLabel="Select Tags"
                placeholder="Select at least one tag from the options"
                buttonName="Blog's Tag"
                tagsSelect={tagSelect}
                isLoading={isLoading}
                projectTags={blog?.tags}
              />
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
            <ProjectImages
              projectThunkHandler={uploadImages}
              targetId={id}
              jwtToken={jwtToken}
              isLoading={imageLoading}
              path="blog"
              productImages={blog.images}
            />
          </Card>
        )}
      </SimpleGrid>
    </Box>
  );
}

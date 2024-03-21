'use client';
import { useCallback, useEffect, useState } from 'react';
// Chakra imports
import { Box, Grid, GridItem } from '@chakra-ui/react';

// Custom components
import Banner from '../../../views/admin/profile/components/Banner';
import General from '../../../views/admin/profile/components/General';
import Projects from '../../../views/admin/profile/components/Projects';
import Storage from '../../../views/admin/profile/components/Storage';

// Assets
import banner from '../../../img/auth/banner.png';
import avatar from '../../../img/avatars/avatar4.png';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  getAllProducts,
  IAddProduct,
} from '../../../redux/features/productSlice';
import { getAllBlogs, IAddBlog } from '../../../redux/features/blogSlice';

export default function ProfileOverview() {
  const [recentProducts, setRecentProducts] = useState<IAddProduct[]>(null);
  const [recentBlogs, setRecentBlogs] = useState<IAddBlog[]>(null);
  const { allProducts } = useAppSelector((state) => state.productReducer);
  const { allBlogs } = useAppSelector((state) => state.blogReducer);

  const dispatch = useAppDispatch();

  const getProducts = useCallback(async () => {
    if (!allProducts?.length) {
      await dispatch(getAllProducts());
      allProducts?.sort(
        (prevProduct, nextProduct) =>
          new Date(nextProduct.createdAt).getTime() -
          new Date(prevProduct.createdAt).getTime(),
      );
    }
  }, [allProducts, dispatch]);

  const getBlogs = useCallback(async () => {
    if (!allBlogs?.length) {
      await dispatch(getAllBlogs());
      allBlogs?.sort(
        (prevBlog, nextBlog) =>
          new Date(nextBlog.createdAt).getTime() -
          new Date(prevBlog.createdAt).getTime(),
      );
    }
  }, [allBlogs, dispatch]);

  useEffect(() => {
    getProducts();
    getBlogs();
    if (allProducts?.length) {
      setRecentProducts(allProducts.slice(0, 3));
    }
    if (allBlogs?.length) {
      setRecentBlogs(allBlogs.slice(0, 3));
    }
  }, [allBlogs, allProducts, getBlogs, getProducts]);
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Grid templateColumns="repeat(2, 1fr)" gap={{ base: '20px', xl: '20px' }}>
        <GridItem width="100%" rowSpan={5}>
          <Banner
            banner={banner}
            avatar={avatar}
            job="Product Designer"
            blogs={allBlogs?.length}
            likes={allBlogs?.reduce((accumulator, currentBlog) => {
              return accumulator + currentBlog.likes.length;
            }, 0)}
            dislikes={allBlogs?.reduce((accumulator, currentBlog) => {
              return accumulator + currentBlog.dislikes.length;
            }, 0)}
          />
        </GridItem>
        <GridItem width="100%" rowSpan={5}>
          <Storage used={25.6} total={50} />
        </GridItem>
      </Grid>
      <Grid
        mb="20px"
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1.34fr 1.62fr 1fr',
        }}
        templateRows={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        {recentProducts?.map((product, index) => (
          <Projects
            key={product._id.toString()}
            title="Recently Added Products"
            imgSrc={product.images[0].url}
            link={`/admin/catalog/product/product-details/${product._id.toString()}`}
            projectTitle={product.title}
            index={index + 1}
            name="product"
            description="Here is the list of recently added products. To view the details of each
            product visit the respective detailed view"
            allProjectLink="/admin/catalog/product-list"
          />
        ))}
        <General
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          minH="365px"
          pe="20px"
        />
        {recentBlogs?.map((blog, index) => (
          <Projects
            key={blog._id.toString()}
            title="Recently Added Blogs"
            imgSrc={blog.images[0].url}
            link={`/admin//blogs/blog/blog-details/${blog._id.toString()}`}
            projectTitle={blog.title}
            index={index + 1}
            name="blog"
            description="Here is the list of recently added blogs. To view the details of each
            product visit the respective detailed view"
            allProjectLink="/admin/blogs/blog-list"
          />
        ))}
      </Grid>
    </Box>
  );
}

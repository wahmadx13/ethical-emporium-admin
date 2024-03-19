import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdAddShoppingCart,
  MdFormatListBulleted,
  MdOutlineColorLens,
  MdOutlineFeaturedPlayList,
} from 'react-icons/md';
import { GrCatalog, GrBlog } from 'react-icons/gr';
import { TbCategoryPlus } from 'react-icons/tb';
import { RiListIndefinite } from 'react-icons/ri';
import { SiBrandfolder } from 'react-icons/si';
import { CgList, CgColorBucket } from 'react-icons/cg';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
// import { PiTrademarkLight } from 'react-icons/pi';
// import { RiCoupon3Line, RiCouponLine } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { TbBrandBlogger } from 'react-icons/tb';
import { ImBlog } from 'react-icons/im';
import { IoDuplicateOutline } from 'react-icons/io5';
import { TfiHelpAlt } from 'react-icons/tfi';
import { IRoute } from './types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Catalog',
    layout: '/admin/catalog',
    icon: <Icon as={GrCatalog} width="20px" height="20px" color="inherit" />,
    subRoutes: [
      {
        name: 'Add Product',
        icon: (
          <Icon
            as={MdAddShoppingCart}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/product/add-product',
      },
      {
        name: 'Product List',
        icon: (
          <Icon
            as={MdFormatListBulleted}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/product/product-list',
      },
      {
        name: 'Add Product Category',
        icon: (
          <Icon
            as={TbCategoryPlus}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/product-category/add-prodcategory',
      },
      {
        name: 'Product Category List',
        icon: (
          <Icon
            as={RiListIndefinite}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/product-category/product-category-list',
      },
      {
        name: 'Add Brand',
        icon: (
          <Icon as={SiBrandfolder} width="20px" height="20px" color="inherit" />
        ),
        path: '/brand/add-brand',
      },
      {
        name: 'Brand List',
        icon: <Icon as={CgList} width="20px" height="20px" color="inherit" />,
        path: '/brand/brand-list',
      },
      {
        name: 'Add Color',
        icon: (
          <Icon as={CgColorBucket} width="20px" height="20px" color="inherit" />
        ),
        path: '/color/add-color',
      },
      {
        name: 'Color List',
        icon: (
          <Icon
            as={MdOutlineColorLens}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/color/color-list',
      },
    ],
  },
  {
    name: 'Orders',
    layout: '/admin',
    path: '/orders',
    icon: (
      <Icon
        as={HiOutlineClipboardDocumentList}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
  },
  // {
  //   name: 'Marketing',
  //   layout: '/admin/marketing',
  //   icon: (
  //     <Icon as={PiTrademarkLight} width="20px" height="20px" color="inherit" />
  //   ),
  //   subRoutes: [
  //     {
  //       name: 'Add Coupon',
  //       icon: (
  //         <Icon as={RiCoupon3Line} width="20px" height="20px" color="inherit" />
  //       ),
  //       path: '/add-coupon',
  //     },
  //     {
  //       name: 'Coupon List',
  //       icon: (
  //         <Icon as={RiCouponLine} width="20px" height="20px" color="inherit" />
  //       ),
  //       path: '/coupon-list',
  //     },
  //   ],
  // },
  {
    name: 'Enquiries',
    layout: '/admin',
    path: '/enquiries',
    icon: <Icon as={TfiHelpAlt} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    icon: <Icon as={FaUsers} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Blogs',
    layout: '/admin/blogs',
    icon: <Icon as={GrBlog} width="20px" height="20px" color="inherit" />,
    subRoutes: [
      {
        name: 'Add Blog',
        icon: <Icon as={ImBlog} width="20px" height="20px" color="inherit" />,
        path: '/blog/add-blog',
      },
      {
        name: 'Blog List',
        icon: (
          <Icon
            as={TbBrandBlogger}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/blog/blog-list',
      },
      {
        name: 'Add Blog Category',
        icon: (
          <Icon
            as={IoDuplicateOutline}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/blog-category/add-bcategory',
      },
      {
        name: 'Blog Category List',
        icon: (
          <Icon
            as={MdOutlineFeaturedPlayList}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        path: '/blog-category/blog-category-list',
      },
    ],
  },
];

export default routes;

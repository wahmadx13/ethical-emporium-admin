import { Box, Icon, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { CiTrash } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IReactCarouselProps } from '../../types/reactCarousel';

export default function ReactCarousel(props: IReactCarouselProps) {
  const { images, edit } = props;
  return (
    <Carousel
      showIndicators={false}
      dynamicHeight={false}
      useKeyboardArrows={true}
      showArrows={false}
      autoPlay={true}
      stopOnHover={true}
      emulateTouch={true}
      showThumbs={false}
    >
      {images.map((image) => (
        <Box key={image.asset_id}>
          <Image
            src={image.url}
            alt={`product-image-${image.asset_id}`}
            height={80}
            width={80}
          />
          <Flex direction="row" justify="center" alignItems="center">
            <Icon
              transition="0.2s linear"
              w="50px"
              h="50px"
              as={CiTrash}
              color="brand.500"
              marginTop="1rem"
              cursor="pointer"
            />
            <Icon
              as={FiEdit}
              width="40px"
              height="40px"
              color="inherit"
              marginTop="1rem"
              cursor="pointer"
              onClick={edit}
            />
          </Flex>
        </Box>
      ))}
    </Carousel>
  );
}

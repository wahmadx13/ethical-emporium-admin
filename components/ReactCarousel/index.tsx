'use client';
import { useState } from 'react';
import { Box, Icon, Flex, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { CiTrash } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IReactCarouselProps } from '../../types/reactCarousel';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteImages } from '../../redux/features/uploadSlice';
import Modal from '../Modal';
import { toast } from 'react-toastify';

export default function ReactCarousel(props: IReactCarouselProps) {
  const { images, edit, path, targetId } = props;
  const [imageId, setImageId] = useState<string>(null);
  const dispatch = useAppDispatch();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { imageLoading } = useAppSelector((state) => state.uploadReducer);
  const { jwtToken } = useAppSelector((state) => state.authReducer);

  const handleModalOpen = (id: string) => {
    setImageId(id);
    onOpen();
  };

  const handleImageDelete = async () => {
    try {
      const response = await dispatch(
        deleteImages({ imageId: imageId, path, targetId, jwtToken }),
      );
      console.log('response', response);
      if (response.payload.statusCode === 200) {
        toast.success('Image delete successfully!');
      }
      setImageId(null);
      onClose();
    } catch (err) {
      toast.error("Something went wrong while deleting product's image");
      setImageId(null);
    }
  };

  const handleCancel = () => {
    setImageId(null);
    onClose();
  };

  return (
    <Box>
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
          <Box key={image.public_id}>
            <Image
              src={image.url}
              alt={`product-image-${image.public_id}`}
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
                onClick={() => handleModalOpen(image.public_id)}
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
      <Modal
        modalTitle="Delete Product Image?"
        modalBody="Are you sure you want to delete this image?"
        isOpen={isOpen}
        onClose={handleCancel}
        onDelete={handleImageDelete}
        isLoading={imageLoading}
      />
    </Box>
  );
}

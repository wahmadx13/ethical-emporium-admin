import {
  Button,
  Flex,
  useColorMode,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactDropzone from '../../../components/ReactDropzone';
import Card from '../../../components/card/Card';
import ReactCarousel from '../../../components/ReactCarousel';
import { IProjectImagesProps } from '../types/admin';

export default function ProjectImages(props: IProjectImagesProps) {
  const {
    projectThunkHandler,
    targetId,
    jwtToken,
    path,
    isLoading,
    productImages,
  } = props;
  const [editImages, setEditImages] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const bg = useColorModeValue('white', 'navy.700');
  return (
    <>
      {editImages ? (
        <Flex direction="column">
          <ReactDropzone
            path={path}
            targetId={targetId}
            jwtToken={jwtToken}
            uploadImages={projectThunkHandler}
            isLoading={isLoading}
            setEditImage={setEditImages}
          />
          <Button
            marginTop="1rem"
            alignItems="center"
            border="1px"
            borderRadius="1rem"
            padding="0.5rem"
            borderColor={colorMode === 'dark' ? '#e5e7eb' : '#9ca3af'}
            onClick={() => setEditImages(false)}
          >
            Cancel
          </Button>
        </Flex>
      ) : productImages.length ? (
        <Card bg={bg} marginBottom="1rem">
          <ReactCarousel
            images={productImages}
            edit={() => setEditImages(true)}
            path={path}
            targetId={targetId}
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
            onClick={() => setEditImages(true)}
          >
            This Project do not have any images to preview. Want to upload?
            Click here
          </Text>
        </Card>
      )}
    </>
  );
}

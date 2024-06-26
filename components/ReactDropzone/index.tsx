import { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  Card,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import { MdUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { IReactDropzoneProps } from '../../types/reactDropzone';

export default function ReactDropzone(props: IReactDropzoneProps) {
  const {
    resetState,
    uploadImages,
    jwtToken,
    targetId,
    path,
    isLoading,
    setTargetId,
    setEditImage,
  } = props;
  console.log('targetId', targetId);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [droppedBlobs, setDroppedBlobs] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'white');

  const handleDrop = (acceptedFiles: File[]) => {
    const updatedFiles = [...new Set([...droppedFiles, ...acceptedFiles])];
    setDroppedFiles(updatedFiles);

    const blobUrls = updatedFiles.map((file) => URL.createObjectURL(file));
    setDroppedBlobs(blobUrls);
  };

  const handleUploadFiles = async () => {
    console.log('Dropped files:', droppedFiles);
    const response = await dispatch(
      uploadImages({ imageData: droppedFiles, jwtToken, targetId, path }),
    );
    if (response && response.payload.statusCode === 200) {
      toast.success('Images uploaded successfully!');
      setDroppedFiles([]);
      setDroppedBlobs([]);
      resetState && dispatch(resetState());
      if (setTargetId) {
        setTargetId(null);
      }
      if (setEditImage) {
        setEditImage((prevState: any) => ({
          ...prevState,
          images: false,
        }));
      }
    } else {
      toast.error('Something went wrong. Please try again!');
    }
  };

  const handleImageRemove = (blob: string, index: number) => {
    setDroppedFiles((prevFiles) => [
      ...prevFiles.slice(0, index),
      ...prevFiles.slice(index + 1),
    ]);
    setDroppedBlobs((prevBlobs) => [
      ...prevBlobs.slice(0, index),
      ...prevBlobs.slice(index + 1),
    ]);
  };

  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Dropzone onDrop={handleDrop} multiple>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {droppedBlobs.length > 0 ? (
                <Grid
                  className="display-image"
                  templateColumns="repeat(5, 1fr)"
                  gap={6}
                >
                  {droppedBlobs.map((blob, index) => (
                    <GridItem w="100%" key={index}>
                      <Image
                        src={blob}
                        alt={`image-${index}`}
                        width={100}
                        height={100}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageRemove(blob, index);
                        }}
                      />
                    </GridItem>
                  ))}
                </Grid>
              ) : (
                <Card
                  bg={bg}
                  mb="20px"
                  alignItems="center"
                  p="20px"
                  align="center"
                  justify="center"
                  border="1px dashed"
                  borderColor={borderColor}
                  borderRadius="16px"
                  h="max-content"
                  cursor="pointer"
                  w="100%"
                  me="36px"
                  height="100%"
                >
                  <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
                  <Flex justify="center" mx="auto" mb="12px">
                    <Text fontSize="xl" fontWeight="700" color={brandColor}>
                      Upload Files
                    </Text>
                  </Flex>
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color="secondaryGray.500"
                  >
                    Upload Your product images so customers would have a better
                    idea of what you are selling (PNG, JPG and JPEG files are
                    allowed)
                  </Text>
                </Card>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <Button
        isDisabled={!droppedFiles.length}
        isLoading={isLoading}
        onClick={handleUploadFiles}
        variant="brand"
        fontWeight="500"
      >
        Publish now
      </Button>
    </Box>
  );
}

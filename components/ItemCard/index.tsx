// Chakra imports
import Image from 'next/image';
import Link from 'next/link';
import {
  AvatarGroup,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
// Custom components
import Card from '../card/Card';
import RatingStars from '../RatingStars';
// Assets
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import { CiTrash } from 'react-icons/ci';
import { capitalizeFirstLetter } from '../../utils/helper';
import { IItemCardProps } from '../../types/itemCard';

export default function ItemCard(props: IItemCardProps) {
  const {
    id,
    image,
    name,
    colors,
    brand,
    totalRating,
    images,
    handleModelOpen,
    author,
    likes,
    dislikes,
    url,
  } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBid = useColorModeValue('brand.500', 'white');
  const imagePublicIds: string[] = images?.map((image) => image.public_id);
  return (
    <Card p="20px">
      <Flex direction={{ base: 'column' }} justify="center">
        <Box mb={{ base: '20px', '2xl': '20px' }} position="relative">
          <AspectRatio ratio={7 / 5}>
            <Image
              src={image}
              width={100}
              height={100}
              alt={`${name}-image`}
              style={{ height: '100%', width: '100%' }}
            />
          </AspectRatio>
          <Button
            position="absolute"
            bg="white"
            transition="0.2s ease-in"
            _hover={{ backgroundColor: 'red.500', transform: 'scale(1.1)' }}
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
            minW="36px"
            h="36px"
            onClick={() => handleModelOpen(id, name, imagePublicIds)}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={CiTrash}
              color="brand.500"
            />
          </Button>
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row',
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize={{
                  base: 'xl',
                  md: 'lg',
                  lg: 'lg',
                  xl: 'lg',
                  '2xl': 'md',
                  '3xl': 'lg',
                }}
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                {name}
              </Text>
              <Text
                color="secondaryGray.600"
                fontSize={{
                  base: 'sm',
                }}
                fontWeight="400"
                me="14px"
              >
                {brand
                  ? capitalizeFirstLetter(brand)
                  : capitalizeFirstLetter(author)}
              </Text>
            </Flex>
            {colors ? (
              <AvatarGroup
                color={textColorBid}
                size="sm"
                mt={{
                  base: '0px',
                  md: '10px',
                  lg: '0px',
                  xl: '10px',
                  '2xl': '0px',
                }}
                fontSize="12px"
              >
                {colors.slice(0, 4).map((color, index) => (
                  <Box
                    key={`${color}-${index}`}
                    h={'32px'}
                    w={'32px'}
                    backgroundColor={color}
                    borderRadius="50%"
                  />
                ))}
                {colors.length > 4 && (
                  <Box
                    backgroundColor="#d4d4d8"
                    h={'32px'}
                    w={'32px'}
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color={textColor} fontWeight="700">
                      +{colors.length - 4}
                    </Text>
                  </Box>
                )}
              </AvatarGroup>
            ) : (
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
                flexDirection="row"
                gap="0.2rem"
              >
                <Flex
                  direction="row"
                  justify="space-between"
                  alignContent="center"
                  gap="0.5rem"
                >
                  <Icon
                    transition="0.2s linear"
                    w="20px"
                    h="20px"
                    as={MdOutlineThumbUp}
                    color="brand.500"
                  />
                  <Text
                    color="secondaryGray.600"
                    fontSize={{
                      base: 'sm',
                    }}
                    fontWeight="400"
                    me="14px"
                  >
                    {likes.length ? likes.length : 0}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  justify="space-between"
                  alignContent="center"
                  gap="0.5rem"
                >
                  <Icon
                    transition="0.2s linear"
                    w="20px"
                    h="20px"
                    as={MdOutlineThumbDown}
                    color="brand.500"
                  />
                  <Text
                    color="secondaryGray.600"
                    fontSize={{
                      base: 'sm',
                    }}
                    fontWeight="400"
                    me="14px"
                  >
                    {dislikes.length ? dislikes.length : 0}
                  </Text>
                </Flex>
              </Box>
            )}
          </Flex>
          <Flex
            align={{
              base: 'center',
              md: 'start',
              lg: 'center',
              xl: 'start',
              '2xl': 'center',
            }}
            justify="space-between"
            direction={{
              xl: 'row',
            }}
            mt="25px"
          >
            {totalRating && <RatingStars value={totalRating} isEdit={false} />}
            <Link href={url}>
              <Button
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                px="24px"
                py="5px"
              >
                Details
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

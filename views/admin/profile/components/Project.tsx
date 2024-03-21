// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '../../../../components/card/Card';
import Image from 'next/image';
// Assets
import { MdEdit } from 'react-icons/md';

export default function Project(props: {
  title: string;
  ranking: number | string;
  link: string;
  image: string;
  name: string;
  allLinks: string;
  [x: string]: any;
}) {
  const { title, ranking, link, image, name, allLinks, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const brandColor = useColorModeValue('brand.500', 'white');
  const bg = useColorModeValue('white', 'navy.700');
  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: 'column', md: 'row' }}>
        <Image
          alt=""
          height={80}
          width={80}
          src={image}
          style={{
            height: '80px',
            width: '80px',
            borderRadius: '8px',
            margin: '20px',
          }}
        />
        <Box mt={{ base: '10px', md: '0' }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            {title}
          </Text>
          <Flex>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              {`${name} #${ranking}`} •{' '}
            </Text>
            <Link fontWeight="500" color={brandColor} href={link} fontSize="sm">
              {`See ${name} details`}
            </Link>
            <Link
              fontWeight="500"
              color={brandColor}
              href={allLinks}
              fontSize="sm"
            >
              <Text
                fontWeight="500"
                color={textColorSecondary}
                fontSize="sm"
                me="4px"
              >
                {`See all ${name}s`}
              </Text>
            </Link>
          </Flex>
        </Box>
        <Link
          href={link}
          variant="no-hover"
          me="16px"
          ms="auto"
          p="0px !important"
        >
          <Icon as={MdEdit} color="secondaryGray.500" h="18px" w="18px" />
        </Link>
      </Flex>
    </Card>
  );
}

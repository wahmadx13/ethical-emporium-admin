// Chakra imports
import { Box, Flex, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import Card from '../../../../components/card/Card';
import { useAppSelector } from '../../../../redux/hooks';

export default function Banner(props: {
  banner: any;
  avatar: any;
  job: string;
  blogs: number | string;
  likes: number;
  dislikes: number;
  [x: string]: any;
}) {
  const {
    banner,
    avatar,
    job,
    blogs,
    followers,
    following,
    likes,
    dislikes,
    ...rest
  } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important',
  );
  const { user } = useAppSelector((state) => state.authReducer);
  //Extracting initials from name
  const nameArray = user?.name.split(' ');
  const initials = nameArray?.map((name: string) => name.charAt(0));
  const combinedInitials = initials?.join('');
  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems="center" {...rest}>
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar size="xl" name={user?.name} src={combinedInitials} />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {user?.name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" me="60px" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {blogs}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Blogs
          </Text>
        </Flex>
        <Flex mx="auto" me="60px" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {likes}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Likes
          </Text>
        </Flex>
        <Flex mx="auto" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {dislikes}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Dislikes
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

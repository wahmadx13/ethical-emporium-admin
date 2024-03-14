import { FiEdit } from 'react-icons/fi';
// Chakra imports
import { Box, Text, useColorModeValue, Icon, Flex } from '@chakra-ui/react';
// Custom components
import Card from '../../../../components/card/Card';
import RatingStars from '../../../../components/RatingStars';
import { IInformationProps } from '../../../../types/information';

export default function Information(props: IInformationProps) {
  const { title, value, edit, editable = true, ratings, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  return (
    <Card bg={bg} {...rest}>
      <Flex direction="row" justify="space-between" alignItems="center">
        {title === 'Reviews' ? (
          ratings.map((rating) => (
            <Box key={rating._id}>
              <Text
                fontWeight="500"
                color={textColorSecondary}
                fontSize="sm"
                marginBottom="1rem"
              >
                {rating.comment}
              </Text>
              <RatingStars value={rating.star} isEdit={false} />
              <Text
                color={textColorPrimary}
                fontWeight="500"
                fontSize="md"
                marginTop="1rem"
                marginBottom="1rem"
              >
                {rating._id}
              </Text>
            </Box>
          ))
        ) : (
          <Box>
            <Text fontWeight="500" color={textColorSecondary} fontSize="sm">
              {title}
            </Text>
            <Text color={textColorPrimary} fontWeight="500" fontSize="md">
              {value}
            </Text>
          </Box>
        )}
        {editable && (
          <Icon
            as={FiEdit}
            width="20px"
            height="20px"
            color="inherit"
            cursor="pointer"
            onClick={edit}
          />
        )}
      </Flex>
    </Card>
  );
}

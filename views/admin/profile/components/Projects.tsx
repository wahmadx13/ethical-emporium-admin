// Chakra imports
import { Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '../../../../components/card/Card';
import Project from '../../../../views/admin/profile/components/Project';

export default function Blogs(props: {
  [x: string]: any;
  title: string;
  description: string;
  imgSrc: string;
  projectTitle: string;
  link: string;
  index: number | string;
  name: string;
  allProjectLink: string;
}) {
  const {
    title,
    description,
    imgSrc,
    projectTitle,
    link,
    index,
    name,
    allProjectLink,
    ...rest
  } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        {title}
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        {description}
      </Text>
      <Project
        boxShadow={cardShadow}
        mb="20px"
        image={imgSrc}
        ranking={index}
        link={link}
        name={name}
        title={projectTitle}
        allLinks={allProjectLink}
      />
    </Card>
  );
}

import { useCallback, ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { usePathname } from 'next/navigation';

interface ISingleRouteProps {
  path: string;
  icon: ReactNode;
  name: string;
  showLinks: boolean;
}

export default function SingleRoute(props: ISingleRouteProps) {
  const { path, icon, name, showLinks } = props;
  let activeColor = useColorModeValue('gray.700', 'white');
  let inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600',
  );
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  const pathname = usePathname();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  return (
    <Box>
      <HStack
        spacing={
          (path !== '' || showLinks) && activeRoute(path.toLowerCase())
            ? '22px'
            : '26px'
        }
        py="5px"
        ps="10px"
      >
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Box
            color={
              (path !== '' || showLinks) && activeRoute(path.toLowerCase())
                ? activeIcon
                : textColor
            }
            me="18px"
          >
            {icon}
          </Box>
          <Text
            me="auto"
            color={
              (path !== '' || showLinks) && activeRoute(path.toLowerCase())
                ? activeColor
                : textColor
            }
            fontWeight={
              (path !== '' || showLinks) && activeRoute(path.toLowerCase())
                ? 'bold'
                : 'normal'
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {name}
            {!path && (
              <Icon
                as={showLinks ? IoIosArrowUp : IoIosArrowDown}
                width="20px"
                height="20px"
                color="inherit"
                ml="1rem"
              />
            )}
          </Text>
        </Flex>
        <Box
          h="36px"
          w="4px"
          bg={
            path !== '' && activeRoute(path.toLowerCase())
              ? brandColor
              : 'transparent'
          }
          borderRadius="5px"
        />
      </HStack>
    </Box>
  );
}

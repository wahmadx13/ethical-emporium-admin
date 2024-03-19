'use client';
// Chakra Imports
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdLock } from 'react-icons/md';
import { BsPersonGear } from 'react-icons/bs';
import { SearchBar } from '../../components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from '../../components/sidebar/Sidebar';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import routes from '../../routes';
import { setUser, setJwtToken } from '../../redux/features/authSlice';

export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.authReducer);

  const handleLogOut = async () => {
    try {
      //Clear Cookies
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      //Clear localStorage
      localStorage.clear();

      //Clear SessionStorage
      sessionStorage.clear();
      //Sign out from amplify

      //Reset User and JwtToken to it's initial state
      await signOut();
      dispatch(setUser(null));
      dispatch(setJwtToken(''));

      //Redirect to sig-in page
      router.push('/auth/sign-in');
    } catch (err: unknown) {
      console.log('err in logout', (err as { message: string }).message);
    }
  };

  //Extracting initials from name
  const nameArray = user?.name.split(' ');
  const initials = nameArray?.map((name: string) => name.charAt(0));
  const combinedInitials = initials?.join('');

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="30px"
      />
      <SidebarResponsive routes={routes} />

      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p="0px" style={{ position: 'relative' }}>
          <Box
            _hover={{ cursor: 'pointer' }}
            color="white"
            bg="#11047A"
            w="40px"
            h="40px"
            borderRadius={'50%'}
          />
          <Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
            <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
              {combinedInitials}
            </Text>
          </Center>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {user?.name}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius="8px"
              px="14px"
            >
              <Button
                variant="link"
                bg="transparent"
                fontSize="md"
                color="inherit"
              >
                {
                  <Icon
                    as={BsPersonGear}
                    width="20px"
                    height="20px"
                    color="inherit"
                    marginRight="0.7rem"
                  />
                }{' '}
                Profile Settings
              </Button>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <Button
                variant="link"
                bg="transparent"
                fontSize="md"
                color="red.500"
                onClick={handleLogOut}
              >
                {
                  <Icon
                    as={MdLock}
                    width="20px"
                    height="20px"
                    color="inherit"
                    marginRight="0.7rem"
                  />
                }{' '}
                Log out
              </Button>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import { getCurrentUser } from 'aws-amplify/auth';
import dynamic from 'next/dynamic';

const ScreenLoader = dynamic(() => import('../../components/Loader'), {
  ssr: false,
});

export default function RefreshAuth() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        console.log('User is authenticated');
        router.replace('/admin/dashboard');
      } catch (err) {
        console.log('error in /refresh-auth: ', err);
        console.log('clearing cookies');
        //Get last auth user from cookie
        const userId = document.cookie
          .split('; ')
          .find((row) =>
            row.startsWith(
              `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.LastAuthUser`,
            ),
          )
          ?.split('=')[1];
        //Clear cognito related cookies
        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.LastAuthUser =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.idToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.accessToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.refreshToken =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        document.cookie = `CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.userData =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        console.log('redirecting to signin');
        router.replace('/auth/sign-in');
      }
    };
    console.log('In Refresh Auth');
    checkAuth();
  }, [router]);
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} width="100%">
      <ScreenLoader />
    </Box>
  );
}

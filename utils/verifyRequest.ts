import { headers, cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { redirect } from 'next/navigation';

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.NEXT_USER_POOL_CLIENT_ID,
});

const verifierIdToken = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_USER_POOL_ID,
    tokenUse: "id",
    clientId: process.env.NEXT_USER_POOL_CLIENT_ID,
})

export const verifyRequest = async (): Promise<object> => {

    const userData = headers().get('USER-DATA');
    const jwtToken = headers().get('JWT-TOKEN');

    if (userData && jwtToken) {
        return { data: JSON.parse(userData), jwtToken }
    } else {
        const userId = cookies().get(`CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.LastAuthUser`)?.value;

        const accessToken = cookies().get(`CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.accessToken`)?.value;

        const idToken = cookies().get(`CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.idToken`)?.value

        if (!accessToken || idToken) {
            console.log('Token not present')
            redirect('/auth/sign-in')
        }

        if (accessToken && idToken) {
            await verifier.verify(accessToken);
            const decoded = await verifierIdToken.verify(idToken);
            return { data: decoded, jwtToken: idToken }
        }
        return { data: {}, jwtToken: '' }
    }
}
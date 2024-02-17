import { NextRequest } from 'next/server';
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model"
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { redirect } from 'next/navigation';

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.NEXT_USER_POOL_CLIENT_ID,
})

const verifierIdToken = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_USER_POOL_ID,
    tokenUse: "id",
    clientId: process.env.NEXT_USER_POOL_CLIENT_ID,
})

export const verifyRequestInMiddleware = async (
    request: NextRequest
): Promise<{ data: CognitoIdTokenPayload; jwtToken: string }> => {
    try {
        const userId = request.cookies.get(`CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.LastAuthUser`)?.value;

        const accessToken = request.cookies.get(`CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.accessToken`)?.value;

        const idToken = request.cookies.get(`CognitoIdentityServiceProvider.${process.env.NEXT_USER_POOL_CLIENT_ID}.${userId}.idToken`)?.value;

        if (!accessToken || !idToken) {
            console.log("Tokens not present VerifyRequestMiddleware");
            redirect('/auth/sign-in')
        }

        if (accessToken && idToken) {
            await verifier.verify(accessToken);
            const decoded = await verifierIdToken.verify(idToken);
            return { data: decoded, jwtToken: idToken }
        }
        return { data: null, jwtToken: '' }

    } catch (err) {
        console.log('Error in verifyRequestInMiddleware', err);
        throw new Error('Error in verifyRequestInMiddleware: ' + err);
    }
};
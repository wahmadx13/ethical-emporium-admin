import { NextRequest } from 'next/server';
import { CognitoAccessTokenPayload } from "aws-jwt-verify/jwt-model"


export const verifyRequestInMiddleware = async (
    request: NextRequest
): Promise<{ data: CognitoAccessTokenPayload, jwtToken: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/auth/current-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include'
        });

        if (response.ok) {
            const resp = await response.json();

            return { data: resp.accessToken.payload, jwtToken: resp.refreshToken }
        }
    } catch (err) {
        console.log('Error in verifyRequestInMiddleware', err);
        console.log('Error in verifyRequestInMiddleware', err);
        throw new Error('Error in verifyRequestInMiddleware: ' + err);
    }
};
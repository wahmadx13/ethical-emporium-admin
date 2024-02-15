import { Amplify } from 'aws-amplify';

export const amplifyInit = () => {
    Amplify.configure({
        Auth: {
            Cognito: {
                //  Amazon Cognito User Pool ID
                userPoolId: process.env.NEXT_USER_POOL_ID,
                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolClientId: process.env.NEXT_USER_POOL_CLIENT_ID,
                // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
                identityPoolId: process.env.NEXT_USER_POOL_IDENTITY_POOL_ID,
                // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
                // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
                signUpVerificationMethod: 'code', // 'code' | 'link'
            },
        },
    });
}
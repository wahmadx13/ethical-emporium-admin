import { ILoginProps } from '../../../types/signin';
import { signIn, type SignInInput } from 'aws-amplify/auth'
import { ICognitoSignInResult } from '../../../types/signin';

const loginAdmin = async (adminCredentials: ILoginProps): Promise<ICognitoSignInResult | string> => {
    const { email, password } = adminCredentials
    try {
        const { isSignedIn, nextStep } = await signIn({ username: email, password });
        console.log('isSignedIn', isSignedIn)
        console.log('nextStep', nextStep)
        return { isSignedIn, nextStep }
        if (isSignedIn) {

        }
    } catch (err) {
        return `The following error occurred during the process: ${err}`
    }

}

const authServices = { loginAdmin }
export default authServices
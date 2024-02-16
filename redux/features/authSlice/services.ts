import { signIn, type SignInInput } from 'aws-amplify/auth'
import { ICognitoSignInResult } from '../../../types/signin';

const loginAdmin = async ({ username, password }: SignInInput): Promise<ICognitoSignInResult | string> => {
    try {
        const { isSignedIn } = await signIn({ username, password });
        return { isSignedIn }
    } catch (err) {
        return `The following error occurred during the process: ${err}`
    }

}

const authServices = { loginAdmin }
export default authServices
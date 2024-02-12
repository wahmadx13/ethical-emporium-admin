import { ILoginProps } from '../../../types/signin';

interface ISigninResponse {
    status: number;
    message: string;
    name: string;
    phoneNumber: string;
    refreshToken: string;
}

const loginAdmin = async (adminCredentials: ILoginProps): Promise<ISigninResponse | string> => {
    const { email, password } = adminCredentials
    const body = JSON.stringify({ email, password });

    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_BASE_URL}/auth/login-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body,
            credentials: 'include'
        });

        if (response.ok) {
            const resp = await response.json();
            return resp;
        } else {
            console.error('Failed to login:', response.statusText);
            return `$Failed to login: ${response.statusText}`
        }
    } catch (err) {
        return `Signin error: ${err}`
    }

}

const authServices = { loginAdmin }
export default authServices
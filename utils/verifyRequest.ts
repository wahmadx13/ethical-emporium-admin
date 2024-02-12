import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const verifyRequest = async (): Promise<object> => {
    const userData = headers().get('USER-DATA');
    const jwtToken = headers().get('JWT-TOKEN');

    if (userData && jwtToken) {
        return { data: JSON.parse(userData), jwtToken }
    } else {
        const userId = headers().get('USER-ID');
        const username = headers().get('USERNAME')
        if (!userId || username) {
            redirect('/auth/sign-in')
        }
        return { data: null, jwtToken: null }
    }
}
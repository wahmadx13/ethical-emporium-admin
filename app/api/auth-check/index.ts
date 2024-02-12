import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { verifyRequest } from "../../../utils/verifyRequest";

export async function GET() {
    try {
        const { data: user, jwtToken }: { [key: string]: any } = await verifyRequest()
        if (!user) {
            redirect('/auth/sign-in')
        }
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}
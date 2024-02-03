import { NextResponse, NextRequest } from "next/server";
import axios from 'axios'
import { base_url } from "../../../../utils/constants";

export async function POST(req: NextRequest) {

    if (req.method !== 'POST') {
        NextResponse.json({ error: 'Method not allowed' }, { status: 205 })
    }
    const body = await req.json();
    const { email, password } = body;
    try {
        const response = await axios.post(`${base_url}user/login-admin`, { email: email, password: password })
        console.log("signin response", response)
        if (response.status === 200) {
            return NextResponse.json({ data: response.data }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Something went wrong', }, { status: 500 })
        }
    } catch (err) {
        return NextResponse.json({ message: err })
    }
} 
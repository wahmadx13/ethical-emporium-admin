import { NextResponse, NextRequest } from "next/server";
import axios from 'axios'
import { base_url } from "../../../../utils/constants";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        NextResponse.json({ error: "Method not allowed" }, { status: 205 })
    }

    try {
        const response = await axios.get(`${base_url}user/current-user`)
        if (response.status === 200) {
            return NextResponse.json({ data: response.data }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'Something went wrong', }, { status: 500 })
        }
    } catch (err) {
        return NextResponse.json({ message: err })
    }
} 
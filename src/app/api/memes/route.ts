import { NextRequest, NextResponse } from "next/server"

import memes from '@/app/data/database'

export const GET = async () => NextResponse.json(memes)

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	memes.unshift(body)

	return NextResponse.json(memes)
}
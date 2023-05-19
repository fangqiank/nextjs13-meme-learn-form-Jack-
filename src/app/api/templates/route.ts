import { NextResponse } from "next/server"

import memeTemplates from '@/app/data/memeTemplate'

export const GET = async () => NextResponse.json(memeTemplates)
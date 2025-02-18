import { NextRequest, NextResponse } from "next/server";

export type RequestController = (req: NextRequest) => Promise<NextResponse>;

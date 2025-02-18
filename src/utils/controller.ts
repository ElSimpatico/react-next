import { NextRequest, NextResponse } from "next/server";

import { RequestController } from "@/types/RequestController";

export function apiController(
    controller: RequestController,
): RequestController {
    return async (req: NextRequest) => {
        try {
            return await controller(req);
        } catch (error) {
            console.error("API Error Controller:", error);
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 },
            );
        }
    };
}

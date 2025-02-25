import { NextRequest, NextResponse } from "next/server";

import { JSONResponse } from "@/interfaces/Response";
import { RequestController } from "@/types/RequestController";

import { CustomError } from "./error";

export function apiController(
    controller: RequestController,
): RequestController {
    return async (req: NextRequest) => {
        try {
            return await controller(req);
        } catch (err) {
            console.error("API Error Controller:", (err as Error).message);
            if (err instanceof CustomError) {
                return NextResponse.json<JSONResponse<null>>(
                    {
                        data: null,
                        error: {
                            id: err.id,
                            message: err.message,
                        },
                    },
                    { status: err.code },
                );
            }
            return NextResponse.json<JSONResponse<null>>(
                {
                    data: null,
                    error: {
                        id: "error_internal_server",
                        message: "Internal server error",
                    },
                },
                { status: 500 },
            );
        }
    };
}

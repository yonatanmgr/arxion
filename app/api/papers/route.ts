import { NextRequest, NextResponse } from "next/server";
import papersApi from "./papersApi";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get("ids")?.split(",");

  if (!ids) {
    return {
      status: 400,
      json: {
        error: "ids parameter is required",
      },
    };
  }

  if (ids.length > 5) {
    return {
      status: 413,
      json: {
        error: "id list is too long",
      },
    };
  }

  const response = await papersApi.enrichByArxivId(ids);

  if (response) {
    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return {
      status: 404,
      json: {
        error: "Not found",
      },
    };
  }
};

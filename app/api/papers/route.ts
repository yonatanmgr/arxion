import { NextRequest, NextResponse } from "next/server";
import papersApi from "./papersApi";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get("ids")?.split(",");

  if (!ids) {
    return NextResponse.json(
      {
        error: "ids parameter is required",
      },
      {
        status: 400,
      },
    );
  }

  if (ids.length > 5) {
    return NextResponse.json(
      {
        error: "too many ids",
      },
      {
        status: 413,
      },
    );
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
    return NextResponse.error();
  }
};

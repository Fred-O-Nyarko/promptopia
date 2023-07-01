import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");
    return NextResponse.json(prompts, {
      status: 200,
    });
  } catch (err) {
    console.log("=> error getting prompts: ", err);
    return NextResponse.json(err, {
      status: 500,
    });
  }
};

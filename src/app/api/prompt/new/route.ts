import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { prompt, tag, userId } = await req.json();
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return NextResponse.json(newPrompt, {
      status: 201,
    });
  } catch (err) {
    console.log("=> error creating post: ", err);
    return NextResponse.json(err, {
      status: 500,
    });
  }
};

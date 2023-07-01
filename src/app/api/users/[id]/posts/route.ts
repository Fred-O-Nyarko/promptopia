import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

interface RequestParams {
  params: {
    id: string;
  };
}

export const GET = async (_request: Request, { params }: RequestParams) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

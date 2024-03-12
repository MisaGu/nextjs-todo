import { createComment } from "@lib/services";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();
  const taskId = formData.get("taskId");
  const content = formData.get("content");

  if (!taskId || !content) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const response = await createComment(taskId.toString(), content.toString());

  return Response.json(response, { status: 200 });
}

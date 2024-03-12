import { updateTaskTitle } from "@lib/services";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const title = formData.get("title");

  if (!id || !title) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const response = await updateTaskTitle(id.toString(), title.toString());

  return Response.json(response, { status: 200 });
}

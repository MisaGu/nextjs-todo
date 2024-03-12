import { updateTaskDescription } from "@lib/services";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const description = formData.get("description");

  if (!id || !description) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const response = await updateTaskDescription(
    id.toString(),
    description.toString()
  );

  return Response.json(response, { status: 200 });
}

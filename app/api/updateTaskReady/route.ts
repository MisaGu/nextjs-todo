import { updateTaskReady } from "@lib/services";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const ready = formData.get("ready");

  if (!id || !ready) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const response = await updateTaskReady(id.toString(), ready === "true");

  return Response.json(response, { status: 200 });
}

import { fetchTask } from "@lib/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const response = await fetchTask(id.toString());

  return Response.json(response, { status: 200 });
}
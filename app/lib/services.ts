import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { CategoriesData, Category, Task, TaskData } from "@lib/interfaces";

export async function fetchCategories() {
  noStore();
  try {
    const data = await sql<CategoriesData>`
			SELECT 
				c.id,
				c.name,
				c.slug,
				COALESCE(
						json_agg(
								json_build_object(
										'id', t.id,
										'title', t.title,
										'description', t.description,
										'createdAt', t.createdAt,
										'ready', t.ready,
										'comment_count', (
												SELECT COUNT(*)
												FROM comments co
												WHERE co.taskId = t.id
										)
								)
						),
						'[]'::json
				) AS tasks
			FROM 
					categories c
			LEFT JOIN 
					tasks t ON c.id = t.categoryId
			GROUP BY 
					c.id, c.name, c.slug;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Categories data.");
  }
}

export async function fetchTask(taskId: string) {
  noStore();
  try {
    const data = await sql<TaskData>`
			SELECT 
				t.id,
				t.title,
				t.description,
				t.createdAt,
				t.ready,
				COALESCE(
						(
								SELECT json_agg(json_build_object(
										'id', co.id,
										'content', co.content,
										'createdAt', co.createdAt
								))
								FROM comments co
								WHERE co.taskId = t.id
						),
						'[]'::json
				) AS comments
			FROM 
					tasks t
			LEFT JOIN 
					comments co ON t.id = co.taskId
			WHERE 
					t.id = ${taskId}
			GROUP BY 
					t.id, t.title, t.description, t.createdAt;
		`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Comments data.");
  }
}

export async function creteCategory(name: string, slug?: string) {
  const _s = slug || name.toLowerCase().replace(/\s/g, "-");

  noStore();
  try {
    const data = await sql<Category>`
			INSERT INTO categories (name, slug)
			SELECT ${name}, ${_s}
			WHERE NOT EXISTS (
					SELECT 1
					FROM categories
					WHERE name = ${name}
			)
			RETURNING *;
		`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create Category.");
  }
}

export async function createTask(
  categoryId: string,
  title: string,
  description: string
) {
  noStore();
  try {
    const data = await sql<Task>`
			INSERT INTO tasks (categoryId, title, description) VALUES (${categoryId}, ${title}, ${description}) RETURNING *;
		`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create Task.");
  }
}

export async function createComment(taskId: string, content: string) {
  noStore();
  try {
    const data = await sql<Comment>`
			INSERT INTO comments (taskId, content) VALUES (${taskId}, ${content}) RETURNING *;
		`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create Comment.");
  }
}

export async function updateTaskReady(taskId: string, ready: boolean) {
  noStore();
  try {
    const data = await sql<TaskData>`
		UPDATE tasks t
		SET ready = ${ready}
		FROM (
			SELECT 
				json_agg(json_build_object(
					'id', co.id,
					'content', co.content,
					'createdAt', co.createdAt
				)) AS comments
			FROM comments co
			WHERE co.taskId = ${taskId}
		) c
		WHERE t.id = ${taskId}
		RETURNING 
			t.id,
			t.title,
			t.description,
			t.createdAt,
			t.ready,
			c.comments;
	`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update Task.");
  }
}

export async function updateTaskTitle(taskId: string, title: string) {
  noStore();
  try {
    const data = await sql<TaskData>`
		UPDATE tasks t
		SET title = ${title}
		FROM (
			SELECT 
				json_agg(json_build_object(
					'id', co.id,
					'content', co.content,
					'createdAt', co.createdAt
				)) AS comments
			FROM comments co
			WHERE co.taskId = ${taskId}
		) c
		WHERE t.id = ${taskId}
		RETURNING 
			t.id,
			t.title,
			t.description,
			t.createdAt,
			t.ready,
			c.comments;
	`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update Task.");
  }
}

export async function updateTaskDescription(
  taskId: string,
  description: string
) {
  noStore();
  try {
    const data = await sql<TaskData>`
		UPDATE tasks t
		SET description = ${description}
		FROM (
			SELECT 
				json_agg(json_build_object(
					'id', co.id,
					'content', co.content,
					'createdAt', co.createdAt
				)) AS comments
			FROM comments co
			WHERE co.taskId = ${taskId}
		) c
		WHERE t.id = ${taskId}
		RETURNING 
			t.id,
			t.title,
			t.description,
			t.createdAt,
			t.ready,
			c.comments;
	`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update Task.");
  }
}

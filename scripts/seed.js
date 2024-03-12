const { db } = require('@vercel/postgres');
const {
  categories,
  tasks,
  comments
} = require('./placeholder-data.js');

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    await client.sql`DROP TABLE IF EXISTS categories CASCADE;`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS categories (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(35) NOT NULL,
            slug VARCHAR(35) NOT NULL
        );
      `;

    console.log(`Created "categories" table`);

    // Insert data into the "categories" table
    const insertedCategories = await Promise.all(
      categories.map(async (user) => {
        return client.sql`
            INSERT INTO categories (id, name, slug)
            VALUES (${user.id}, ${user.name}, ${user.slug})
            ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
}

async function seedTasks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`DROP TABLE IF EXISTS tasks CASCADE;`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                categoryId UUID REFERENCES categories(id),
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ready BOOLEAN DEFAULT FALSE
            );
        `;

    console.log(`Created "tasks" table`);

    // Insert data into the "tasks" table
    const insertedTasks = await Promise.all(
      tasks.map(async (task) => {
        return client.sql`
                INSERT INTO tasks (id, categoryId, title, description, createdAt)
                VALUES (${task.id}, ${task.categoryId}, ${task.title}, ${task.description}, ${task.createdAt})
                ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${insertedTasks.length} tasks`);

    return {
      createTable,
      tasks: insertedTasks,
    };
  } catch (error) {
    console.error("Error seeding tasks:", error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    await client.sql`DROP TABLE IF EXISTS comments CASCADE;`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS comments (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                taskId UUID REFERENCES tasks(id),
                content TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

    console.log(`Created "comments" table`);

    // Insert data into the "comments" table
    const insertedComments = await Promise.all(
      comments.map(async (comment) => {
        return client.sql`
                INSERT INTO comments (id, taskId, content, createdAt)
                VALUES (${comment.id}, ${comment.taskId}, ${comment.content}, ${comment.createdAt})
                ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${insertedComments.length} comments`);

    return {
      createTable,
      comments: insertedComments,
    };
  } catch (error) {
    console.error("Error seeding comments:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await seedCategories(client);
    await seedTasks(client);
    await seedComments(client);
  } catch (error) {
    console.error(
      "An error occurred while attempting to seed the database:",
      error
    );
  } finally {
    await db.end();
  }

  await db.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

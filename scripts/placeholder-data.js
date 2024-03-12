const categories = [
  {
    id: "3958dc9e-712f-3547-85e9-fec4b6a6442a",
    name: "Todo",
    slug: "todo",
  },
  {
    id: "3958dc9e-742f-9846-85e9-fec4b6a6442a",
    name: "Progress",
    slug: "progress",
  },
  {
    id: "3958dc9e-712f-1564-85e9-fec4b6a6442a",
    name: "Done",
    slug: "done",
  },
];

const tasks = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    categoryId: categories[2].id,
    title: "Create a new design",
    description: "Create a new design for the app",
    createdAt: "2021-08-01T12:00:00Z",
    order: 0,
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    categoryId: categories[1].id,
    title: "Implement the design",
    description: "Implement the new design for the app",
    createdAt: "2021-08-01T12:00:00Z",
    order: 0,
  },
  {
    id: "3958dc9e-712f-4859-85e9-fec4b6a6442a",
    categoryId: categories[0].id,
    title: "Test the design",
    description: "Test the new design for the app",
    createdAt: "2021-08-01T12:00:00Z",
    order: 0,
  },
];

const comments = [
  {
    id: "3958dc9e-712f-9687-85e9-fec4b6a6442a",
    taskId: tasks[0].id,
    content: "This is a comment",
    createdAt: "2021-08-01T12:00:00Z",
  },
  {
    id: "3958dc9e-742f-8279-85e9-fec4b6a6442a",
    taskId: tasks[0].id,
    content: "This is another comment",
    createdAt: "2021-08-01T12:00:00Z",
  },
];

module.exports = {
  categories,
  tasks,
  comments,
};
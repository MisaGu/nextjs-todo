export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Task = {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  createdAt: string;
  ready: boolean;
};

export type TaskComment = {
  id: string;
  taskId: string;
  content: string;
  createdAt: string;
};

export type CategoriesData = Category & {
  tasks: (Task & {
    comment_count: number;
  })[];
};

export type TaskData = Task & {
  comments: TaskComment[];
};

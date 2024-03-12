import { TaskComment, TaskData } from "@lib/interfaces";

export function updateTaskReadyAPI(
  taskId: string,
  ready: boolean,
  callback: (data: TaskData) => void
) {
  return fetch("/api/updateTaskReady", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id: taskId,
      ready: String(ready),
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(data);
      });
    }
  });
}

export function updateTaskTitleAPI(
  taskId: string,
  title: string,
  callback: (data: TaskData) => void
) {
  return fetch("/api/updateTaskTitle", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id: taskId,
      title: title,
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(data);
      });
    }
  });
}

export function updateTaskDescriptionAPI(
  taskId: string,
  description: string,
  callback: (data: TaskData) => void
) {
  return fetch("/api/updateTaskDescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id: taskId,
      description: description,
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(data);
      });
    }
  });
}

export function fetchTaskAPI(
  taskId: string,
  callback: (data: TaskData) => void
) {
  return fetch(`/api/fetchTask?id=${taskId}`, {
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(data);
      });
    }
  });
}

export function createCommentAPI(
  taskId: string,
  content: string,
  callback: (data: TaskComment) => void
) {
  return fetch("/api/createTaskComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      taskId: taskId,
      content: content,
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(data);
      });
    }
  });
}

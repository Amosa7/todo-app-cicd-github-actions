// Getting all required elements
const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

// Load todos from the server on page load
document.addEventListener("DOMContentLoaded", () => {
  loadTodosFromServer();
});

// We will call this function while adding, deleting, and checking-unchecking the task
function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  // If tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

// Add task while we put value in text area and press enter
inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();

  // If enter button is clicked and inputed value length is greater than 0
  if (e.key === "Enter" && inputVal.length > 0) {
    
    // Make an AJAX request to add the task to the server
    addTaskToServer(inputVal);
  }
});

// Checking and unchecking the checkbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = !checkbox.checked;
  e.classList.toggle("pending");
  // Make an AJAX request to update the task status on the server
  updateTaskOnServer(e.dataset.id, checkbox.checked);
  allTasks();
}

// Deleting task while we click on the delete icon
function deleteTask(e) {
  // Make an AJAX request to delete the task from the server
  deleteTaskOnServer(e.dataset.id);
  e.parentElement.remove();
  allTasks();
}

// Deleting all the tasks while we click on the clear button
clearButton.addEventListener("click", () => {
  // Make an AJAX request to delete all tasks from the server
  deleteAllTasksOnServer();
  todoLists.innerHTML = "";
  allTasks();
});

// Save todos to the server
function addTaskToServer(task) {
  fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      return response.json();
    })
    .then(() => loadTodosFromServer())
    .catch((error) => console.error("Error adding task:", error));
}

// Load todos from the server
function loadTodosFromServer() {
  fetch("/api/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      todoLists.innerHTML = "";
      tasks.forEach((task) => {
        let liTag = `<li class="list ${task.status ? "completed" : "pending"}" data-id="${task._id}" onclick="handleStatus(this)">
          <input type="checkbox" ${task.status ? "checked" : ""} />
          <span class="task">${task.task}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)" data-id="${task._id}"></i>
        </li>`;
        todoLists.insertAdjacentHTML("beforeend", liTag);
      });
      allTasks();
    });
}

// Update task status on the server
function updateTaskOnServer(id, status) {
  fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
    })
    .catch((error) => console.error("Error updating task status:", error));
}

// Delete task from the server
function deleteTaskOnServer(id) {
  fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    })
    .catch((error) => console.error("Error deleting task:", error));
}

// Delete all tasks from the server
function deleteAllTasksOnServer() {
  fetch("/api/tasks", {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete all tasks");
      }
    })
    .catch((error) => console.error("Error deleting all tasks:", error));
}

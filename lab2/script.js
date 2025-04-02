"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeTodoApp();
});

function initializeTodoApp() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", () => handleAddTask(taskInput, taskList));
}

function handleAddTask(inputElement, listElement) {
    const errorMessage = document.getElementById("errorMessage");
    const taskText = inputElement.value.trim();

    if (!taskText) {
        inputElement.classList.add("input-error");
        errorMessage.hidden = false;
        return;
    }

    inputElement.classList.remove("input-error");
    errorMessage.hidden = true;

    const taskItem = createTaskItem(taskText);
    listElement.appendChild(taskItem);
    inputElement.value = "";
}

function createTaskItem(text) {
    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", () => toggleTaskCompletion(li));

    return li;
}

function toggleTaskCompletion(taskElement) {
    taskElement.classList.toggle("done");

    if (taskElement.classList.contains("done")) {
        const completedAt = formatDate(new Date());
        taskElement.setAttribute("data-completed", `✓ ${completedAt}`);
    } else {
        taskElement.removeAttribute("data-completed");
    }
}

function formatDate(date) {
    return date.toLocaleString("pl-PL");
}

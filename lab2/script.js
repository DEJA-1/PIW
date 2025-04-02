"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeTodoApp();
});

let lastDeleted = null;
let elementToDelete = null;

function initializeTodoApp() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const errorMessage = document.getElementById("errorMessage");
    const listSelector = document.getElementById("listSelector");

    addTaskBtn.addEventListener("click", () =>
        handleAddTask(taskInput, errorMessage, listSelector)
    );

    taskInput.addEventListener("input", () =>
        clearValidationError(taskInput, errorMessage)
    );

    initializeListToggles();
    initializeModal();
    initializeUndoShortcut();
}

function initializeListToggles() {
    const headers = document.querySelectorAll(".list-header");

    headers.forEach(header => {
        header.style.cursor = "pointer";
        header.addEventListener("click", () => {
            const list = header.nextElementSibling;
            list.classList.toggle("collapsed");
        });
    });
}

function handleAddTask(inputElement, errorMessage, listSelector) {
    const taskText = inputElement.value.trim();
    if (!taskText) {
        showValidationError(inputElement, errorMessage);
        return;
    }

    const selectedListId = listSelector.value;
    const selectedList = document.querySelector(`.todo-list[data-id="${selectedListId}"] ul`);

    const taskItem = createTaskItem(taskText);
    selectedList.appendChild(taskItem);

    inputElement.value = "";
    clearValidationError(inputElement, errorMessage);
    updateListCounts();
}

function createTaskItem(text) {
    const li = document.createElement("li");

    const content = document.createElement("div");
    content.classList.add("task-content");

    const textNode = document.createElement("span");
    textNode.textContent = text;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date");

    content.appendChild(textNode);
    content.appendChild(dateSpan);

    const deleteBtn = createDeleteButton(() => openModal(li, text));

    li.appendChild(content);
    li.appendChild(deleteBtn);

    li.addEventListener("click", () => toggleTaskCompletion(li));

    return li;
}

function toggleTaskCompletion(taskElement) {
    const content = taskElement.querySelector(".task-content");
    const dateSpan = content.querySelector(".date");

    taskElement.classList.toggle("done");

    if (taskElement.classList.contains("done")) {
        const completedAt = formatDate(new Date());
        dateSpan.textContent = `✓ ${completedAt}`;
        content.classList.add("expanded");
    } else {
        dateSpan.textContent = "";
        content.classList.remove("expanded");
    }
}

function formatDate(date) {
    return date.toLocaleString("pl-PL");
}

function createDeleteButton(onClick) {
    const btn = document.createElement("button");
    btn.textContent = "✖";
    btn.classList.add("delete-btn");
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        onClick();
    });
    return btn;
}

function showValidationError(inputElement, messageElement) {
    inputElement.classList.add("input-error");
    messageElement.hidden = false;
}

function clearValidationError(inputElement, messageElement) {
    inputElement.classList.remove("input-error");
    messageElement.hidden = true;
}

function updateListCounts() {
    const allLists = document.querySelectorAll(".todo-list");

    allLists.forEach(list => {
        const ul = list.querySelector("ul");
        const count = ul.querySelectorAll("li").length;

        const header = list.querySelector(".list-header");
        const countSpan = header.querySelector(".count");

        if (countSpan) {
            countSpan.textContent = `(${count})`;
        }
    });
}

let modalElement, modalText

function initializeModal() {
    modalElement = document.getElementById("modal");
    modalText = document.getElementById("modalText");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

    confirmDeleteBtn.addEventListener("click", confirmDeletion);
    cancelDeleteBtn.addEventListener("click", closeModal);
}

function openModal(taskElement, taskText) {
    elementToDelete = taskElement;
    modalText.textContent = `Zadanie: "${taskText}"`;
    modalElement.style.display = "flex";
}

function closeModal() {
    modalElement.style.display = "none";
    elementToDelete = null;
}

function confirmDeletion() {
    if (elementToDelete) {
        lastDeleted = {
            element: elementToDelete,
            parent: elementToDelete.parentElement,
            nextSibling: elementToDelete.nextElementSibling
        };
        elementToDelete.remove();
    }
    updateListCounts();
    closeModal();
}

function initializeUndoShortcut() {
    document.addEventListener("keydown", (e) => {
        const isUndo = (e.ctrlKey || e.metaKey) && e.key === "z";
        if (isUndo) {
            e.preventDefault();
            undoLastDeletion();
        }
    });
}

function undoLastDeletion() {
    if (lastDeleted && lastDeleted.element) {
        const { element, parent, nextSibling } = lastDeleted;
        if (nextSibling) {
            parent.insertBefore(element, nextSibling);
        } else {
            parent.appendChild(element);
        }
        lastDeleted = null;
        updateListCounts();
    }
}
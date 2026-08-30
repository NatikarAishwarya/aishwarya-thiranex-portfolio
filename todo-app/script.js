"use strict";

/*
==================================================
    AISHWARYA'S TO-DO LIST APPLICATION
==================================================

Features:

✓ Create
✓ Read
✓ Update
✓ Delete
✓ Complete / Uncomplete
✓ All / Active / Completed filtering
✓ LocalStorage
✓ Dynamic DOM elements
✓ Event Delegation
✓ Statistics
✓ Keyboard support
✓ Accessible controls
*/


/* ==================================================
   DOM ELEMENTS
================================================== */

const todoForm =
    document.getElementById("todoForm");

const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");

const totalCount =
    document.getElementById("totalCount");

const activeCount =
    document.getElementById("activeCount");

const completedCount =
    document.getElementById("completedCount");

const filterButtons =
    document.querySelectorAll(".filter");


/* ==================================================
   APPLICATION STATE
================================================== */

let tasks = loadTasks();

let currentFilter = "all";


/* ==================================================
   LOCAL STORAGE
================================================== */

function loadTasks() {

    try {

        const savedTasks =
            localStorage.getItem(
                "aishwaryaTodos"
            );


        if (savedTasks) {

            const parsedTasks =
                JSON.parse(savedTasks);


            if (Array.isArray(parsedTasks)) {

                return parsedTasks;

            }

        }


        return [];

    }

    catch (error) {

        console.error(
            "Unable to load saved tasks:",
            error
        );

        return [];

    }

}


function saveTasks() {

    try {

        localStorage.setItem(
            "aishwaryaTodos",
            JSON.stringify(tasks)
        );

    }

    catch (error) {

        console.error(
            "Unable to save tasks:",
            error
        );

    }

}


/* ==================================================
   CREATE
================================================== */

function addTask(text) {

    const cleanText =
        text.trim();


    if (!cleanText) {

        return;

    }


    const task = {

        id: Date.now(),

        text: cleanText,

        completed: false,

        createdAt:
            new Date().toISOString()

    };


    tasks.unshift(task);


    saveTasks();


    renderTasks();

}


/* ==================================================
   FILTER TASKS
================================================== */

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(
            task => !task.completed
        );

    }


    if (currentFilter === "completed") {

        return tasks.filter(
            task => task.completed
        );

    }


    return tasks;

}


/* ==================================================
   READ / RENDER
================================================== */

function renderTasks() {

    taskList.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    filteredTasks.forEach(task => {

        const taskElement =
            createTaskElement(task);


        taskList.appendChild(
            taskElement
        );

    });


    updateStatistics();


    updateEmptyMessage(
        filteredTasks
    );

}


/* ==================================================
   CREATE DYNAMIC DOM ELEMENT
================================================== */

function createTaskElement(task) {

    const li =
        document.createElement("li");


    li.className = "task";


    li.dataset.id = task.id;


    if (task.completed) {

        li.classList.add("completed");

    }


    /* ==============================================
       CHECKBOX
    ============================================== */

    const checkbox =
        document.createElement("input");


    checkbox.type = "checkbox";


    checkbox.className =
        "complete-checkbox";


    checkbox.checked =
        task.completed;


    checkbox.setAttribute(
        "aria-label",
        task.completed
            ? "Mark task as active"
            : "Mark task as completed"
    );


    /* ==============================================
       TASK TEXT
    ============================================== */

    const taskText =
        document.createElement("span");


    taskText.className =
        "task-text";


    taskText.textContent =
        task.text;


    /* ==============================================
       ACTIONS CONTAINER
    ============================================== */

    const actions =
        document.createElement("div");


    actions.className =
        "task-actions";


    /* ==============================================
       COMPLETE BUTTON
    ============================================== */

    const completeButton =
        document.createElement("button");


    completeButton.type = "button";


    completeButton.className =
        "complete-btn";


    completeButton.dataset.action =
        "complete";


    completeButton.textContent = "✓";


    completeButton.setAttribute(
        "aria-label",
        task.completed
            ? "Mark task as active"
            : "Mark task as completed"
    );


    /* ==============================================
       EDIT BUTTON
    ============================================== */

    const editButton =
        document.createElement("button");


    editButton.type = "button";


    editButton.className =
        "edit-btn";


    editButton.dataset.action =
        "edit";


    editButton.textContent = "Edit";


    editButton.setAttribute(
        "aria-label",
        "Edit task"
    );


    /* ==============================================
       DELETE BUTTON
    ============================================== */

    const deleteButton =
        document.createElement("button");


    deleteButton.type = "button";


    deleteButton.className =
        "delete-btn";


    deleteButton.dataset.action =
        "delete";


    deleteButton.textContent = "Delete";


    deleteButton.setAttribute(
        "aria-label",
        "Delete task"
    );


    /* ==============================================
       BUILD ELEMENT
    ============================================== */

    actions.appendChild(
        completeButton
    );


    actions.appendChild(
        editButton
    );


    actions.appendChild(
        deleteButton
    );


    li.appendChild(
        checkbox
    );


    li.appendChild(
        taskText
    );


    li.appendChild(
        actions
    );


    return li;

}


/* ==================================================
   UPDATE / TOGGLE
================================================== */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {

                ...task,

                completed:
                    !task.completed

            };

        }


        return task;

    });


    saveTasks();


    renderTasks();

}


/* ==================================================
   EDIT TASK
================================================== */

function editTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) {

        return;

    }


    const newText =
        prompt(
            "Edit your task:",
            task.text
        );


    if (newText === null) {

        return;

    }


    const cleanText =
        newText.trim();


    if (!cleanText) {

        alert(
            "Task cannot be empty."
        );

        return;

    }


    task.text =
        cleanText;


    saveTasks();


    renderTasks();

}


/* ==================================================
   DELETE TASK
================================================== */

function deleteTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${task.text}"?`
        );


    if (!confirmed) {

        return;

    }


    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();


    renderTasks();

}


/* ==================================================
   STATISTICS
================================================== */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        total - completed;


    totalCount.textContent =
        total;


    activeCount.textContent =
        active;


    completedCount.textContent =
        completed;

}


/* ==================================================
   EMPTY STATE
================================================== */

function updateEmptyMessage(
    filteredTasks
) {

    const heading =
        emptyMessage.querySelector("h2");


    const paragraph =
        emptyMessage.querySelector("p");


    if (filteredTasks.length === 0) {

        emptyMessage.style.display =
            "block";


        if (tasks.length === 0) {

            heading.textContent =
                "No tasks yet.";


            paragraph.textContent =
                "Add a task above to get started.";

        }

        else if (
            currentFilter === "active"
        ) {

            heading.textContent =
                "No active tasks.";


            paragraph.textContent =
                "All your tasks are completed.";

        }

        else if (
            currentFilter === "completed"
        ) {

            heading.textContent =
                "No completed tasks.";


            paragraph.textContent =
                "Complete a task to see it here.";

        }

    }

    else {

        emptyMessage.style.display =
            "none";

    }

}


/* ==================================================
   FORM SUBMISSION
================================================== */

todoForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const text =
            taskInput.value.trim();


        if (!text) {

            alert(
                "Please enter a task."
            );


            taskInput.focus();


            return;

        }


        addTask(text);


        taskInput.value = "";


        taskInput.focus();

    }
);


/* ==================================================
   EVENT DELEGATION
================================================== */

taskList.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {

            return;

        }


        const taskElement =
            button.closest(".task");


        if (!taskElement) {

            return;

        }


        const id =
            Number(
                taskElement.dataset.id
            );


        const action =
            button.dataset.action;


        if (action === "complete") {

            toggleTask(id);

        }


        else if (action === "edit") {

            editTask(id);

        }


        else if (action === "delete") {

            deleteTask(id);

        }

    }
);


/* ==================================================
   CHECKBOX EVENT
================================================== */

taskList.addEventListener(
    "change",
    function(event) {

        if (
            !event.target.classList.contains(
                "complete-checkbox"
            )
        ) {

            return;

        }


        const taskElement =
            event.target.closest(".task");


        if (!taskElement) {

            return;

        }


        const id =
            Number(
                taskElement.dataset.id
            );


        toggleTask(id);

    }
);


/* ==================================================
   FILTER BUTTONS
================================================== */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function() {

                currentFilter =
                    button.dataset.filter;


                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                renderTasks();

            }
        );

    }
);


/* ==================================================
   INITIAL RENDER
================================================== */

renderTasks();
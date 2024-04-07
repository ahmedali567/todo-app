#! /usr/bin/env node 
import inquirer from "inquirer";

let todos = [];
let condition = true;

while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: `todo`,
            type: `input`,
            message: "What do you want to add in your todo list?"
        },
        {
            name: `addMore`,
            type: `confirm`,
            message: "Do you want to add any other task in your todos?",
            default: "true"
        }
    ]);

    let todo = addTask.todo.trim(); 

    if (todo !== "") { 
        todos.push(todo);
    }

    condition = addTask.addMore;
    console.log(todos);
}

// Print each item in the todos array on a single line
console.log("Your todo list:");
for (let i = 0; i < todos.length; i++) {
    console.log(todos[i]);
}

if (todos.length > 0) {
    let actionChoice = await inquirer.prompt([
        {
            name: 'actions',
            type: 'list',
            message: 'What task you want to perform?',
            choices: ['Add more tasks', 'Remove a task', 'Rename a task', 'Exit']
        }
    ]);

    switch (actionChoice.actions) {
        case 'Add more tasks':
            break;
        case 'Remove a task':
            if (todos.length > 0) {
                let removeChoice = await inquirer.prompt([
                    {
                        name: 'remove',
                        type: 'list',
                        message: 'Select the thing you want to remove',
                        choices: todos.concat(['Cancel'])
                    }
                ]);

                if (removeChoice.remove !== 'Cancel') {
                    todos = todos.filter(item => item !== removeChoice.remove);
                    console.log('Item removed:', removeChoice.remove);
                    console.log('Updated todo list:', todos);
                } else {
                    console.log('No item are removed.');
                }
            } else {
                console.log('No items left to remove.');
            }
            break;
        case 'Rename a task':
            if (todos.length > 0) {
                let renameChoice = await inquirer.prompt([
                    {
                        name: 'rename',
                        type: 'list',
                        message: 'Select the thing you want to rename:',
                        choices: todos.concat(['Cancel'])
                    }
                ]);

                if (renameChoice.rename !== 'Cancel') {
                    let newName = await inquirer.prompt({
                        name: 'newName',
                        type: 'input',
                        message: 'Enter the new name:'
                    });

                    let index = todos.indexOf(renameChoice.rename);
                    todos[index] = newName.newName.trim();
                    console.log('renamed successfully.');
                    console.log('Updated todos are:', todos);
                } else {
                    console.log('No task is renamed.');
                }
            } else {
                console.log('No tasks to rename.');
            }
            break;
        case 'Exit':
            console.log('Exit');
            break;
    }
} else {
    console.log('No items are available to manage.');
}
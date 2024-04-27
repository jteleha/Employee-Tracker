const inquirer = require('inquirer');
const db = require('./db');

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                default:
                    console.log('Invalid action selected.');
                    startApp();
            }
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            startApp();
        });
}

function viewAllEmployees() {
    db.getAllEmployees()
        .then((employees) => {
            console.table(employees);
            startApp();
        })
        .catch((error) => {
            console.log('An error occurred while retrieving employees:', error);
            startApp();
        });
}

function viewAllDepartments() {
    db.getAllDepartments()
        .then((departments) => {
            console.table(departments);
            startApp();
        })
        .catch((error) => {
            console.log('An error occurred while retrieving departments:', error);
            startApp();
        });
}

function viewAllRoles() {
    db.getAllRoles()
        .then((roles) => {
            console.table(roles);
            startApp();
        })
        .catch((error) => {
            console.log('An error occurred while retrieving roles:', error);
            startApp();
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            },
        ])
        .then((answers) => {
            db.addDepartment(answers.name)
                .then(() => {
                    console.log('Department added successfully.');
                    startApp();
                })
                .catch((error) => {
                    console.log('An error occurred while adding a department:', error);
                    startApp();
                });
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            startApp();
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for this role:',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for this role:',
            },
        ])
        .then((answers) => {
            db.addRole(answers.title, answers.salary, answers.departmentId)
                .then(() => {
                    console.log('Role added successfully.');
                    startApp();
                })
                .catch((error) => {
                    console.log('An error occurred while adding a role:', error);
                    startApp();
                });
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            startApp();
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'number',
                name: 'roleId',
                message: 'Enter the role ID for this employee:',
            },
            {
                type: 'number',
                name: 'managerId',
                message: 'Enter the manager ID for this employee:',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for this employee:',
            },
        ])
        .then((answers) => {
            db.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId, answers.salary)
                .then(() => {
                    console.log('Employee added successfully.');
                    startApp();
                })
                .catch((error) => {
                    console.log('An error occurred while adding an employee:', error);
                    startApp();
                });
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            startApp();
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'employeeId',
                message: 'Enter the ID of the employee to update:',
            },
            {
                type: 'number',
                name: 'newRoleId',
                message: 'Enter the new role ID for this employee:',
            },
        ])
        .then((answers) => {
            db.updateEmployeeRole(answers.employeeId, answers.newRoleId)
                .then(() => {
                    console.log('Employee role updated successfully.');
                    startApp();
                })
                .catch((error) => {
                    console.log('An error occurred while updating an employee role:', error);
                    startApp();
                });
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            startApp();
        });
}

startApp();
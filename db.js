const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
});

function getAllEmployees() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getAllDepartments() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getAllRoles() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function addDepartment(name) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, [name], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function addRole(title, salary, departmentId) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(sql, [title, salary, departmentId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function addEmployee(firstName, lastName, roleId, departmentId, salary, managerId) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, department_id, salary, manager_id) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [firstName, lastName, roleId, departmentId, salary, managerId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function updateEmployeeRole(employeeId, roleId) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        db.query(sql, [roleId, employeeId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getAllEmployees,
    getAllDepartments,
    getAllRoles,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
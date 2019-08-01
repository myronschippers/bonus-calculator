const employees = [
    {
        name: 'Atticus',
        employeeNumber: '2405',
        annualSalary: '47000',
        reviewRating: 3
    },
    {
        name: 'Jem',
        employeeNumber: '62347',
        annualSalary: '63500',
        reviewRating: 4
    },
    {
        name: 'Scout',
        employeeNumber: '6243',
        annualSalary: '74750',
        reviewRating: 5
    },
    {
        name: 'Robert',
        employeeNumber: '26835',
        annualSalary: '66000',
        reviewRating: 1
    },
    {
        name: 'Mayella',
        employeeNumber: '89068',
        annualSalary: '35000',
        reviewRating: 1
    }
];

// YOU SHOULD NOT NEED TO CHANGE ANYTHING ABOVE THIS POINT

// Take small steps! Don't write a for loop and two functions that do all of the calculations right away.
// This problem is massive! Break the problem down. Use the debugger.
// What is the fewest lines of code I can write and test to get just a little closer?

// This is not a race. Everyone on your team should understand what is happening.
// Ask questions when you don't.

/**
 * Loops through a list of employees creating a new list of alternate employee data.
 * @param {array} employeeList
 * @returns {array}
 */
function processAllEmployees(employeeList) {
    const newEmployeeList = [];

    for (let i = 0; i < employeeList.length; i++) {
        const employeeInfo = employeeList[i];
        const newEmployee = convertEmployeeData(employeeInfo); // convert data structure

        newEmployeeList.push(newEmployee);
    }

    return newEmployeeList;
}

/**
 * Convert the original employee structure into a new data object with a different structure.
 * @param {object} originEmployee
 * @returns {object}
 */
function convertEmployeeData(originEmployee) {
    // values will need to be calculated and mapped to the new object
    const name = originEmployee.name;
    const bonusPct = calculateBonusPct(originEmployee);
    const totalBonus = calculateBonusAmount(originEmployee, bonusPct);
    const totalCompensation = calculateTotalCompensation(originEmployee, totalBonus);

    const newEmployeeData = {
        name,
        bonusPercentage: `${bonusPct}%`, // person readable
        totalCompensation, // machine readable
        totalBonus, // machine readable
    };

    return newEmployeeData;
}

/**
 * Calculate the bonus percentage as a whole number between 0 and 100.
 * @param {object} employeeData
 * @returns {number}
 */
function calculateBonusPct(employeeData) {
    let finalBonusPct = 0;
    const rating = employeeData.reviewRating;

    // adjust bonus based on the employee's rating
    switch (rating) {
        case 5:
            finalBonusPct = 10;
            break;
        case 4:
            finalBonusPct = 6;
            break;
        case 3:
            finalBonusPct = 4;
            break;
        default:
            finalBonusPct = 0;
            break;
    }

    // adjust the bonus based on ID length (4 digits long additional 5%)
    const employeeId = employeeData.employeeNumber;

    if (employeeId.length == 4) {
        finalBonusPct += 5;
    }

    // income over $65,000 adjust bonus down 1%
    const salaryNumber = parseInt(employeeData.annualSalary);

    if (salaryNumber > 65000) {
        finalBonusPct -= 1;
    }

    // no bonus above 13% or below 0%
    const maxBonus = 13;
    const minBonus = 0;

    if (finalBonusPct > maxBonus) {
        finalBonusPct = maxBonus;
    } else if (finalBonusPct < minBonus) {
        finalBonusPct = minBonus
    }

    return finalBonusPct;
}

/**
 * Calculate the ammount to be added to the employee annual salary given the bonus percentage provided.
 * @param {object} employeeData
 * @param {number} bonusPctInt
 * @returns {number}
 */
function calculateBonusAmount(employeeData, bonusPctInt) {
    const annualSalary = parseInt(employeeData.annualSalary);
    const bonusPct = bonusPctInt / 100;
    const finalBonusAmount = annualSalary * bonusPct;

    return finalBonusAmount;
}

/**
 * Calculate the final adjusted salary with the totalBonus added to the employee's current salary.
 * @param {object} employeeData
 * @param {number} totalBonus
 * @returns {number}
 */
function calculateTotalCompensation(employeeData, totalBonus) {
    const salaryNumber = parseInt(employeeData.annualSalary);
    const finalCompensation = salaryNumber + totalBonus;

    return finalCompensation;
}

console.table(employees);
// console.log('New Employee Data: ');
// console.table(processAllEmployees(employees));

//
// STRETCH GOALS
// Rendering employee data to the DOM
// ----------------------------------------------------------------

$(document).ready(onReady);

function onReady() {
    const $btnCalcBonuses = $('.js-calcBonuses');

    $btnCalcBonuses.on('click', clickCalcBonus);
    renderEmployees();
}

function clickCalcBonus(event) {
    console.log('clicked Calculate Bonus');
    const employeeBonusList = processAllEmployees(employees);

    renderEmpoyeeBonuses(employeeBonusList);
}

/**
 * Uses the `employees` array to render the original employee data to the DOM.
 * table selector - `.js-employees`
 */
function renderEmployees() {
    const $employeesTable = $('.js-employees');

    $employeesTable.empty();

    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const rowElement = `<tr>
            <td class="cleanTable-cell">${employee.name}</td>
            <td class="cleanTable-cell">${employee.employeeNumber}</td>
            <td class="cleanTable-cell">${employee.annualSalary}</td>
            <td class="cleanTable-cell">${employee.reviewRating}</td>
        </tr>`;

        $employeesTable.append(rowElement);
    }
}

function renderEmpoyeeBonuses(employeeBonuses) {
    console.table(employeeBonusList);
    const $bonusesContainer = $('.js-bonusesContainer');
    const $bonusesTable = $(`<table cellspacing="0" class="cleanTable">
        <thead class="cleanTable-hd">
            <tr>
                <td class="cleanTable-cell">Name</td>
                <td class="cleanTable-cell">Bonus (Pct)</td>
                <td class="cleanTable-cell">Bonus ($)</td>
                <td class="cleanTable-cell">Total Conmpensation</td>
            </tr>
        </thead>
        <tbody class="cleanTable-bd">
        </tbody>
        <tfoot class="cleanTable-ft">
            <tr>
                <td colspan="4" class="cleanTable-cell">
                    Bonuses are a reflection of company standards.
                </td>
            </tr>
        </tfoot>
    </table>`);

    const $bonusesTbody = $bonusesTable.appendTo($bonusesContainer).find('tbody');

    for (let i = 0; i < employeeBonuses.length; i++) {
        const employee = employeeBonuses[i];
        const rowElement = `<tr>
            <td class="cleanTable-cell">${employee.name}</td>
            <td class="cleanTable-cell">${employee.bonusPercentage}</td>
            <td class="cleanTable-cell">${employee.totalBonus}</td>
            <td class="cleanTable-cell">${employee.totalCompensation}</td>
        </tr>`;

        $bonusesTbody.append(rowElement);
    }
}

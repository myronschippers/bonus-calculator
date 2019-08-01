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

const ORIGIN_KEYS = [
    'name',
    'employeeNumber',
    'annualSalary',
    'reviewRating',
];
const BONUS_KEYS = [
    'name',
    'bonusPercentage',
    'totalBonus',
    'totalCompensation',
];
const DATA_LABELS = {
    name: 'Name',
    employeeNumber: 'ID',
    annualSalary: 'Salary',
    reviewRating: 'Rating',
    bonusPercentage: 'Bonus (%)',
    totalCompensation: 'Compensation',
    totalBonus: 'Bonus ($)',
};

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
    const salaryNumber = parseInt(originEmployee.annualSalary);
    const bonusPct = calculateBonusPct(originEmployee, salaryNumber);
    const totalBonus = calculateBonusAmount(salaryNumber, bonusPct);
    const totalCompensation = calculateTotalCompensation(salaryNumber, totalBonus);

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
 * @param {number} salaryNumber
 * @returns {number}
 */
function calculateBonusPct(employeeData, salaryNumber) {
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

    const employeeId = employeeData.employeeNumber;
    finalBonusPct = adjustBonusForSeniority(finalBonusPct, employeeId);
    finalBonusPct = adjustBonusForSalary(finalBonusPct, salaryNumber);
    finalBonusPct = adjustBonusForMaxMin(finalBonusPct)

    return finalBonusPct;
}

/**
 * Adjusts the bonus provided based on ID length (4 digits long additional 5%)
 * @param {number} originBonus
 * @param {string} employeeId
 * @returns {number}
 */
function adjustBonusForSeniority(originBonus, employeeId) {
    let adjustedBonus = originBonus;

    if (employeeId.length == 4) {
        adjustedBonus += 5;
    }

    return adjustedBonus;
}

/**
 * Adjust bonus based on the annual salary. Over $65,000 gets bonus adjusted down by 1%.
 * @param {number} originBonus
 * @param {number} salaryNumber
 * @returns {number}
 */
function adjustBonusForSalary(originBonus, salaryNumber) {
    let adjustedBonus = originBonus;

    if (salaryNumber > 65000) {
        adjustedBonus -= 1;
    }

    return adjustedBonus;
}

/**
 * Check the bonus value against the maximum and minimum values
 * allowed and adjust the bonus if needed.
 * @param {number} originBonus
 * @returns {number}
 */
function adjustBonusForMaxMin(originBonus) {
    let adjustedBonus = originBonus;
    const maxBonus = 13;
    const minBonus = 0;

    if (adjustedBonus > maxBonus) {
        adjustedBonus = maxBonus;
    } else if (adjustedBonus < minBonus) {
        adjustedBonus = minBonus
    }

    return adjustedBonus;
}

/**
 * Calculate the ammount to be added to the employee annual salary given the bonus percentage provided.
 * @param {number} annualSalary
 * @param {number} bonusPctInt
 * @returns {number}
 */
function calculateBonusAmount(annualSalary, bonusPctInt) {
    const bonusPct = bonusPctInt / 100;
    const finalBonusAmount = annualSalary * bonusPct;

    return finalBonusAmount;
}

/**
 * Calculate the final adjusted salary with the totalBonus added to the employee's current salary.
 * @param {number} salaryNumber
 * @param {number} totalBonus
 * @returns {number}
 */
function calculateTotalCompensation(salaryNumber, totalBonus) {
    const finalCompensation = salaryNumber + totalBonus;

    return finalCompensation;
}

//
// STRETCH GOALS
// Rendering employee data to the DOM
// ----------------------------------------------------------------

$(document).ready(onReady);

function onReady() {
    const $btnCalcBonuses = $('.js-calcBonuses');

    $btnCalcBonuses.on('click', clickCalcBonus);
    render(employees, '.js-employees');
}

function clickCalcBonus(event) {
    const employeeBonusList = processAllEmployees(employees);

    render(employeeBonusList, '.js-bonusesContainer');
}

/**
 * Appends a table containing the data provided to the DOM
 * element that matches the elementSelector.
 * @param {array} employeeData
 * @param {string} elementSelector
 */
function render(employeeData, elementSelector) {
    const $element = $(elementSelector);
    const $table = createTableElement(employeeData);

    $element.append($table);
}

/**
 * Creates an HTML table as a jQuery element.
 * @param {array} employeeData
 * @returns {jQuery}
 */
function createTableElement(employeeData) {
    const $tableElem = $(`<table cellspacing="0" class="cleanTable">
        <thead class="cleanTable-hd">
            <tr>
            </tr>
        </thead>
        <tbody class="cleanTable-bd">
        </tbody>
        <tfoot class="cleanTable-ft">
        </tfoot>
    </table>`);

    addFootToTable(employeeData[0], $tableElem);
    addDataToTable(employeeData, $tableElem);

    return $tableElem;
}

/**
 * Add a footer with specialized text to the table element provided.
 * @param {object} data
 * @param {jQuery} $table
 */
function addFootToTable(data, $table) {
    let footerText = 'Original employee information.';
    const colCount = Object.keys(data).length;
    
    if (data.bonusPercentage != null) {
        footerText = 'Bonuses based on company standards.';
    }

    $table.find('tfoot')
        .append(`<tr>
            <td colspan="${colCount}" class="cleanTable-cell">${footerText}</td>
        </tr>`);
}

/**
 * Add a header and body to the table element provided. Both the
 * column headers and the body will be based off of the data
 * list provided.
 * @param {object} dataList
 * @param {jQuery} $table
 */
function addDataToTable(dataList, $table) {
    const $thRow = $table.find('thead > tr');
    const dataStructure = dataList[0];
    let dataKeys = [];

    if (dataStructure.annualSalary != null) {
        dataKeys = ORIGIN_KEYS;
    } else if (dataStructure.bonusPercentage != null) {
        dataKeys = BONUS_KEYS;
    }

    for (let i = 0; i < dataKeys.length; i++) {
        const indvKey = dataKeys[i];
        const colLabel = DATA_LABELS[indvKey];
        
        $thRow.append(`<td class="cleanTable-cell">${colLabel}</td>`);
    }

    addDataContentToTable(dataList, dataKeys, $table);
}

/**
 * Add a body to the table element provided. The table
 * body will be filled with the data provided in the
 * dataList passed to the function.
 * @param {array} dataList
 * @param {array} dataOrder
 * @param {jQuery} $table
 */
function addDataContentToTable(dataList, dataOrder, $table) {
    const $tbody = $table.find('tbody');

    for (let i = 0; i < dataList.length; i++) {
        const dataRow = dataList[i];
        const $tbRow = $tbody.append(`<tr></tr>`).find('tr:last-child');

        for (let j = 0; j < dataOrder.length; j++) {
            const cellKey = dataOrder[j];
            const cellValue = dataRow[cellKey];

            $tbRow.append(`<td class="cleanTable-cell">${cellValue}</td>`);
        }
    }
}

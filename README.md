# Bonus Calculator App

You are going to write a single JavaScript file to automatically calculate employee bonus for a company.

## Data Structure

The company is providing you with a few samples of employee data of how their data is currently being stored. Each are stored in a global array named `employees`.

### Employee Array
Each **Employee** currently is configured in this way:

* The `name` property holds the employees name.
* The `employeeNumber` property has their employee number.
* The `annualSalary` property contains their base annual salary.
* The `reviewRating` property contains their review rating.

## Processing Employee Bonuses

Loop over the `employees` array and do the following:

* use each employee object as the input to the function described below.
* `console.log` the results of each iteration.

## Function Logic

Write a declared function that takes in one **Employee** object (as an argument to the function), and returns a new **object** with the following properties:

* The `name` property should contain the employee's name.
* The `bonusPercentage` property should contain the bonus percentage the employee is to receive. See section below for calculation instructions.
* The `totalCompensation` property should be the adjusted annual compensation (base annual + bonus)
* The `totalBonus` should be the employee's total bonus rounded to the nearest dollar.

### Individual Bonus calculation
- Those who have a rating of a 2 or below should not receive a bonus.
- Those who have a rating of a 3 should receive a base bonus of 4% of their base annual income.
- Those who have a rating of a 4 should receive a base bonus of 6% of their base annual income.
- Those who have a rating of a 5 should receive a base bonus of 10% of their base annual income.
- If their employee number is 4 digits long, this means they have been with the company for longer than 15 years,
and should receive an additional 5%.
- However, if their annual income is greater than $65,000, they should have their bonus adjusted down 1%.
- No bonus can be above 13% or below 0% total.

NOTE: You may abstract out this bonus calculation into a second function if you like, but this is not mandatory.

## Stretch Goals
- Put the output on the DOM (visually on the page).
- Make the app run only after the user clicks on a button on the page
- Then style the output, making it visually appealing.

# Breaking Down and Solving the Problem

## Step 1: Big Picture, Need a Second List of Data

At it's core we are looking to take an existing array of **Employees** convert each of the **Employees** into a new data structure and store them in a brand new array. If we start there we need a function that will process the provided **Employees** list and make a new list with alternate Employee data.

```JS
function processAllEmployees(employeeList) {
    const newEmployeeList = [];

    for (let i = 0; i < employeeList.length; i++) {
        const employeeInfo = employeeList[i];
        const newEmployee = {}; // will need to be in the new employee structure

        newEmployeeList.push(newEmployee);
    }

    return newEmployeeList;
}
```

Call to the new function `processAllEmployees` and see if it works. We should end up with two arrays in our browser console one with all of our original data and another one that has a list of blank objects with the same number of objects as the original list.

```JS
console.log( employees );
console.log('New Employee Data: ', processAllEmployees(employees));
```

## Step 2: Convert Data Structure of Employee

We are asked to make the employee data stored in the new array into a new format that matches the following:

```JS
{
    name: 'string',
    bonusPercentage: 'string', // person readable
    totalCompensation: 'number', // machine readable
    totalBonus: 'number', // machine readable
}
```

Let's create a function that will take care of this data conversion for us. We can already map the name directly from our original employee data as they have a one to one relationship.

```JS
function convertEmployeeData(originEmployee) {
    // values will need to be calculated and mapped to the new object
    const name = originEmployee.name;

    const newEmployeeData = {
        name,
        bonusPercentage: '1%', // person readable
        totalCompensation: 0, // machine readable
        totalBonus: 0, // machine readable
    };

    return newEmployeeData;
}
```

We still aren't using the new `convertEmployeeData` function so let's alter our `processAllEmployees` function to use `convertEmployeeData` inside of the loop.

```JS
for (let i = 0; i < employeeList.length; i++) {
    const employeeInfo = employeeList[i];
    const newEmployee = convertEmployeeData(employeeInfo); // convert data structure

    newEmployeeList.push(newEmployee);
}
```

Now we can bring it up in our braowser and the second array should have a list of objects with the propper data format instead of empty objects.

## Step 3: Calculate the Employee's Bonus Percentage

There are some rules around how an employee's bonus percentage gets calculated so let's make a function that will take in the employee's data and give us back a whole number for the percentage from 0 to 100.

```JS
function calculateBonusPct(employeeData) {
    let finalBonusPct = 0;
    // adjust bonus based on the employee's rating

    // adjust the bonus based on ID length (4 digits long additional 5%)

    // income over $65,000 adjust bonus down 1%

    // no bonus above 13% or below 0%
    
    console.log('in calculateBonusPct - bonus: ', finalBonusPct);
    return finalBonusPct;
}
```

The bonus calculation takes into consideration 4 diferent condition before a total bonus amount reaches it's final determination. Let's tackle the first factor which is the rating the employee has received.

```JS
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

    // income over $65,000 adjust bonus down 1%

    // no bonus above 13% or below 0%
    
    console.log('in calculateBonusPct - bonus: ', finalBonusPct);
    return finalBonusPct;
}
```

Let's add a call to the new `calculateBonusPct` function to our `convertEmployeeData` function so that we can test it in the browser.

```JS
// values will need to be calculated and mapped to the new object
const name = originEmployee.name;
const bonusPct = calculateBonusPct(originEmployee);

const newEmployeeData = {
    name,
    bonusPercentage: `${bonusPct}%`, // person readable
    totalCompensation: 0, // machine readable
    totalBonus: 0, // machine readable
};
```

With the initial bonus percentage calculated let's add an adjustment for the the ID's whose length is 4 digits long. This adjustment will need to be made inside of the `calculateBonusPct` function.

```JS
// adjust the bonus based on ID length (4 digits long additional 5%)
const employeeId = employeeData.employeeNumber;

if (employeeId.length == 4) {
    finalBonusPct += 5;
}
```

Test in the browser to verify that it's working.

Now we need to make an adjustment to the bonus percentage for any employee whose salary is over $65,000. This adjustment will need to be made inside of the `calculateBonusPct` function.

```JS
// income over $65,000 adjust bonus down 1%
const salaryNumber = parseInt(employeeData.annualSalary);

if (salaryNumber > 65000) {
    finalBonusPct -= 1;
}
```

Test in the browser to validate that it's working.

Finally we're going to be setting maximum and minimum bonus levels and restricting the calculated bonus based on these levels. This adjustment will need to be made inside of the `calculateBonusPct` function.

```JS
// no bonus above 13% or below 0%
const maxBonus = 13;
const minBonus = 0;

if (finalBonusPct > maxBonus) {
    finalBonusPct = maxBonus;
} else if (finalBonusPct < minBonus) {
    finalBonusPct = minBonus
}
```

## Step 4: Calculating the Total Bonus Amount

With the correct bonus percentage being calculated we can now use that to calculate our total Bonus Amount that will be added to our salary. For this calculation we'll be creating another new function that we can call from the `convertEmployeeData` function.

```JS
function calculateBonusAmount(employeeData, bonusPctInt) {
    const annualSalary = parseInt(employeeData.annualSalary);
    const bonusPct = bonusPctInt / 100;
    const finalBonusAmount = annualSalary * bonusPct;

    return finalBonusAmount;
}
```

Add the function call to the `convertEmployeeData` function  and ensure that the value is being mapped to the new data object correctly. With this we can test our new function in the browser.

```JS
const name = originEmployee.name;
const bonusPct = calculateBonusPct(originEmployee);
const totalBonus = calculateBonusAmount(originEmployee, bonusPct);

const newEmployeeData = {
    name,
    bonusPercentage: `${bonusPct}%`, // person readable
    totalCompensation: 0, // machine readable
    totalBonus, // machine readable
};
```

## Step 5: Calculating the Total Compensation Adjustment

The final base requirement we need is the new adjusted annual salary mapped to the new employee object as `totalCompensation`. This will also be a new function so that we can keep the `convertEmployeeData` function where the data is being mapped clean of any actual calculations.

```JS
function calculateTotalCompensation(employeeData, totalBonus) {
    const salaryNumber = parseInt(employeeData.annualSalary);
    const finalCompensation = salaryNumber + totalBonus;

    return finalCompensation;
}
```

In order to test this in the browser we need to make some adjustments to the `convertEmployeeData` function. This includes the calling of our newly created function and the mapping of the `totalCompensation` amount to the new Employee data object.

```JS
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
```

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

The steps that follow are the mental process that I used to work through the problem. Everyone works through things in their own way so please allow yourself to think of this in a different manner or make adjustments as you see fit.

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

Our test logs are giving us a fully fleshed out new array of objects with the calculated bonuses.

# Stretch Goals, Let's Work Through the Problem

The stretch goals are asking us to visualize the data on the page. There is an inherint issue here of, "How do you want to visually represent the data?" We also know that the calculated bonuses for the new array aren't going to be calculated until a user clicks a button. A fairly common solution would be to show the employess list in a table. For this we'll go with a simple table.

One table will display the current employee data before bonus calculations are made. We will then have a second table that will only be rendered after the user clicks the **Calculate Bonuses** button.

## Step 1: Prepping for DOM Manipulation

We start off by downloading and sourcing jQuery into our application. The jQuery file we can name `jquery.min.js`. We can also create a new `styles.css` file that will also get sourced in our `index.html` file.

**index.html**

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bonus Calculator Object Challenge</title>
    <link rel="stylesheet" href="style.css">
    <script src="jquery.min.js" charset="utf-8"></script>
    <script src="client.js" charset="utf-8"></script>
  </head>
  <body>
```

Now that jQuey is available and we have a stylesheet to work with we can add the HTML to our `index.html` that the JS will be interacting with. We are going to add all of the HTML markup that we think we are going to need at this point, this could potential change as we manipulate it with JS.

```HTML
  <body>
    <h1>Bonus Calculator Object Challenge</h1>

    <div class="container">
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>ID</td>
            <td>Salary</td>
            <td>Rating</td>
          </tr>
        </thead>
        <tbody class="js-employees">
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="utlText-alnRight">
              <button class="js-calcBonuses">Calculate Bonuses</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="container js-bonusesContainer"></div>
  </body>
```

We have wrapped each section with a employees table in a `<div>` with a class of `container` which we will leverage for styling. Inside each of those container `<div>`s will be the table for displaying the employees. The first container `<div>` will hold the original employee data and it should be available at the time of render. In the second container `<div>` you will notice there is no table. This is because the table will only get rendered after the user has clicked the **Calculate Bonus** button and the caluculations have been run. You might also notice that we have added some `js-` classes to a couple of elements. We will leverage these in our JS to interact with those particular DOM elements.

With the HTML markup in place we'll jump over to the JS and kick off the JS selection of elements. At this point the focus will be on setting up the ready state and hooking up the event handler for our **Calculate Button**.

```JS
$(document).ready(onReady);

function onReady() {
    const $btnCalcBonuses = $('.js-calcBonuses');

    $btnCalcBonuses.on('click', clickCalcBonus);
}

function clickCalcBonus(event) {
    console.log('clicked Calculate Bonus');
}
```

Give this a test in the browser before moving on so that when the button on the web page is clicked a message shows up in the browser console.

## Step 2: Rendering the Initial Employee List

Taking a look at the page as it is right now we don't see any of the original data being printed to the page for the employees we were provided. Let's work on this so that when a user first loads the page they can see the initial data.

### Step 2.1: Rendering Data to the DOM

```JS
function renderEmployees() {
    const $employeesTable = $('.js-employees');

    $employeesTable.empty();

    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const rowElement = '<tr>'
            + '<td>' + employee.name + '</td>'
            + '<td>' + employee.employeeNumber + '</td>'
            + '<td>' + employee.annualSalary + '</td>'
            + '<td>' + employee.reviewRating + '</td>'
        + '</tr>';

        $employeesTable.append(rowElement);
    }
}
```

```JS
function onReady() {
    const $btnCalcBonuses = $('.js-calcBonuses');

    $btnCalcBonuses.on('click', clickCalcBonus);
    renderEmployees();
}
```

### Step 2.2: Styling the Table

We already have the `.container` class being used as a wrapper around our two tables. Let's start by adding some layout styling to that class that restricts the width and adds some whitespace between the tables and edges of the browser window.

```CSS
.container {
    width: 960px;
    max-width: 100%;
    padding: 8px 20px;
    box-sizing: border-box;
}
```

To start styling the table itself we are just going to add a class on the `<table>` tag of `.cleanTable`. The name could be anything but we chose *cleanTable* because we want to create a clean looking table.

```HTML
<div class="container">
    <table class="cleanTable">
        <thead>
            <tr>
            <td>Name</td>
            <td>ID</td>
            <td>Salary</td>
            <td>Rating</td>
            </tr>
        </thead>
```

With the `.cleanTable` class in place we'll add the following styles to give it some more substance on our page.

```CSS
.cleanTable {
    width: 100%;
    background: #ffffff;
    border: 1px solid #a9a9a9;
}
```

These styles ar OK but we want a little more details so let's add some classes to our markup for the `<thead>`, `<tbody>`, `<tfoot>`, and `<td>` tags. These classes will act as targets for our CSS styling.

```HTML
<div class="container">
    <table cellspacing="0" class="cleanTable">
        <thead class="cleanTable-hd">
            <tr>
                <td class="cleanTable-cell">Name</td>
                <td class="cleanTable-cell">ID</td>
                <td class="cleanTable-cell">Salary</td>
                <td class="cleanTable-cell">Rating</td>
            </tr>
        </thead>
        <tbody class="cleanTable-bd js-employees">
        </tbody>
        <tfoot class="cleanTable-ft">
            <tr>
                <td colspan="4" class="cleanTable-cell">
                    <button class="js-calcBonuses">Calculate Bonuses</button>
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

With the extra classes in place we'll go to two with our styles. Add some styling and then refresh our browser back and forth until we come up with something we like.

```CSS
.cleanTable {
    width: 100%;
    background: #ffffff;
    border: 1px solid #a9a9a9;
}

.cleanTable-hd,
.cleanTable-ft {
    background: #d3d3d3;
}

.cleanTable-hd {
    border-bottom: 1px solid #a9a9a9;
}

.cleanTable-bd > * > * {
    border-bottom: 1px solid #a9a9a9;
}

.cleanTable-ft {
    text-align: right;
}

.cleanTable-cell {
    padding: 6px 10px;
}
```

Oh crap, our cell styling is not effecting the data in the `<tbody>`. This is because the elements in the `<tbody>` are rendered from our JS and we never added our `.cleanTable-cell` classes to the JS. Let's go into our `renderEmployees` function and add these classes.

```JS
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        const rowElement = '<tr>'
            + '<td class="cleanTable-cell">' + employee.name + '</td>'
            + '<td class="cleanTable-cell">' + employee.employeeNumber + '</td>'
            + '<td class="cleanTable-cell">' + employee.annualSalary + '</td>'
            + '<td class="cleanTable-cell">' + employee.reviewRating + '</td>'
        + '</tr>';

        $employeesTable.append(rowElement);
    }
```

**This font is awful!!!**
Lets reset the font being used on the entire page at the top of our CSS document `style.css`.

```CSS
html,
body {
    font-family: 'Segoe UI', Tahoma, sans-serif, Arial, sans-serif
}
```

That's much better.

### Step 2.3: Styling the Button

In order to style our **Calculate Bonuses** button we will need to add a class to the `<button>` tag. But wait don't we have the `.js-calcBonuses` class? We do but it is specifically being used as a JS selector so let's use a different class tht can just handle styling.

```HTML
<td colspan="4" class="cleanTable-cell">
    <button class="btn js-calcBonuses">Calculate Bonuses</button>
</td>
```

Once the class is in place we start styling it until we're at a place where we like the button.

```CSS
.btn {
    padding: 10px 16px;
    border: 1px solid #191970;
    border-radius: 6px;
    background: #4682b4;
    color: #ffffff;
    font-size: 1.1rem;
    cursor: pointer;
}

.btn:hover {
    background: #315e82;
}
```

## Step 3: Rendering Bonuses

We now need to look at calling to the calculations we have already created and render the array resulting from those calculations to our DOM. With the styling in place and our calculation functions already working we just need to figure out how we're going to render the results from our calculation when the user clicks the button.

### Step 3.1: Calculate on Button Click

The click behavior is already in place so let's hide the `console` commands that are calling to our calculate function so we can start testing the click function to cause our calculations to run.

```JS
console.table(employees);
// console.log('New Employee Data: ');
// console.table(processAllEmployees(employees));
```

Inside of our `clickCalcBonus` function we can now call to the `processAllEmployees` function and store the restult in a new variable that we will display in our browser console using `console.table`.

```JS
function clickCalcBonus(event) {
    console.log('clicked Calculate Bonus');
    const employeeBonusList = processAllEmployees(employees);
    console.table(employeeBonusList);
}
```

With that update we can now refresh our browser and test to see that when we click the **Calculate Bonuses** button a table showing the new employees bonus array should show up in the browser's console.

### Step 3.2: Render Bonuses to the DOM

Create a function that will simply log out the employee bonus data when it receives it.

```JS
function renderEmpoyeeBonuses(employeeBonuses) {
    console.table(employeeBonuses);
}
```

With our render function in place let's call to that function from `clickCalcBonus` passing it the results from our calculations stored in the ` employeeBonusList` variable instead of logging it out to our console.

```JS
function clickCalcBonus(event) {
    console.log('clicked Calculate Bonus');
    const employeeBonusList = processAllEmployees(employees);

    renderEmpoyeeBonuses(employeeBonusList);
}
```

A test of the button in our browser after a quick refresh should have the same results from **Step 3.1**.

It's time to actually build out the `renderEmpoyeeBonuses` function so that it renders the bonuses table to the DOM. This will look very similar to the `renderEmployees` function we wrote earlier but with some key differences.

```JS
function renderEmpoyeeBonuses(employeeBonuses) {
    const $bonusesContainer = $('.js-bonusesContainer');
    const $bonusesTable = $('<table cellspacing="0" class="cleanTable">'
        + '<thead class="cleanTable-hd">'
            + '<tr>'
                + '<td class="cleanTable-cell">Name</td>'
                + '<td class="cleanTable-cell">Bonus (Pct)</td>'
                + '<td class="cleanTable-cell">Bonus ($)</td>'
                + '<td class="cleanTable-cell">Total Conmpensation</td>'
            + '</tr>'
        + '</thead>'
        + '<tbody class="cleanTable-bd">'
        + '</tbody>'
        + '<tfoot class="cleanTable-ft">'
            + '<tr>'
                + '<td colspan="4" class="cleanTable-cell">'
                    + 'Bonuses are a reflection of company standards.'
                + '</td>'
            + '</tr>'
        + '</tfoot>'
    + '</table>');

    const $bonusesTbody = $bonusesTable.appendTo($bonusesContainer).find('tbody');

    for (let i = 0; i < employeeBonuses.length; i++) {
        const employee = employeeBonuses[i];
        const rowElement = '<tr>'
            + '<td class="cleanTable-cell">' + employee.name + '</td>'
            + '<td class="cleanTable-cell">' + employee.bonusPercentage + '</td>'
            + '<td class="cleanTable-cell">' + employee.totalBonus + '</td>'
            + '<td class="cleanTable-cell">' + employee.totalCompensation + '</td>'
        + '</tr>';

        $bonusesTbody.append(rowElement);
    }
}
```

WOOOO HOOOO!!!! I can see my table.

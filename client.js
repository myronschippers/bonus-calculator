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
 */
function processAllEmployees(employeeList) {
  const newEmployeeList = [];

  for (let i = 0; i < employeeList.length; i++) {
      const employeeInfo = employeeList[i];
      const newEmployee = {}; // will need to be in the new employee structure

      newEmployeeList.push(newEmployee);
  }

  return newEmployeeList;
}

console.log( employees );
console.log('New Employee Data: ', processAllEmployees(employees));

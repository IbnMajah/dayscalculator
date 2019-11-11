/**
 * Author: Ibn Majah Jallow
 * Description: Basic application use to calculate days between two dates
 * Date: 8th November, 2019
 * For educational purpose only
 */

// Listening to click event of the button (submit) and executing the function 'calcDay'
// when the button is click
document.getElementById("submit").addEventListener("click", calcDay);
function calcDay() {
  // getting the dates value of the from fields
  let from = document.getElementById("from").value; // getting the values of the FROM date
  let fromValue = from.split("-"); // splitting the values into an array
  let yearFrom = parseInt(fromValue[0]); // year of the from field
  let monthFrom = parseInt(fromValue[1]) - 1; // month of the from field
  let dayFrom = parseInt(fromValue[2]); // day of the from field

  // getting the dates value of the to fields
  let to = document.getElementById("to").value; // getting the values of the TO date
  let toValue = to.split("-"); // splitting the values into an array
  let yearTo = parseInt(toValue[0]); // year of the to field
  let monthTo = parseInt(toValue[1]) - 1; // month of the to field
  let dayTo = parseInt(toValue[2]); // day of the to field

  // Initialising the number of days and months for both leap and non-leap years
  let numOfDays = 0;
  let normalMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let leapMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (yearFrom == yearTo && monthFrom == monthTo) {
    // here, the both years and months are the same, so we just subtract the days
    numOfDays += dayTo - dayFrom;
  } else if (yearTo == yearFrom && dayTo == dayFrom) {
    // here, both years and days are the same
    for (let i = monthFrom + 1; i < monthTo; i++) {
      // so we loop throung the months and add the days in the month, whether leap
      // non-leap
      if (yearTo % 4 == 0) {
        numOfDays += leapMonths[i];
      } else {
        numOfDays += normalMonths[i];
      }
    }
    // after looping, we subtract the given day from the total days in the given month
    // and add that to the number of days
    if (yearFrom % 4 == 0) {
      numOfDays += leapMonths[monthFrom] - dayFrom;
      numOfDays += dayTo;
    } else {
      numOfDays += normalMonths[monthFrom] - dayFrom;
      numOfDays += dayTo;
    }
  } else {
    // we do this if both scenarios on top didn't happen. meaning the days, months and years
    // are different

    // we first add the remaining days in the given month of the from field
    if (yearFrom % 4 == 0) {
      numOfDays += leapMonths[monthFrom] - dayFrom;
    } else {
      numOfDays += normalMonths[monthFrom] - dayFrom;
    }
    // then we calculate the total months between the two dates excluding the monthfrom
    // and the monthto
    let numOfMonths = 12 - (monthFrom + 1) + ((yearTo - yearFrom - 1) * 12 + (monthTo - 1));
    let count = 0, // initialising a counter
      i = yearFrom,
      start = monthFrom + 1; // a starting position. plus 1 cuz monfrom is excluded stated before
    while (count <= numOfMonths && i <= yearTo) {
      let month = ((count + start) % 12) + 1; // a current month to know the exact month and its days
      // checking whether the current year is leap and adding its respective days of the month
      if (i % 4 == 0) {
        numOfDays += leapMonths[month - 1];
      } else {
        numOfDays += normalMonths[month - 1];
      }
      count++;
      if (month == 12) {
        i++;
      }
    }
    // since the month-to was excluded in the loop, we now the days of the month-to
    numOfDays += dayTo;
  }
  // input validation on the input (not strong though, maybe you can improve it)
  if (fromValue.length < 3 || toValue.length < 3) {
    document.querySelector(".dis").textContent = `Please enter all values`;
  } else {
    document.querySelector(".dis").textContent = `Result: ${numOfDays} days`;
  }
}

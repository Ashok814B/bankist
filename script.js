"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovemets = function (movements) {
  movements.forEach(function (mov, i, arr) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const element = `
              <div class="movements__row">
                <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
                <div class="movements__value">${mov}</div>
              </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", element);
    //console.log(element);
  });
};
displayMovemets(account1.movements);

//displaying Balance Amount
const displaybalanceamount = function (movements) {
  const balance = movements.reduce(function (acc, mov, i, arr) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
};
displaybalanceamount(account1.movements);

console.log(containerMovements.innerHTML);

const creatUserNAmes = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
creatUserNAmes(accounts);
console.log(accounts);

//Dispalying In, Out,Interset
const displayAmounts = function (movements) {
  const deposit = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  console.log(deposit);
  labelSumIn.textContent = `${deposit}💶`;

  const withdraw = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdraw)}💶`;

  const Interset = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((mov) => mov >= 1)
    .reduce((deposit, mov) => deposit + mov, 0);
  labelSumInterest.textContent = `${Interset}💶`;
};
displayAmounts(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
*/

//Map, Filter, REduce
const a = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const movementsUSD = movements.map(function (mov) {
//   return mov * 1.1;
// });
const movementsUSD = movements.map((mov) => mov * 1.1);
console.log(movementsUSD);

const movementsUSDfor = [];
movements.forEach((mov) => {
  movementsUSDfor.push(mov * a);
});
console.log(movementsUSDfor);
/////////////////////////////////////////////////

//Challenge 1
const julia1 = [3, 5, 2, 12, 7];
const julia2 = [9, 16, 6, 8, 3];
const kate1 = [4, 1, 15, 8, 3];
const kate2 = [10, 5, 6, 1, 4];
const checkDogs = function (dogsjulia, dogskate) {
  const arr1 = [...dogsjulia];
  arr1.splice(0, 1);
  arr1.splice(-2);
  const arr2 = [...dogskate];
  //   arr2.splice(0, 1);
  //   arr2.splice(-2);
  const combined = [...arr1, ...arr2];
  combined.forEach(function (ele, i) {
    const type = ele > 3 ? "adult" : "puppy";
    console.log(`Dog Number ${i + 1} is an ${type} and is ${ele} Years old`);
  });
  //console.log(arr1, arr2);
};
checkDogs(julia1, kate1);
checkDogs(julia2, kate2);

const b = movements.filter(function (mov) {
  return mov > 0;
});
console.log(b);

const c = [];
for (const mov of movements) {
  if (mov > 0) c.push(mov);
}
console.log(c);

const withdrawls = movements.filter((mov) => mov < 0);
console.log(withdrawls);

"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
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

const displayMovemets = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const copymovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  copymovements.forEach(function (mov, i, arr) {
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
//displayMovemets(account1.movements);

//displaying Balance Amount
const displaybalanceamount = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov, i, arr) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${Math.floor(acc.balance)} EUR`;
};
//displaybalanceamount(account1.movements);

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
//console.log(accounts);

//Dispalying In, Out,Interset
const displaySummarySection = function (acc) {
  const deposit = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposit}💶`;

  const withdraw = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdraw)}💶`;

  const Interset = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((deposit, mov) => deposit + mov, 0);
  labelSumInterest.textContent = `${Math.floor(Interset)}💶`;
};
//displaySummarySection(account1.movements);

const UpdateUI = function (currentAccount) {
  //Display Balance
  displaybalanceamount(currentAccount);

  //Display Summaey
  displaySummarySection(currentAccount);

  //Display Movements
  displayMovemets(currentAccount.movements, false);
};

let currentAccount;

//Fake Always Logged in
currentAccount = account1;
UpdateUI(currentAccount);
containerApp.style.opacity = 100;

//Implementing Login Logic
btnLogin.addEventListener("click", function (e) {
  //Prevent Dfault form from submmitting
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;
  }

  //Clear the input fields
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();

  //Update the UI
  UpdateUI(currentAccount);
});

//Implementing Transfer Logic
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    console.log("Transfered");
    UpdateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = "";
  }
  console.log(amount, recieverAccount);
});

//Implementing Loan Logic
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //Add the amount to movements
    currentAccount.movements.push(amount);

    //Update UI
    UpdateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

//Implementing Close Account Logic
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const conformuser = inputCloseUsername.value;
  const consformpin = Number(inputClosePin.value);

  if (
    conformuser === currentAccount.username &&
    consformpin === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    //Delete the Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

//Implementing Sort Logic
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  //Update the Movemments container
  displayMovemets(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////

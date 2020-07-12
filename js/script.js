const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM(data);
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(person => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
    main.appendChild(element);
  });
}

function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function doDoubleMoney() {
  data = data.map(person => {
    return { ...person, money: person.money * 2 };
  });

  updateDOM();
}

function showMillionaires() {
  data = data.filter(person => person.money >= 1000000);

  updateDOM();
}

function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);

  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((result, person) => {
    return result += person.money;
  }, 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doDoubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);
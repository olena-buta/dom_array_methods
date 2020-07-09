const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');


let data = [];

//Fetch random user and add money
async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: `${Math.floor(Math.random() * 1000000)}`
  };
  addData(newUser);
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);
  updateDOM(data);
}

// Update DOM
function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(person => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(Number(person.money))}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
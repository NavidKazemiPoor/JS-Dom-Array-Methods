let element = document.querySelector(".users");
const addUserBtn = document.getElementById("addUserBtn");
const doubleBtn = document.getElementById("doubleBtn");
const showMillionaires = document.getElementById("showMillionaires");
const calculateWealthBtn = document.getElementById("calculateWealthBtn");
const sortBtn = document.getElementById("sortBtn");

addUserBtn.addEventListener("click", () =>
  fetchUser("https://randomuser.me/api")
);

let data = [];

const fetchUser = async (url) => {
  const response = await fetch(url);
  const { results } = await response.json();
  const { first, last } = results[0].name;

  const user = {
    name: first + " " + last,
    wealth: Math.random() * 1000000,
  };
  addData(user);
};
const addData = (user) => {
  data.push(user);
  updateDom();
};

const updateDom = (providedData = data) => {
  element.innerHTML = "";
  providedData.map((item) => {
    let el = document.createElement("div");
    el.classList.add("users-content");
    el.innerHTML = `<h4>${item.name}</h4><h4>${setNumberFormat(
      item.wealth
    )}</h4>`;
    element.appendChild(el);
  });
};

// func 2x money
const doubleMoney = () => {
  let newData = data.map((item) => {
    return { name: item.name, wealth: item.wealth * 2 };
  });
  data = newData;
  updateDom();
};

doubleBtn.addEventListener("click", doubleMoney);

// show millionairesfunc
let flag = true;
const showMillionairesFunc = () => {
  if (flag == true) {
    let newData = data.filter((item) => {
      if (item.wealth > 1000000) {
        return { name: item.name, wealth: item.wealth };
      }
    });
    updateDom(newData);
    flag = false;
    showMillionaires.innerHTML = "Show All Users";
  } else {
    flag = true;
    updateDom(data);
    showMillionaires.innerHTML = "Show Only Millionaires 💵";
  }
};
showMillionaires.addEventListener("click", showMillionairesFunc);

// func sort
const sortByRichest = () => {
  let newData = data.sort((a, b) => {
    return b.wealth - a.wealth;
  });
  console.log(newData);
  updateDom();
};
sortBtn.addEventListener("click", sortByRichest);

// calculate
const calculateWealthFunc = () => {
  const total = data.reduce((total, num) => (total += num.wealth), 0);
  document.getElementById("result").innerHTML = setNumberFormat(total);
};
calculateWealthBtn.addEventListener("click", calculateWealthFunc);

// number format
const setNumberFormat = (number) => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

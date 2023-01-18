//making a variabel for every button
let bankButton = document.querySelector("#bankButton");
let workButton = document.querySelector("#workButton");
let getALoanButton = document.querySelector("#loan");
let buyButton = document.querySelector("#buyButton");
let repayLoanButton = document.querySelector("#repayLoanButton");
let loan_to_pay = document.querySelector("#loan_to_pay_balance");
 
//let loan_to_pay = 0;
const currencySign = "SEK"
let laptops = [];
let hasLoan = false;

//Creating DOM Elements
const laptopsElement = document.getElementById("laptops");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const specsElement = document.getElementById("specs");
const priceElement  = document.getElementById("price");
const imgElement = document.getElementById("img");


 //fetching data från an API
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then(response => response.json())
  .then (data => laptops = data)
  .then (laptops => addLaptopsToDropDownMenu(laptops));

  const addLaptopsToDropDownMenu = (laptops) => {
    laptops.forEach(x => addLaptopToDropDownMenu(x));
    priceElement.innerText = laptops[0].price + " " + currencySign;
    titleElement.innerText = laptops[0].title;
    descriptionElement.innerText = laptops[0].description;
    specsElement.innerText = laptops[0].specs;
    imgElement.innerText = laptops[0].image;
  }

  const addLaptopToDropDownMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
  }

const handleLaptopMenuchange = e => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  titleElement.innerText = selectedLaptop.title;
  descriptionElement.innerText = selectedLaptop.description;
  specsElement.innerText = selectedLaptop.specs;//.addSpecs(c);
  priceElement.innerText = selectedLaptop.price + " " + currencySign;
  imgElement.src = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
  
}
//function addSpecs(c){
  //foreach(let i = 0; i <7; i++){
   //il>i++</il>-
  //}
//}

laptopsElement.addEventListener("change", handleLaptopMenuchange);



//making a EventListener and a function for increasing the balance when clicking on the bankButton
bankButton.addEventListener("click", increaseBalance)

function increaseBalance() {
  
  let balance = document.getElementById("balance"); 

  if(hasLoan === false){
  
    balance.innerText = parseInt(pay.innerText) + parseInt(balance.innerText)
    document.getElementById("pay").innerText = 0 + " " + currencySign

  }
else if(hasLoan === true){

  if(parseInt(loan_to_pay.innerText) < parseInt(pay.innerText)){

    const rest = parseInt(loan_to_pay.innerText) - parseInt(pay.innerText)
    const restPlus = Math.abs(rest);

    balance.innerText = parseInt(balance.innerText) + parseInt(restPlus) + " " + currencySign

    pay.innerText = 0 + " " + currencySign
    loan_to_pay.innerText = 0 
    document.querySelector("#loan_to_pay").setAttribute("hidden", "hidden")
    document.querySelector("#repayLoanButton").setAttribute("hidden", "hidden")
}
    let ninetyPrecent = parseInt(pay.innerText) * 0.9
    balance.innerText = parseInt(balance.innerText) + ninetyPrecent;
   
    let tenPrecent = parseInt(pay.innerText) * 0.1
    loan_to_pay.innerText = parseInt(loan_to_pay.innerText) - tenPrecent

    document.getElementById("pay").innerText = 0 + " " + currencySign
  }
  
}

//Making a eventListener for the workButton to increase pay with 100 everytiskame someone click on it
workButton.addEventListener("click", increasePay)
function increasePay() {
  let pay = document.getElementById("pay");
  pay.innerText=parseInt(pay.innerText) + 100 + " " + currencySign
}

//Making an EventListener and a function 
getALoanButton.addEventListener("click", takeALoan)
function takeALoan() { 
if(Number(loan_to_pay.innerText) > 0){
     alert('You already have a loan')
     return;
    }
    if(Number(balance.innerText) == 0){
      alert("You don't have enough money");
      return;
    }
  let requestedLoan = parseInt(window.prompt("Enter the amout loan you want:", ""));
   
  if(requestedLoan > 0 && requestedLoan <= balance.innerText *2){
      alert("You want to borrow " + requestedLoan + " in loan")
      loan_to_pay.innerText = requestedLoan
      hasLoan = true;
      document.querySelector("#loan_to_pay").removeAttribute("hidden")
      document.querySelector("#repayLoanButton").removeAttribute("hidden")
    } 
  else if(requestedLoan > balance.innerText*2){
      alert("You cant take that much amount of money")
    }
  }
  
repayLoanButton.addEventListener("click", repayLoan)
function repayLoan(){
  let pay = document.getElementById("pay")
  let balance = document.getElementById("balance")

  if(parseInt(pay.innerText) === 0) {
    alert("You don't have enouth money to repay the loan")
  }

  if(parseInt(loan_to_pay.innerText) < parseInt(pay.innerText)){

    const rest = parseInt(loan_to_pay.innerText) - parseInt(pay.innerText)
    const restPlus = Math.abs(rest);

    balance.innerText = parseInt(balance.innerText) + parseInt(restPlus) + " " + currencySign

    pay.innerText = 0 + " " + currencySign
    loan_to_pay.innerText = 0 
    document.querySelector("#loan_to_pay").setAttribute("hidden", "hidden")
    document.querySelector("#repayLoanButton").setAttribute("hidden", "hidden")
}
  else if(parseInt(loan_to_pay.innerText) >= parseInt(pay.innerText)){

    loan_to_pay.innerText = parseInt(loan_to_pay.innerText) - parseInt(pay.innerText)
    pay.innerText = 0

      if(parseInt(loan_to_pay.innerText) === 0){
        document.querySelector("#loan_to_pay").setAttribute("hidden", "hidden")
        document.querySelector("#repayLoanButton").setAttribute("hidden", "hidden")
      }
}
}
buyButton.addEventListener("click", buyALaptop)
function buyALaptop(){

  if(priceElement.innerText <= balance.innerText){
    alert("You have succesfully purchased a laptop")
    balance.innerText = parseInt(balance.innerText) - parseInt(priceElement.innerText)
  }
  else if( priceElement.innerText > balance.innerText){
    alert ("You don't have enough money to buy this laptop")
  }
}
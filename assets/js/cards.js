/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Simon Worku]
 */
 let cards = {
  wallia: {
    title: 'Wallia',
    price:  25,
    minutes: 130,
    refillable: true
  },
  chellada: {
    title: 'Chellada',
    price:  20,
    minutes: 120,
    refillable: true
  },
  kebero: {
    title: 'Key Kebero',
    price:  10,
    minutes: 100,
    refillable: false
  }
};
let checkout = []; //array for checkedout cards.
let purchased = []; //array for the purchased cards
let email_subscribers = []; //array for the subscribers
let members = []; //array for the members
const buy_chellada_card = document.querySelector('#chellada');
const buy_wallia_card = document.querySelector('#wallia');
const buy_kebero_card = document.querySelector('#kebero');
let totalPrice=0;
let total=0;
let balance=0;
let totalBalance=0;
const checkout_list = document.querySelector('#checkout_list');//selecting <tbody>
/*
*updating checkout table
*
*/
const updateCheckoutTable = () => {
  //create a list to be shown on the checkout list.
  let checkout_table = "";
  if (checkout.length > 0) {
    checkout.forEach( card => {
      total = parseInt(cards[card.type].price)*parseInt(card.quantity);
      checkout_table += `<tr>
      <td>${card.type}</td>
      <td>${card.quantity}</td>
      <td>${cards[card.type].price}</td>
      <td>${total}</td>
    </tr>`;
    });
    totalPrice+=total;
    checkout_list.innerHTML = checkout_table;
    let appendRow=`<tr>
    <td></td>
    <td></td>
    <td align="right"><b>Total Price:<b></td>
    <td ><b>\$ ${totalPrice}<b></td>
    </tr>`;
    checkout_list.innerHTML+=appendRow;
  } 
}
const chellada_quantity = document.querySelector('#chellada_quantity');
const wallia_quantity=document.querySelector('#wallia_quantity');
const kebero_quantity=document.querySelector('#kebero_quantity');
//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //get the type of the card from the id itself
  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;
  const quantity = event.target.value;
  if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.
    //now the user has selected the quantity, activate the button.
    console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
wallia_quantity.addEventListener('change', (event) => quantitySelected(event));
kebero_quantity.addEventListener('change', (event) => quantitySelected(event));
let givenQuantity=0;
buy_chellada_card.addEventListener('click', () =>{
  givenQuantity=parseInt(chellada_quantity.value);
  addToCheckout('chellada',givenQuantity)
});
buy_wallia_card.addEventListener('click', () => {
  givenQuantity=parseInt(wallia_quantity.value);
  addToCheckout('wallia',givenQuantity)
});
buy_kebero_card.addEventListener('click', () => {
  givenQuantity=parseInt(kebero_quantity.value);
  addToCheckout('kebero',givenQuantity)
});
//purchased object example {type: 'chellada', quantity: 2 }
const addToCheckout = (type,givenQuantity) => {
  //get valid card types
  let valid_types = Object.keys(cards);
  let checkout_card;
  let unitPrice=0;
  let totalQuantity=0;
  if (valid_types.includes(type)) {
    //create the object for checkout here.
    if(type==="chellada"){
      quantity=parseInt(givenQuantity)
      unitPrice=cards.chellada.price;
    }
    else if(type==="wallia"){
      quantity=parseInt(givenQuantity)
      quantity=parseInt(givenQuantity)
    }
    else{
      quantity=parseInt(givenQuantity)
      unitPrice=cards.kebero.price;
    }
    checkout_card = {type: type, quantity: quantity, price:unitPrice};
    //let newQuantity=0;
    //checkout is empty for the first time. we enter the first card buy
      if(checkout.length==0){
        checkout.push(checkout_card);
        totalQuantity=parseInt(checkout_card.quantity);
        updateCartAndCheckOut(totalQuantity);
        updateBalance();
        updateCheckoutTable();
        return
      }
    else if (checkout.some(item => item.type === checkout_card.type)) {
  /* checkout contains the element we're looking for */
      checkout.forEach(item=>{
        if(item.type===checkout_card.type)
        item.quantity+=parseInt(checkout_card.quantity);
      });
    }
    else{
      checkout.push(checkout_card);
    }
    checkout.forEach(item=>{
    totalQuantity+=item.quantity;
    });
    updateCartAndCheckOut(totalQuantity);
    updateBalance();
    updateCheckoutTable();
  }
}
/* show total balnce here. Balance is zero bydefault. 
*  Then it will be updated after checkout
*/
let balance_table = `<tr>
<td></td>
<td></td>
<td align="right">Your current balance is:</td>
<td ><b> ${totalBalance} minutes<b></td>
</tr>`;
let show_balance = document.querySelector('#balance_table');//selecting balance <tbody>
show_balance.innerHTML+=balance_table;
// update balance after checkout
const updateBalance=()=>{
  checkout.forEach( card => {
    balance= parseInt(cards[card.type].minutes)*parseInt(card.quantity)
  });
  totalBalance+=balance;
  balance_table = `<tr>
    <td></td>
    <td></td>
    <td align="right">Your current balance is:</td>
    <td id="row_total_balance"><b> ${totalBalance} minutes<b></td>
    </tr>`;
    show_balance.innerHTML=balance_table;
}
function updateCartAndCheckOut(totalQuantity){
//updating checkout(0) at total balance
let updateChecout= document.querySelector('#checkout_icon');
updateChecout.innerHTML=`Checkout(${totalQuantity})<i class="ion-android-remove"></i>`;
//updating cart(0) on the top menu
let topCart= document.querySelector('#top_cart');
topCart.innerHTML=`Cart(${totalQuantity})</a></li>`;
}

/*Buy Card section
*
*/
let buyCardBtn=document.querySelector('#buy_card');
buyCardBtn.addEventListener('click',()=>{
    givenQuantity=parseInt(document.querySelector("#buy_quantity").value);
    let cardType=document.querySelector("#buy_type").value;
    addToCheckout(cardType,givenQuantity);
});
/* Membership Form
*
*/
let form=document.querySelector(".php-email-form")
let registorBtn=document.querySelector("#registor");
let fName=document.querySelector("#first_name");
let lName=document.querySelector("#last_name");
let email=document.querySelector("#email");
let phone=document.querySelector("#phone");
//form validation
registorBtn.addEventListener('click',validateInputs)
function validateInputs(){
  let membershipData="";
  let fNameValue=fName.value;
  let lNameValue=lName.value;
  let emailValue=email.value;
  let phoneValue=phone.value;
  if(fNameValue===""){
    setErrorFor(fName, "Name can not be blank");
  }
  else{
    setSuccessFor(fName);
  }
 if(lNameValue===""){
    setErrorFor(lName, "Name can not be blank");
  }
  else{
    setSuccessFor(lName);
  }
  if(emailValue===""){
  setErrorFor(email, "Email can not be blank");
  }
  else if(!isEmail(emailValue)){
    setErrorFor(email, "Invalid Email");
  }
  else{
    setSuccessFor(email);
  }
  if(!isPhone(phoneValue)){
      setErrorFor(phone, "Invalid phone number");
      return false
    }
  else{
      setSuccessFor(phone);
    }
  membershipData= {first_name: fNameValue, last_name: lNameValue, email:emailValue, phone:phoneValue};
  members.push(membershipData);
  alert(`Thank you. You are successfully registered`)
}
function setErrorFor(input, message){
  const formControl=input.parentElement;
  const small=formControl.querySelector('small');
  small.innerHTML=message;
  //add error class
  formControl.className="form-group error";
}
function setSuccessFor(input){
  const formControl=input.parentElement;
   formControl.className="form-group success";
}
function isEmail(email){
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}
function isPhone(phone){
  return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
}
/*Add Balance
*
*/
let addBtn=document.querySelector("#add_minutes");
addBtn.addEventListener('click',()=>{
  let addedMinutes=parseInt(document.querySelector('#minutes_input').value);
  let selectCard=document.querySelector('#select_card').value;
  if(totalBalance==0){
    alert("you have no balance! please buy a card first");
  }
  else{
    totalBalance+=addedMinutes;
    alert(`Thank you! Your total balance is ${totalBalance} minutes`);
    balance_table = `<tr>
    <td></td>
    <td></td>
    <td align="right">Your current balance is:</td>
    <td id="row_total_balance"><b> ${totalBalance} minutes<b></td>
    </tr>`;
    show_balance.innerHTML=balance_table;
  }
});
/*Subscribe user Email
*
*/
let subscribeBtn=document.querySelector('#subscribe_Btn');
subscribeBtn.addEventListener('click',subscribUser)

function subscribUser(){
  let userEmail=document.querySelector('#email_subscribe').value;
  if(userEmail===""){
    //setErrorFor(userEmail, "Email can not be blank");
    alert("Please enter your email");
  }
 else if(!isEmail(userEmail)){
    //setErrorFor(userEmail, "Invalid Email");
    alert("Invalid email");
  }
  else{
    //setSuccessFor(userEmail);
    alert(`Thank you. Your email: ${userEmail} is successfully subscribed.`)
    email_subscribers.push(userEmail);
    }
}
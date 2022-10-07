
function checkCashRegister(price, cash, cid) {
//     Set two separate variables for change due.
//      One will need to change but the other will need to stay constant.
  let initialChange = cash - price;
  let remainingChange = cash - price;
    
//     Get a set of nested arrays of cash denominations for the change.
//      Each one needs to have a starting value of 0 so that bills/coins can be added.
  let initialChangeDenom = cid.map(([denom, val]) => [denom, 0]);

// Set up the object that will be altered and returned.
  let toBeReturned = {status: "OPEN", change: [...initialChangeDenom]};

//   Get the grand total of cash in the register.
// (Might be redunant but w/e, the code works)
  let totalInRegister = 0;
  for (let i = 0; i < cid.length; i++) {
    totalInRegister += cid[i][1];
  }
//   Round to 2 decimal places:
  totalInRegister = totalInRegister.toFixed(2);

//   Console log to track numbers:
  console.log(`Initial total in register is ${totalInRegister}
Change due is ${initialChange}`);

// If there isn't enough money in the register to make change:
    if (initialChange > totalInRegister) {
    toBeReturned.status = "INSUFFICIENT_FUNDS";
    toBeReturned.change = [];
    return toBeReturned;
  }

//   If there's exactly enough money in the register to make change:
  if (initialChange == totalInRegister) {
    toBeReturned.status = "CLOSED",
    toBeReturned.change = cid;
    return toBeReturned;
  }

//   Need a deep copy of the initial cash in drawer to destructure from:
  let newCid = [...cid];

//   Destructure each nested array of bills/coins.
  let [penniesArr, nickelsArr, dimesArr, quartersArr, dollarsArr, fivesArr, tensArr, twentiesArr, hundosArr] = newCid;

//   Add another item to each array with the numerical denomination of the bill/coin.
  penniesArr.push(0.01);
  nickelsArr.push(0.05);
  dimesArr.push(0.1);
  quartersArr.push(0.25);
  dollarsArr.push(1);
  fivesArr.push(5);
  tensArr.push(10);
  twentiesArr.push(20);
  hundosArr.push(100);

//   Iterate backwards through each nested array in the cash-in-drawer array.
// Console-logs will track total cash in drawer, remaining change to be returned, and amounts each is being changed.
// On each pass of the outer for loop, the while loop will run if there are bills/coins of the current
// denomination left, AND if the remaining amount of change needed is greater than the value of one bill/coin,
// AND more change is still due.
// If the while loop is run, the total in register AND remaining change due will be decremented
// by the value of one bill/coin, and that value will also be added to the value of the
// corresponding nested bill/coin array within the "change" property of the "toBeReturned" object.

for (let i = newCid.length -1; i >= 0; i--) {
    console.log(`On the for-loop run for ${newCid[i]}:
      Denomination is ${newCid[i][2]}. Amount of money is ${newCid[i][1]}`)
    while (newCid[i][1] > 0 && remainingChange >= newCid[i][2] && remainingChange > 0){
    console.log(` totalInRegister is reduced
    from ${totalInRegister} by ${newCid[i][2].toFixed(2)} to ${totalInRegister-newCid[i][2]}
    remainingChange is reduced from ${remainingChange} to ${remainingChange - (newCid[i][2])}`)
    totalInRegister -= newCid[i][2];
    remainingChange -= newCid[i][2];
    remainingChange = Number(remainingChange.toFixed(2));
    console.log(`Amount in the register is changed to reflect this:
    ${newCid[i][1]} is reduced by ${newCid[i][2]} to ${newCid[i][1] - newCid[i][2]}`)
    newCid[i][1] -= newCid[i][2];
    toBeReturned.change[i][1] += newCid[i][2];
    }
}

// If remainingChange hasn't reached 0, that means either:
//     a) all values of the nested bill/coin arrays in the register have been exhausted, OR 
//      b) some bills/coins were skipped because they were too large to make exact change,
//         and all the smaller bills/coins ran out before reaching exact change.
// If either of these are the case, there aren't sufficient funds to make exact change,
// so the following if branch runs and modifies toBeReturned's properties to the relevant values.
if (remainingChange > 0) {
  toBeReturned.status = "INSUFFICIENT_FUNDS";
  toBeReturned.change = [];
  return toBeReturned;
}

// Reversing the order of the array because apparently FCC's code-checker wants this to be the order.
// All of the values of change denominations have now been pushed into the relevant
// nested bill/coin arrays within the "change" property.
toBeReturned.change = toBeReturned.change.filter(item => item[1] > 0).reverse();
  return toBeReturned;
} 

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
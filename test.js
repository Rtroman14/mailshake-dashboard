const { responseStatus } = require("./functions/utils/helpers");
const { coldPhrase, coldWord, wrongInfo } = require("./functions/utils/keywords");

const response = "remove me";

const status = responseStatus(response);

console.log(status);

// let coldRe = new RegExp(coldPhrase, "i");

// if (coldRe.test(response)) {
//     console.log("Cold");
// }

// console.log(coldPhrase);

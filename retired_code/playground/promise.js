var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("Arguments must be numbers");
      }
    }, 1500);
  });
}

asyncAdd(7,"2").then((res) => {
  console.log("Result:", res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log("Should be 42", res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve/*when promise is fulfilled*/,reject/*hey, we tried to make it happen (fulfill the promise), but it just didn't work*/) => {
//   setTimeout(() => {
//     resolve("Hey it worked!");
//     reject("Unable to fulfill promise");
//   }, 2000);
// });
//
// somePromise.then(
//   /*this function fires when resolve works*/
//   (message) => {
//   console.log("Success:", message);
// },
// /*and this function works if reject works, i.e. an error happened*/
// (errorMessage) => {
//   console.log("Error: ", errorMessage);
// });

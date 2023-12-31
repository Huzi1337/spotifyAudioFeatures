// // let arr = ["1", "2", "3", "4", "5"];

// // const dummyFun = async (word) => {
// //   console.log("Started func");
// //   let gas = await new Promise((resolve) => {
// //     setTimeout(() => {
// //       console.log(`Resolving promise for ${word}`);
// //       resolve(word);
// //     }, 2000);
// //   });
// //   return gas;
// // };

// // // arr.forEach(async (element, i) => {
// // //   console.log(`Loop ${i + 1}`);
// // //   await dummyFun(element);
// // // });

// // for (let i = 0; i < arr.length; i++) {
// //   console.log(`Loop ${i + 1}`);
// //   dummyFun(arr[i]);
// // }

// const taskTest = () => {
//   console.log("2");

//   new Promise((resolve) => {
//     resolve(console.log("4"));
//   });
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(console.log("3"));
//     });
//   });
//   setTimeout(() => console.log("1"));
// };

// let testString = "3ab+14ba-13ab-3c-2b+4c-3b";

// const simplify = (equation) => {
//   let monomials = {};
//   console.log("split", equation.split(/(?=[\+-])/));
//   for (const term of equation.split(/(?=[\+-])/)) {
//     let isPositive = term.match("-") ? -1 : 1;
//     let monomial = term
//       .match(/[a-zA-Z]+$/g)[0]
//       .split("")
//       .sort()
//       .join("");
//     let count = term.match(/[0-9]+/g)[0];
//     monomials[monomial] =
//       (monomials[monomial] || 0) + (Number(count) || 1) * isPositive;
//   }
//   return Object.entries(monomials)
//     .map(([key, value], i) =>
//       i > 0 && value > 0 ? "+" + value + key : value + key
//     )
//     .join("");
// };

// let map = new Map();
// map.set(1, "a");
// map.set(2, "b");
// map.set(3, "c");
// let obj = {};
// console.log([...map.entries()]);

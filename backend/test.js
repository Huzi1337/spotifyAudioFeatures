// let arr = ["1", "2", "3", "4", "5"];

// const dummyFun = async (word) => {
//   console.log("Started func");
//   let gas = await new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Resolving promise for ${word}`);
//       resolve(word);
//     }, 2000);
//   });
//   return gas;
// };

// // arr.forEach(async (element, i) => {
// //   console.log(`Loop ${i + 1}`);
// //   await dummyFun(element);
// // });

// for (let i = 0; i < arr.length; i++) {
//   console.log(`Loop ${i + 1}`);
//   dummyFun(arr[i]);
// }

const taskTest = () => {
  console.log("2");

  new Promise((resolve) => {
    resolve(console.log("4"));
  });
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("3"));
    });
  });
  setTimeout(() => console.log("1"));
};

let res = [1, 2, 3].slice(3);
console.log(res);

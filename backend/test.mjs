let arr = ["1", "2", "3", "4", "5"];

const dummyFun = async (word) => {
  console.log("Started func");
  let gas = await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Resolving promise for ${word}`);
      resolve(word);
    }, 2000);
  });
  return gas;
};

// arr.forEach(async (element, i) => {
//   console.log(`Loop ${i + 1}`);
//   await dummyFun(element);
// });

for (let i = 0; i < arr.length; i++) {
  console.log(`Loop ${i + 1}`);
  dummyFun(arr[i]);
}

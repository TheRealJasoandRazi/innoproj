// fetch(`http://192.168.160.133:4000/auth`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ username: "JohnDoe", password: "password0" }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// fetch("http://127.0.0.1:4000/assets/2000")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// fetch("http://127.0.0.1:4000/transactions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ wallet: "0xE65B318b9dECf504d1cb6Ea5C367Ca657a070Db1" }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// fetch("http://127.0.0.1:4000/InputValueTest", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ inputValue: "test" }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// fetch(`http://192.168.160.133:4000/create-transaction`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ buyer: 10001, assets: [1738, 1740, 1789] }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

fetch(`http://192.168.160.133:4000/assets`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    startIndex: 100,
    count: 20,
    id: 10001,
    sortPrice: "a",
    sortRarity: "d",
    background: "green",
    owner: "",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    data.data.map((i)=>{
      console.log(i);
    })
  })
  .catch((error) => {
    console.error("Error:", error);
  });

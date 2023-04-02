
function onLoadCartItems() {
	let productNumbers = localStorage.getItem("itemNumbers");
	if (productNumbers > 0) {
		document.querySelector(".header-menu span").textContent = productNumbers;
	} else {
		document.querySelector(".header-menu span").textContent = "";
	}
}

onLoadCartItems();



const data = JSON.parse(localStorage.getItem('signIn'))
const userData = JSON.parse(localStorage.getItem('user'))
// console.log("data")
let output = ""
for(i in data){
    for(j in userData){
        if (data[i].userid === userData[j].uName) {
            // console.log('display')
           output = `<img class="menu-img" src="${data[i].filename}"/>`
            document.getElementById('showName').innerHTML = "Hi! " + data[i].fname + "...!"
        }
    }
}




// append data from api


const url = `https://fitness-blender-clone.onrender.com/data`;
console.log(url);

let menuContainer = document.getElementById("main");
let alertEl = document.getElementById("alert");

let sortInp = document.getElementById("sort");
let filterBtn = document.getElementById("filter-btn");
let filterInpLow = document.getElementById("lower");
let filterInpHigh = document.getElementById("upper");

let allData = [];
const visitedData = JSON.parse(localStorage.getItem("wishList")) || [];

window.addEventListener("load", () => {
  fetchData(url);
});

async function fetchData(url) {
  try {
	let res = await fetch(url);
	res = await res.json();
	// console.log(res);
	// allData = res;
	console.log(res);
	displayTable(res);
	allData = res;

  } catch (error) {
	console.log(error);
  }
}
// fetchData(url);

function displayTable(data) {
  menuContainer.innerHTML = "";
  data.forEach((ele, index) => {
	const div = document.createElement("div");
	div.setAttribute("class", "div");
	const img = document.createElement("img");
	img.setAttribute("src", ele.img);
	const description = document.createElement("h2");
	description.innerText = ele.desc;
	const title = document.createElement("p");
	title.innerText = ele.title;
	const duration = document.createElement("p");
	duration.innerText = ele.duration;
	const price = document.createElement("h3");
	price.innerText = "$" + ele.price;
	const buyBtn = document.createElement("button");
	buyBtn.innerText = "Buy Now";
	addToCart(buyBtn, ele, index);

	div.append(img, description,title, duration, price, buyBtn);
	menuContainer.append(div);
  });
}

filterBtn.addEventListener("click", () => {
	console.log(filterBtn)
  const filterData = allData.filter((ele) => {
	// console.log(filterData);
	console.log(allData)

	if (
	  +ele.price >= +filterInpLow.value &&
	  +ele.price <= +filterInpHigh.value
	) {
	  return true;
	} else {
	  return false;
	}
  });
  console.log(filterData);
  displayTable(filterData);
});

// let array = [];
sortInp.addEventListener("change", () => {
	console.log(sortInp);
  if (sortInp.value === "") {
	// allData.sort((a,b)=>a.price - b.price);
	displayTable(allData);
  } else if (sortInp.value === "asc") {
	console.log(sortInp.value);
	allData.sort((a,b)=>a.price - b.price);
	displayTable(allData);
	// const url =
	//   "https://fitness-blender-clone.onrender.com/data?sort=price&order=asc";
	// fetchData(url);
  } else {
	allData.sort((a,b)=>b.price - a.price);
	displayTable(allData);
	// const url =
	//   "https://fitness-blender-clone.onrender.com/data?sort=price&order=desc";
	// fetchData(url);
  }
});

// sortInp.addEventListener("change",()=>{
// 	if(sortInp.value === "") {
// 		displayTable(allData);
// 	} else if(sortInp.value === "asc") {

// 	}
// })

function addToCart(buyBtn, obj) {
  buyBtn.addEventListener("click", () => {
	console.log(buyBtn)
	if (visitedData.length > 0) {
	  let flag = true;
	  visitedData.forEach((ele) => {
		if (ele.id === obj.id) {
		  alertEl.innerText = "Already In Cart";
		  flag = false;
		}
	  });
	  if (flag) {
		obj.quantity = 1;
		visitedData.push(obj);
		localStorage.setItem("wishList", JSON.stringify(visitedData));
		alertEl.innerText = "Product Added To Cart";
	  }
	} else {
	  obj.quantity = 1;
	  visitedData.push(obj);
	  localStorage.setItem("wishList", JSON.stringify(visitedData));
	  alertEl.innerText = "Product Added To Cart";
	}
  });
}

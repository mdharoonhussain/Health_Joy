
let order_container = document.querySelector("#order-container");
console.log(order_container);
let orderTotal = document.getElementById("total-amount");
let visitedData = JSON.parse(localStorage.getItem("wishList")) || [];
console.log(visitedData);
displayTable(visitedData);


function displayTable(data) {
	order_container.innerHTML = "";
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
	price.innerText = ele.price;
	const quantity = document.createElement("span");
	const Remove = document.createElement("button");
	const Increment = document.createElement("button");
	const Decrement = document.createElement("button");
	quantity.innerText = ele.quantity;
	Remove.innerText = "Cancel";
	Increment.textContent = "+";
	Decrement.innerText = "-";
	Remove.addEventListener("click", () => {
	  visitedData = visitedData.filter((ele1) => {
		return ele1.id !== ele.id;
	  });
	  localStorage.setItem("wishList", JSON.stringify(visitedData));
	  displayTable(visitedData);
	});
	Increment.addEventListener("click", () => {
	  ele = ele.quantity++;
	  localStorage.setItem("wishList", JSON.stringify(visitedData));
	  displayTable(visitedData);
	});
	Decrement.addEventListener("click", () => {
	  if (ele.quantity > 1) {
		ele = ele.quantity--;
		localStorage.setItem("wishList", JSON.stringify(visitedData));
		displayTable(visitedData);
	  }
	});
	div.append(
	  img,
	  description,
	  title,
	  duration,
	  price,
	  Increment,
	  quantity,
	  Decrement,
	  Remove
	);
	order_container.append(div);
  });

  let sum = 0;
  for (let i = 0; i < visitedData.length; i++) {
	sum += visitedData[i].price * visitedData[i].quantity;
    console.log(sum.toFixed(2));
  }
  orderTotal.innerText = sum;
}

const couponCode = document.querySelector("#coupon > input");
const couponBtn = document.querySelector("#coupon > button");
let flag = true;
couponBtn.addEventListener("click", () => {
  if (couponCode.value === "healthjoy23" && flag) {
	console.log(orderTotal.innerText)
	let withoutDiscount = +orderTotal.innerText;
	let afterDiscount = withoutDiscount - withoutDiscount*0.3;
	flag = false;
	orderTotal.innerText =Number(afterDiscount).toFixed(2);
  }
});
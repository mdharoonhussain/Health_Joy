let bagContainer = document.querySelector(".bag-cont");
let emptyMessage = document.querySelector(".empty-shopping-bag");
let checkoutButton = document.querySelector(".proceed-to-checkout");
function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	if (cartItems) {
		let productList = document.querySelector(".bag-list");
		console.log(cartItems);
		productList.innerHTML = "";
		let sum = 0;
		Object.values(cartItems).map((item) => {
			sum += item.price;
			productList.innerHTML += `
			<div class="bag-iteemm">
				<div class="bag-item-name">
					<div class="bag-item-name-img">
						<img src=${item.img} alt="">
					</div>
					<div class="bag-item-name-text">
						<h3>${item.name}</h3>
					</div>
				</div>
				<button class="bag-item-remove" onClick="deleteItem(this.name)" name="${
					item.tag
				}"><i class="fas fa-times"></i></button>
				<div class="bag-item-price"><h3>$${String(item.price)}</h3></div>
			</div>
			<hr>
        `;
		});
		sum = (sum * 100) / 100;
		if (sum == 0) {
			bagContainer.style.display = "none";
			emptyMessage.style.display = "block";
		}
		console.log(sum);
		document.querySelector(".tot-amount").textContent = "$" + String(sum);
	}
}

function onLoadCartItems() {
	let productNumbers = localStorage.getItem("itemNumbers");
	if (productNumbers > 0) {
		document.querySelector(".header-menu span").textContent = productNumbers;
	} else {
		document.querySelector(".header-menu span").textContent = "";
	}
}

function deleteItem(item) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	console.log(cartItems);
	delete cartItems[item];
	localStorage.removeItem("productsInCart");
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	let productNumbers = localStorage.getItem("itemNumbers");
	productNumbers = Number(productNumbers);
	localStorage.setItem("itemNumbers", productNumbers - 1);
	displayCart();
	onLoadCartItems();
}

displayCart();
onLoadCartItems();





const data = JSON.parse(localStorage.getItem('signIn'))
const userData = JSON.parse(localStorage.getItem('user'))
let output = ""
for(i in data){
    for(j in userData){
        if (data[i].userid === userData[j].uName) {
           output = `<img class="menu-img" src="${data[i].filename}"/>`
            document.getElementById('showName').innerHTML = "Hi! " + data[i].fname + "...!"
        }
    }
}
document.getElementById('menu-img').innerHTML = output

function displayFavourites() {
	let myProducts = localStorage.getItem("boughtProducts");
	myProducts = JSON.parse(myProducts);
	if (myProducts) {
		let myProductContainer = document.querySelector(".main");
		console.log(myProductContainer);
		myProductContainer.innerHTML = "";
		Object.values(myProducts).map((data) => {
			myProductContainer.innerHTML += `
            <div class="card">
				<div class="card__img">
					<img
						src="${data.img}"
						alt=""
					/>
				</div>
				<div class="card__content">
					<p>CORE - ${data.time} MIN</p>
					<h4>${data.name}</h4>
				</div>
			</div>
        `;
		});
	}
}

displayFavourites();



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

document.getElementById('menu-img').innerHTML = output

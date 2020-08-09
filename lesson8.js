let basket = {
	products: [],
	basketText: function () {
		if (this.products.length === 0) {
			return "Ваша корзина пуста";
		} else {
			return "В корзине: " + this.countBasketCount() + " товар(ов) на сумму " + this.countBasketPrice() + " рублей";
		}
	},
	countBasketPrice: function () {
		let sum = 0;
		for (let i = 0; i < this.products.length; i++) {
			sum = sum + this.products[i].price * this.products[i].count;
		}
		return sum;
	},
	countBasketCount: function () {
		let sum = 0;
		for (let i = 0; i < this.products.length; i++) {
			sum = sum + this.products[i].count;
		}
		return sum;
	},
	addProduct: function (product) {
		let foundProduct = this.products.find(x => x.id === product.id);
		if (foundProduct === undefined) {
			this.products.push(product);
		} else {
			++foundProduct.count;
		}
		localStorage.setItem("myCart", JSON.stringify(this.products));
	}
}
products = [];
productImg = [];
$modalImg = "";
$modalOverlay = "";

window.addEventListener("load", init);

function init() {

	basket.products = [];

	cartProducts = JSON.parse(localStorage.getItem("myCart"));
	if (cartProducts.length > 0) {
		basket.products = cartProducts;
	}

	$cart = document.getElementById("cart");
	$cart.classList.add("cart");
	displayText($cart, basket.basketText());

	products = [
		{
			name: 'Лыжи (190 см)',
			price: 9200,
			count: 1,
			src: "img/лыжи.jpg",
			id: 0
		},
		{
			name: 'Палки лыжные (155 см)',
			price: 2500,
			count: 1,
			src: "img/палки.jpg",
			id: 1
		},
		{
			name: 'Ботинки лыжные (р. 44)',
			price: 4300,
			count: 1,
			src: "img/ботинки.jpg",
			id: 2
		},
		{
			name: 'Крепление для лыж SNS',
			price: 1400,
			count: 1,
			src: "img/крепление.jpg",
			id: 3
		},
    ];

	productImg = [
		{
			src: ["img/лыжи.jpg", "img/лыжи-2.jpg"],
			id: 0
		},
		{
			src: ["img/палки.jpg", "img/палки-2.jpg"],
			id: 1
		},
		{
			src: ["img/ботинки.jpg", "img/ботинки-2.jpg"],
			id: 2
		},
		{
			src: ["img/крепление.jpg", "img/крепление-2.jpg"],
			id: 3
		},
    ];

	displayCatalog(products);

	let $catalog = document.querySelector("#catalog");
	$catalog.addEventListener('click', handleCatalogClick);

	$modalImg = document.getElementById('modal-img');
	$modalOverlay = document.querySelector("#modal-overlay"),

		window.addEventListener('keydown', handleImgChange);

	$closeButton = document.querySelector("#close-button");
	$closeButton.addEventListener("click", handleModalClick);

	$leftButton = document.querySelector("#left-button");
	$leftButton.addEventListener("click", handleLeftClick);

	$rightButton = document.querySelector("#right-button");
	$rightButton.addEventListener("click", handRightClick);


}

function handleImgChange(event) {
	switch (event.code) {
		case 'ArrowLeft':
			idImg = +$modalImg.dataset.idImg - 1;
			displayProductImg($modalImg.dataset.id, idImg);
			break;
		case 'ArrowRight':
			idImg = +$modalImg.dataset.idImg + 1;
			displayProductImg($modalImg.dataset.id, idImg);
	}
}

function handleModalClick(event) {
	$modalOverlay.classList.toggle("closed");
}

function handleLeftClick(event) {
	idImg = +$modalImg.dataset.idImg - 1;
	displayProductImg($modalImg.dataset.id, idImg);
}

function handRightClick(event) {
	idImg = +$modalImg.dataset.idImg + 1;
	displayProductImg($modalImg.dataset.id, idImg);
}

function displayProductImg(id, idImg) {

	var id = id;
	let foundProductImg = productImg.find(x => x.id === id);
	if (foundProductImg != undefined) {
		src = foundProductImg.src[idImg];
		if (src != undefined) {
			$modalImg.innerHTML = "";
			let $productImg = document.createElement("img");
			$productImg.classList.add("productImg");
			$productImg.src = src;
			$modalImg.dataset.id = id;
			$modalImg.dataset.idImg = idImg;
			$modalImg.appendChild($productImg);
		}
	}

	$rightButton = document.querySelector("#right-button");
	if (foundProductImg.src[idImg + 1] === undefined) {
		$rightButton.disabled = true;
	} else {
		$rightButton.disabled = false;
	}

	$leftButton = document.querySelector("#left-button");
	if (foundProductImg.src[idImg - 1] === undefined) {
		$leftButton.disabled = true;
	} else {
		$leftButton.disabled = false;
	}
}

function handleCatalogClick(event) {
	if (event.target.tagName === "BUTTON") {
		let id = event.target.dataset.id;
		let foundProduct = products.find(x => x.id == id);
		if (foundProduct != undefined) {
			basket.addProduct(foundProduct);
			$cart = document.getElementById("cart");
			$cart.classList.add("cart");
			displayText($cart, basket.basketText());
		}
	} else if (event.target.tagName === "IMG") {
		$modalOverlay.classList.toggle("closed");
		displayProductImg(event.target.dataset.id, 0)
	}
}

function displayText($dom, text) {
	$dom.textContent = text;
}

function displayCatalog(products) {

	let $catalog = document.getElementById("catalog");

	for (let i = 0; i < products.length; i++) {

		let $template = document.querySelector("#template").children[0].cloneNode(true);

		$template.querySelector(".productName").textContent = products[i].name;
		$template.querySelector(".productImg").src = products[i].src;
		$template.querySelector(".productImg").dataset.id = products[i].id;
		$template.querySelector(".productPrice").textContent = products[i].price;
		$template.querySelector(".productButton").textContent = "добавить в корзину";
		$template.querySelector(".productButton").dataset.id = products[i].id;

		$catalog.appendChild($template);
	}
	displayText($cart, basket.basketText());
}

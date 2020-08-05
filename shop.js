let basket = {
	// массив товаров в корзине
	products: [],
	// возвращент текущее представление корзины
	basketText: function () {
		if (this.products.length == 0) {
			return "Ваша корзина пуста";
		} else {
			return "В корзине: " + this.countBasketCount() + " товаров на сумму " + this.countBasketPrice() + " рублей";
		}
	},
	// возвращает сумму корзины
	countBasketPrice: function () {
		let sum = 0;
		for (let i = 0; i < this.products.length; i++) {
			sum = sum + this.products[i].price * this.products[i].count;
		}
		return sum;
	},
	// возвращает количество товара в корзине
	countBasketCount: function () {
		let sum = 0;
		for (let i = 0; i < this.products.length; i++) {
			sum = sum + this.products[i].count;
		}
		return sum;
	},

	//  добавляет товар в корзину
	addProduct: function (product) {
		// ищем товар в корзине
		let foundProduct = this.products.find(x => x.id == product.id);
		// если в корзине нет нужного товара то добавляем его
		if (foundProduct === undefined) {
			this.products.push(product);
			// если товар уже есть в корзине, то добавляем к найденой позиции количество (count + 1)
		} else {
			++foundProduct.count;
		}
	}
}

window.addEventListener("load", init);

// функция вызывается при загрузке страницы
function init() {

	// выводим пустую корзину
	basket.products = [];
	$truck = document.getElementById("truck");
	$truck.classList.add("truck");
	displayText($truck, basket.basketText());

	// заполняем каталог товаров
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
			name: 'Ботинки для лыж (раз. 44)',
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

	// выводим каталог товаров
	displayCatalog(products);

	// создаем подписку на событие клик по каталогу
	let $catalog = document.querySelector("#catalog");
	$catalog.addEventListener('click', handleCatalogClick);
}

// функция обработки события клика по каталогу
function handleCatalogClick(event) {
	// проверяем что нажали на кнопку
	if (event.target.tagName === "BUTTON") {
		// ищем товар в каталоге по идентификатору
		let id = event.target.dataset.id;
		let foundProduct = products.find(x => x.id == id);
		// если товар найден то добавляем его в корзину
		if (foundProduct != undefined) {
			basket.addProduct(foundProduct);
			// обновляем текст корзины на странице
			$truck = document.getElementById("truck");
			$truck.classList.add("truck");
			displayText($truck, basket.basketText());
		}
		// если нажали на картинку товара
	} else if (event.target.tagName === "IMG") {
		// облокируем modalOverlay (display: block;) 
		$modalOverlay.classList.toggle("closed");
		// выводим первую картитнку товара 
		displayProductImg(event.target.dataset.id, 0)
	}
}

// функция выводит текст в заданный элемент
function displayText($dom, text) {
	$dom.textContent = text;
}

// функция генерит каталог товаров на странице
function displayCatalog(products) {

	// ищем каталог
	$productBox = document.getElementById("catalog");
	$productBox.classList.add("catalog");

	// выводим информацию о каждом товаре из каталога
	for (let i = 0; i < products.length; i++) {

		let $product = document.createElement("div");
		$product.classList.add("product");

		let $productName = document.createElement("div");
		$productName.classList.add("productName");

		let $productImg = document.createElement("img");
		$productImg.classList.add("productImg");

		let $productPrise = document.createElement("div");
		$productPrise.classList.add("productPrise");

		let $productButton = document.createElement("button");
		$productButton.classList.add("productButton");

		$productName.textContent = products[i].name;
		$productImg.src = products[i].src;
		// в $productImg.dataset записываем id товара
		$productImg.dataset.id = products[i].id;
		$productPrise.textContent = products[i].price;
		$productButton.textContent = "добавить в корзину";
		// в $productButton.dataset записываем id товара
		$productButton.dataset.id = products[i].id;

		$productBox.appendChild($product);
		$product.appendChild($productName);
		$product.appendChild($productImg);
		$product.appendChild($productPrise);
		$product.appendChild($productButton);
	}
	displayText($truck, basket.basketText());
}

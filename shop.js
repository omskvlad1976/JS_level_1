let basket = {
	products: [],
	basketText: function () {
		if (this.products.length == 0) {
			return "Корзина пуста";
		} else {
			return "В корзине: " + this.countBasketCount() + " товаров на сумму " + this.countBasketPrice() + " рублей";
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
	}
}

function displayText($dom, text) {
	$dom.textContent = text;
}

let products = [
	{
		name: 'Лыжи (190 см)',
		price: 9200,
		count: 1
    },
	{
		name: 'Палки лыжные (155 см)',
		price: 2500,
		count: 1
    },
	{
		name: 'Ботинки для лыж (р.44)',
		price: 4300,
		count: 1
    },
	{
		name: 'Крепление для лыж SNS',
		price: 1400,
		count: 1
        },
];
basket.products = products;

$truck = document.getElementById("truck");
$truck.classList.add("truck");

displayText($truck, basket.basketText());

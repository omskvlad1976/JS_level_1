let currentPage = 1;

window.addEventListener("load", init);

function init() {

	cartProducts = JSON.parse(localStorage.getItem("myCart"));

	displayCart(cartProducts);

	let $order = document.querySelector("#order");
	$order.addEventListener('click', handleLeftRightClick);

	updateOrder();

	if (cartProducts.length === 0) {
		document.querySelector("#buttonRight").disabled = true;
	} else {
		document.querySelector("#buttonRight").disabled = false;
	}


}

function handleLeftRightClick(event) {
	if (event.target.tagName === "BUTTON") {
		if (event.target.textContent === "далее") {
			++currentPage;
		} else if (event.target.textContent === "назад") {
			--currentPage;
		} else if (event.target.textContent === "завершить") {
		}
		updateOrder();
	}
}

function updateOrder() {
	let $cart = document.querySelector("#cart");
	let $address = document.querySelector("#address");
	let $comment = document.querySelector("#comment");
	console.log($cart.style.display);

	$cart.style.display = "none"
	$address.style.display = "none"
	$comment.style.display = "none"


	switch (currentPage) {
		case 1:
			$cart.style.display = "block";
			document.querySelector("#buttonLeft").disabled = true;;
			break;
		case 2:
			$address.style.display = "block";
			document.querySelector("#buttonLeft").disabled = false;;
			document.querySelector("#buttonRight").disabled = false;;
			document.querySelector("#buttonRight").textContent = "далее";
			break;
		case 3:
			$comment.style.display = "block";
			document.querySelector("#buttonRight").textContent = "завершить";
			break;
	}
}

function handleCartsClick(event) {
	if (event.target.tagName === "BUTTON") {
		let id = event.currentTarget.dataset.id;
		if (event.target.textContent === "-") {
			let foundProduct = cartProducts.find(x => x.id == id);
			if (foundProduct != undefined) {
				--foundProduct.count;
				if (foundProduct.count === 0) {
					let index = cartProducts.indexOf(foundProduct);
					if (index >= 0) {
						cartProducts.splice(index, 1);
						event.currentTarget.remove();
					}
				} else {
					event.currentTarget.querySelector(".count").textContent = foundProduct.count;
					event.currentTarget.querySelector(".sum").textContent = +foundProduct.price * foundProduct.count;
				}
				localStorage.setItem("myCart", JSON.stringify(cartProducts));
			}
		} else if (event.target.textContent === "+") {
			let foundProduct = cartProducts.find(x => x.id == id);
			if (foundProduct != undefined) {
				++foundProduct.count;
				event.currentTarget.querySelector(".count").textContent = foundProduct.count;
				event.currentTarget.querySelector(".sum").textContent = +foundProduct.price * foundProduct.count;
				localStorage.setItem("myCart", JSON.stringify(cartProducts));
			}
		} else if (event.target.textContent === "удалить") {
			let foundProduct = cartProducts.find(x => x.id == id);
			if (foundProduct != undefined) {
				let index = cartProducts.indexOf(foundProduct);
				if (index >= 0) {
					cartProducts.splice(index, 1);
					event.currentTarget.remove();
					localStorage.setItem("myCart", JSON.stringify(cartProducts));
				}
			}
		}

		if (cartProducts.length === 0) {
			document.querySelector("#buttonRight").disabled = true;
		} else {
			document.querySelector("#buttonRight").disabled = false;
		}
	}
}

function displayCart(products) {

	let $cart = document.getElementById("cart");

	for (let i = 0; i < products.length; i++) {

		let $template = document.querySelector("#template").children[0].cloneNode(true);

		$template.querySelector(".productName").textContent = products[i].name;
		$template.querySelector(".productImg").src = products[i].src;
		$template.querySelector(".count").textContent = products[i].count;
		$template.querySelector(".productPrice").textContent = products[i].price;
		$template.querySelector(".productButtonAdd").textContent = "+";
		$template.querySelector(".productButtonRem").textContent = "-";
		$template.querySelector(".sum").textContent = +products[i].price * products[i].count;
		$template.querySelector(".productButtonDel").textContent = "удалить";
		$template.dataset.id = products[i].id;
		$cart.appendChild($template);

		$template.addEventListener('click', handleCartsClick);

	}
}

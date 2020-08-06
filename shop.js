// объект корзина
var basket = {
    // массив товаров в корзине
    products: [],
    // возвращает текущее представление корзины
    basketText: function(){
        if (this.products.length == 0){
            return "Ваша корзина пуста";
        } else{
            return "В корзине: " + this.countBasketCount() + " товар(ов) на сумму " + this.countBasketPrice() + " рублей";    
        }
    },
    // возвращает сумму корзины
    countBasketPrice: function(){
        var sum = 0;
        for(var i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].price * this.products[i].count;
        }
        return sum;
    },
    // возвращает количество товара в корзине
    countBasketCount: function(){
        var sum = 0;
        for(var i = 0; i < this.products.length; i++){
            sum = sum + this.products[i].count;
        }
        return sum;
    },

    //  добавляет товар в корзину
    addProduct: function(product){
        // ищем товар в корзине
        var foundProduct = this.products.find(x => x.id == product.id); 
        // если в корзине нет нужного товара то добавляем его
        if ( foundProduct === undefined){
            this.products.push(product);
        // если товар уже есть в корзине, то добавляем к найденой позиции количество (count + 1)
        } else{
            ++foundProduct.count;    
        }
        // для передачи корзины между файлами
        localStorage.setItem("myCart", JSON.stringify(this.products));

    }
}
// массив товаров в каталоге
products = [];
// массив картинок товара
productImg = [];
// модальное окно в котором будет картинка товара
$modalImg = "";
//область наложения при открытии модального окна
$modalOverlay = "";

window.addEventListener("load",init);

// функция вызывается при загрузке страницы
function init(){

    // выводим пустую корзину
    basket.products = [];

    // для передачи корзины между файлами
    // если открываем страницу с не пустой корзиной
    cartProducts = JSON.parse(localStorage.getItem("myCart"));
//    if (cartProducts.length > 0){
//        basket.products = cartProducts;
//    }

    $cart = document.getElementById("cart");
    $cart.classList.add("cart");    
    displayText($cart,basket.basketText());

    // заполняем каталог товаров
    products = [
        {name: 'Лыжи (190 см)', price: 9200, count: 1, src:"img/лыжи.jpg", id: 0}, 
        {name: 'Палки лыжные (155 см)', price: 2500, count: 1, src:"img/палки.jpg", id: 1}, 
        {name: 'Ботинки для лыж (р. 44)', price: 4300, count: 1, src:"img/ботинки.jpg", id: 2},
		{name: 'Крепление для лыж SNS', price: 1400, count: 1, src:"img/крепление.jpg", id: 3},
    ];

    // заполняем картинки товаров. У каждого товара может быть несколько картинок
    productImg = [
        {src: ["img/лыжи-1.jpg", "img/лыжи-2.jpg"], id: 0},
        {src: ["img/палки-1.jpg", "img/палки-2.jpg"], id: 1}, 
        {src: ["img/ботинки-1.jpg", "img/ботинки-2.jpg"], id: 2}, 
		{src: ["img/крепление-1.jpg", "img/крепление-2.jpg"], id: 3},
    ];
    
    // выводим каталог товаров
    displayCatalog(products);

    // создаем подписку на событие клик по каталогу
    var $catalog = document.querySelector("#catalog");
    $catalog.addEventListener('click', handleCatalogClick);

    // модальное окно
    $modalImg = document.getElementById('modal-img');
    $modalOverlay = document.querySelector("#modal-overlay"),

    window.addEventListener('keydown', handleImgChange);

    // кнопка закрытия модального окна
    $closeButton = document.querySelector("#close-button");
    $closeButton.addEventListener("click", handleModalClick);

    // кнопка прокрутки картинок влево
    $leftButton = document.querySelector("#left-button");
    $leftButton.addEventListener("click", handleLeftClick);

    // кнопка прокрутки картинок вправо
    $rightButton = document.querySelector("#right-button");
    $rightButton.addEventListener("click", handRightClick);


}

function handleImgChange(event) {
    switch(event.code) {
      case 'ArrowLeft':
        // уменьшаем индекс картинки
        idImg = +$modalImg.dataset.idImg -1;
        displayProductImg($modalImg.dataset.id, idImg);
        break;
      case 'ArrowRight':
        // увеличиваем индекс картинки
        idImg = +$modalImg.dataset.idImg +1;
        displayProductImg($modalImg.dataset.id, idImg);
    }
  }

// функция закрывает модельное окно
function handleModalClick(event){
    $modalOverlay.classList.toggle("closed");   
}

// функция прокрутки картинок влево
function handleLeftClick(event){
    // уменьшаем индекс картинки
    idImg = +$modalImg.dataset.idImg -1;
    displayProductImg($modalImg.dataset.id, idImg);
}

// функция прокрутки картинок вправо
function handRightClick(event){
    // увеличиваем индекс картинки
    idImg = +$modalImg.dataset.idImg +1;
    displayProductImg($modalImg.dataset.id, idImg);
}

// функция показывает картнку товара в модальном окне
function displayProductImg(id, idImg){

    var id = id;
    // Ищем массив картинок товара по id товара
    var foundProductImg = productImg.find(x => x.id == id);
    if (foundProductImg != undefined){
        // берем картинку из массива картинок товара по idImg (индекс картинки)
        src = foundProductImg.src[idImg];
        // если картинки есть
        if (src != undefined){
            // очищаем modalImg
            $modalImg.innerHTML = "";
            // добавляем картинку
            var $productImg = document.createElement("img");
            $productImg.classList.add("productImg");
            $productImg.src = src;
            // сохранием текущий индекс товара id и индекс картинки товара idImg
            $modalImg.dataset.id = id;
            $modalImg.dataset.idImg = idImg;
            $modalImg.appendChild($productImg);          
        }
    }

    // проверяем наличие картинки товара для idImg + 1
    // если нет, то блокируем кнопку >>>
    $rightButton = document.querySelector("#right-button");
    if (foundProductImg.src[idImg + 1] === undefined){
        $rightButton.disabled = true;
    }else{
        $rightButton.disabled = false;
    }

    // проверяем наличие картинки товара для idImg - 1
    // если нет, то блокируем кнопку <<<
    $leftButton = document.querySelector("#left-button");
    if (foundProductImg.src[idImg - 1] === undefined){
        $leftButton.disabled = true;
    } else{
        $leftButton.disabled = false;
    }
}

// функция обработки события клика по каталогу
function handleCatalogClick(event){
    // проверяем что нажали на кнопку
    if (event.target.tagName === "BUTTON"){
        // ищем товар в каталоге по идентификатору
        var id = event.target.dataset.id;
        var foundProduct = products.find(x => x.id == id);
        // если товар найден то добавляем его в корзину
        if (foundProduct != undefined){
            basket.addProduct(foundProduct);
            // обновляем текст корзины на странице
            $cart = document.getElementById("cart");
            $cart.classList.add("cart");    
            displayText($cart,basket.basketText());
        }
    // если нажали на картинку товара
    } else if (event.target.tagName === "IMG"){
        // облокируем modalOverlay (display: block;) 
        $modalOverlay.classList.toggle("closed");
        // выводим первую картитнку товара 
        displayProductImg(event.target.dataset.id, 0)
    }
}

// функция выводит текст в заданный элемент
function displayText($dom,text){
    $dom.textContent = text;    
}

// функция генерит каталог товаров на странице
function displayCatalog(products){

    // ищем каталог
    var $catalog = document.getElementById("catalog");
 
    // выводим информацию о каждом товаре из каталога
    for(var i = 0; i < products.length; i++){

        var $template = document.querySelector("#template").children[0].cloneNode(true);

        $template.querySelector(".productName").textContent = products[i].name;
        $template.querySelector(".productImg").src = products[i].src;
        // в $productImg.dataset записываем id товара
        $template.querySelector(".productImg").dataset.id = products[i].id;
        $template.querySelector(".productPrice").textContent = products[i].price;
        $template.querySelector(".productButton").textContent = "добавить в корзину";
        // в $productImg.dataset записываем id товара
        $template.querySelector(".productButton").dataset.id = products[i].id;

        $catalog.appendChild($template);
    }
    displayText($cart,basket.basketText());
}

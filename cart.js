// текущая страница
var currentPage = 1;

window.addEventListener("load",init);

// функция вызывается при загрузке страницы
function init(){

    // считываем корзину
    cartProducts = JSON.parse(localStorage.getItem("myCart"));
    
    // выводим каталог товаров
    displayCart(cartProducts);

    var $order = document.querySelector("#order");
    // создаем подписку на событие клик 
    $order.addEventListener('click', handleLeftRightClick);

    updateOrder();

    if (cartProducts.length === 0){
        document.querySelector("#buttonRight").disabled = true;
    } else{
        document.querySelector("#buttonRight").disabled = false;
    }


}

// функция далее, назад
function handleLeftRightClick(event){
    // проверяем что нажали на кнопку
    if (event.target.tagName === "BUTTON"){
        if (event.target.textContent === "далее"){
            ++currentPage;
        } else if (event.target.textContent === "назад"){
            --currentPage;
        } else if (event.target.textContent === "завершить"){
            // завершаем покупку
        }
        updateOrder();
    }
}

function updateOrder(){
    var $cart = document.querySelector("#cart");    
    var $address = document.querySelector("#address");    
    var $comment = document.querySelector("#comment");   
    console.log($cart.style.display );

    $cart.style.display = "none"    
    $address.style.display = "none"  
    $comment.style.display = "none"    

    
    switch(currentPage){
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
     

// функция обработки события клика по корзине
function handleCartsClick(event){
    // проверяем что нажали на кнопку
    if (event.target.tagName === "BUTTON"){
        var id = event.currentTarget.dataset.id;
        if (event.target.textContent === "-"){
            var foundProduct = cartProducts.find(x => x.id == id);
            if (foundProduct != undefined){
                --foundProduct.count; 
                if (foundProduct.count === 0){
                    // удалим из корзины
                    var index = cartProducts.indexOf(foundProduct);
                    if (index >= 0) {
                        cartProducts.splice(index, 1);
                        // удалим div из корзины
                        event.currentTarget.remove();
                    } 
                }else {
                    event.currentTarget.querySelector(".count").textContent = foundProduct.count;
                    event.currentTarget.querySelector(".sum").textContent  = +foundProduct.price * foundProduct.count;
                }
                localStorage.setItem("myCart", JSON.stringify(cartProducts));
            }
        } else if (event.target.textContent === "+"){
            var foundProduct = cartProducts.find(x => x.id == id);
            if (foundProduct != undefined){
                ++foundProduct.count; 
                event.currentTarget.querySelector(".count").textContent = foundProduct.count;
                event.currentTarget.querySelector(".sum").textContent  = +foundProduct.price * foundProduct.count;
                localStorage.setItem("myCart", JSON.stringify(cartProducts));
            }
        } else if (event.target.textContent === "удалить"){
            var foundProduct = cartProducts.find(x => x.id == id);
            if (foundProduct != undefined){
                // удалим из корзины
                var index = cartProducts.indexOf(foundProduct);
                if (index >= 0) {
                    cartProducts.splice(index, 1);
                    // удалим div из корзины
                    event.currentTarget.remove();
                    localStorage.setItem("myCart", JSON.stringify(cartProducts));
                } 
            }
        }

        if (cartProducts.length === 0){
            document.querySelector("#buttonRight").disabled = true;
        } else{
            document.querySelector("#buttonRight").disabled = false;
        }
    }
}




// функция генерит каталог товаров на странице
function displayCart(products){

    // ищем каталог
    var $cart = document.getElementById("cart");
 
    // выводим информацию о каждом товаре из каталога
    for(var i = 0; i < products.length; i++){

        var $template = document.querySelector("#template").children[0].cloneNode(true);

        $template.querySelector(".productName").textContent = products[i].name;
        $template.querySelector(".productImg").src = products[i].src;
        $template.querySelector(".count").textContent = products[i].count;
        $template.querySelector(".productPric{src: ["img/ботинки-1.jpg", "img/ботинки-2.jpg"], id: 2},e").textContent = products[i].price;
        $template.querySelector(".productButtonAdd").textContent = "+";
        $template.querySelector(".productButtonRem").textContent = "-";
        $template.querySelector(".sum").textContent = +products[i].price * products[i].count;
        $template.querySelector(".productButtonDel").textContent = "удалить";
        $template.dataset.id = products[i].id;
        $cart.appendChild($template);
            
        // создаем подписку на событие клик 
        $template.addEventListener('click', handleCartsClick);

    }
}
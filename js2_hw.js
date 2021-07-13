'use strict';
/*  GeekBrains. Javascript-разработчик
  JavaScript. Продвинутый курс
  Урок 2. ООП в JavaScript
  Практическое задание: Джураев Алишер

  1.Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
  2.Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
*/

/**
* Описывает товар и формирует его HTML-код для склада
*/
class GoodsItem {
  constructor(sku, title, image, price, currency, quantity) {
    this.sku = sku;
    this.title = title;
    this.image = image;
    this.price = price;
    this.currency = currency;
    this.quantity = quantity;
  }

  getAmount() {
    return this.price * this.quantity;
  }

  render() {
    return (`
      <div id="good_${this.sku}" class="inStock"">
      <p class="title">Наименование: ${this.title}</p>
      <img class="image" src="${this.image}">
      <p class="price">Цена: ${this.price} ${this.currency}</p>
      <button class="buttonBuy">Купить</button>
      </div></br>`
    );
  }
}

class GoodsItemInCart extends GoodsItem {
  constructor(sku, title, image, price, currency, quantity, quantityOrdered = 1){
    super(sku, title, image, price, currency, quantity);
    this.quantityOrdered = quantityOrdered;
  }

  getAmount() {
    return this.price * this.quantityOrdered;
  }

  render() {
    return (`
      <div id="good_${this.sku}" class="inCart">
      <p class="title">Наименование: ${this.title}</p>
      <img class="image" src="${this.image}">
      <p class="price">Цена: ${this.price} ${this.currency}</p>
      <p class="quantity">К-во: ${this.quantityOrdered}</p>
      <p class="amount">Сумма: ${this.getAmount()} ${this.currency}</p>
      <button class="buttonRemove">Удалить</button>
      </div></br>`
    );
  }
}

/**
* Формирует список товаров на складе и в корзине, выводит их на экран и вешает обработчик кнопки Купить
*
* @param {constructor} goodsArray - массив списка товаров
* @param {constructor} goodsListContainer - контейнер вывода на экран списка товаров (в верстке)
* @param {constructor} goodsItemClass - класс товара (GoodsItem или GoodsItemInCart)
* @param {constructor} containerTitle - заголовок списка товаров ("ТОВАРЫ" или "КОРЗИНА")
* @param {fuction} fetchGoods - скачивает список товаров
* @param {fuction} renderGoodsList - выводит список товаров на экран и вешает обработчик кнопок
*/
class GoodsList {
  constructor(goodsArray, goodsListContainer, goodsItemClass, containerTitle) {
    this.goods = [];
    this.goodsListContainer = goodsListContainer;
    this.goodsItemClass = goodsItemClass;
    this.containerTitle = containerTitle;
  }

  fetchGoods() {
    this.goods = [
      {
        sku: 0,
        title: "Календарь \"Москва\"",
        image: "js2_hw_img/p0s.jpg",
        price: 200,
        currency: "руб.",
        quantity: 2
      },
      {
        sku: 1,
        title: "Календарь \"Сидней\"",
        image: "js2_hw_img/p1s.jpg",
        price: 300,
        currency: "руб.",
        quantity: 4
      },
      {
        sku: 2,
        title: "Календарь \"Париж\"",
        image: "js2_hw_img/p2s.jpg",
        price: 100,
        currency: "руб.",
        quantity: 4
      }
    ];
  }

  renderGoodsList() {
    let listHtml = "";
    let goodsAmount = 0;
    this.goods.forEach(item => {
      const goodsItem = new this.goodsItemClass(item.sku, item.title, item.image, item.price, item.currency, item.quantity);
      listHtml += goodsItem.render();
      goodsAmount += goodsItem.getAmount()
    });
    
    if (this.containerTitle == "КОРЗИНА") {
      this.goodsListContainer.insertAdjacentHTML("beforeend", "<hr>" + this.containerTitle + listHtml + "Общая сумма: " + goodsAmount + " " + this.goods[0].currency);
    } else {
      this.goodsListContainer.insertAdjacentHTML("beforeend", "<hr>" + this.containerTitle + listHtml);
    }

    const buttonBuy = document.querySelectorAll(".buttonBuy");
    for (let i = 0; i < buttonBuy.length; i++) {
      buttonBuy[i].onclick = function(e) {
        const id = e.target.parentElement.getAttribute('id');        
        const goodsItem = new GoodsList([], document.querySelector("#goodsinCart"), GoodsItemInCart, "КОРЗИНА");
        return console.log(id.slice(5));
      }
    }
  }
}


const list = new GoodsList([], document.querySelector("#goodsinStock"), GoodsItem, "ТОВАРЫ");
list.fetchGoods();
list.renderGoodsList();

const listCart = new GoodsList([], document.querySelector("#goodsinCart"), GoodsItemInCart, "КОРЗИНА");
listCart.fetchGoods();
listCart.renderGoodsList();

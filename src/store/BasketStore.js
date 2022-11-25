import {makeAutoObservable} from "mobx";
import {deleteServiceFromBasket} from "../http/serviceAPI";

export default class BasketStoreStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(service, isAuth = false) {
        if(isAuth) {
            await deleteServiceFromBasket(service.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== service.id);
                this._totalPrice -=  service.price * service.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== service.id);
            this._totalPrice -=  service.price * service.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuth = false) {
        const checkServiceInBasket = this._basket.findIndex(service => service.id === item.id);
        if(checkServiceInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item}];
            let totalPrice = 0;
            this._basket.forEach(service => totalPrice += Number(service.price * service.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setDeleteAllServiceFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}

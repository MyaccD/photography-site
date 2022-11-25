import {makeAutoObservable} from "mobx";

export default class ServiceStore {
    constructor() {
        this._types = [];
        this._services = [];
        this._selectedType = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        makeAutoObservable(this);
    }

    setSelectedType(selectedType) {
        this.setPage(1);
        this._selectedType = selectedType;
    }
    setTypes(types) {
        this._types = types;
    }
    setServices(services) {
        this._services = services;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    get types() {
        return this._types;
    }
    get services() {
        return this._services;
    }
    get selectedType() {
        return this._selectedType;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}

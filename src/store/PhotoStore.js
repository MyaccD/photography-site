import {makeAutoObservable} from "mobx";

export default class ServiceStore {
    constructor() {
        this._albums = [];
        this._photos = [];
        this._selectedAlbum = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        makeAutoObservable(this);
    }

    setSelectedAlbum(selectedAlbum) {
        this.setPage(1);
        this._selectedAlbum = selectedAlbum;
    }
    setAlbums(albums) {
        this._albums = albums;
    }
    setPhotos(photos) {
        this._photos = photos;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    get albums() {
        return this._albums;
    }
    get photos() {
        return this._photos;
    }
    get selectedAlbum() {
        return this._selectedAlbum;
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

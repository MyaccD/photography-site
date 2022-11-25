import {$authHost, $host} from "./index";

export const createAlbum = async (album) => {
    const {data} = await $authHost.post('api/album', album);
    return data;
}

export const fetchAlbums = async () => {
    const {data} = await $host.get('api/album');
    return data;
}

export const deleteAlbum = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/album/'+id});
    return data;
}

export const createPhoto = async (album) => {
    const {data} = await $authHost.post('api/photo', album);
    return data;
}

export const fetchPhoto = async (albumId, page, limit = 100) => {
    const {data} = await $host.get('api/photo', {params: {
            albumId, page, limit
        }});
    return data;
}

export const fetchOnePhoto = async (id) => {
    const {data} = await $host.get(`api/photo/${id}`);
    return data;
}

export const fetchDeletePhoto = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/photo/${id}`});
    return data;
}

export const updatePhotos = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/photo/${id}`, data: body});
    return data;
}

export const getAllPhotosInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/photo/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

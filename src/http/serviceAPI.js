import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}


export const createService = async (type) => {
    const {data} = await $authHost.post('api/service', type);
    return data;
}

export const fetchService = async (typeId, page, limit = 9) => {
    const {data} = await $host.get('api/service', {params: {
            typeId, page, limit
        }});
    return data;
}

export const fetchOneService = async (id) => {
    const {data} = await $host.get(`api/service/${id}`);
    return data;
}

export const fetchDeleteService = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/service/${id}`});
    return data;
}

export const updateServices = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/service/${id}`, data: body});
    return data;
}

export const getAllServicesInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/service/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addServiceToBasket = async (service) => {
    const {data} = await $authHost.post('api/basket', service);
    return data;
}

export const getServiceFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteServiceFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}


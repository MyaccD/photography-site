import {$authHost, $host} from "./index";

export const createFeedback = async (feedback) => {
    const {data} = await $authHost.post('api/feedback', feedback);
    return data;
}

export const fetchFeedback = async () => {
    const {data} = await $host.get('api/feedback');
    return data;
}



import { UNABLE_TO_SET_ATTRIBUTE_MESSAGE } from "@/pages/api/constants";

export const setAttribute = async (endpoint: string, setter: any) => {
    await fetch(endpoint)
        .then(res => {
            if (res.status !== 200) {
                console.log(`${UNABLE_TO_SET_ATTRIBUTE_MESSAGE} ${endpoint}`);
                // console.log(`Error: ${res.json()}`);
                return '';
            }
            return res.json()
        })
        .then(json => {
            setter(json);
        })
        .catch(err => setter(''));
}

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
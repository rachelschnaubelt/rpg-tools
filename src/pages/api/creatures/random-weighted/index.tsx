import type { NextApiRequest, NextApiResponse } from 'next'
import { ATTRIBUTE_LIST_ENDPOINTS } from '../../constants';
import { getRandomElementFromWeightedList } from '../../utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const queryMap: { [key: string]: string } = {
        size: 'creature-size',
        type: 'creature-type',
        condition: 'creature-condition',
        behavior: 'creature-behavior'
    };

    const response: { [key: string]: string | number } = {}

    for (const query in queryMap) {
        const endpoint = queryMap[query];
        if (ATTRIBUTE_LIST_ENDPOINTS.hasOwnProperty(endpoint)) {
            const selected = getRandomElementFromWeightedList(ATTRIBUTE_LIST_ENDPOINTS[endpoint]);
            response[query] = selected;
        }
    }

    response.healthPercentage = Math.ceil(Math.random() * 100);

    res.status(200).json(response);
}
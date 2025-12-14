import type { NextApiRequest, NextApiResponse } from 'next'
import { ATTRIBUTE_LIST_ENDPOINTS } from '../../constants';
import { getRandomElementFromWeightedList } from '../../utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const queryMap: { [key: string]: string } = {
        type: 'trap-type',
        trigger: 'trap-trigger',
        effect: 'trap-effect',
        danger: 'trap-danger'
    };

    const response: { [key: string]: string } = {}

    for (const query in queryMap) {
        const endpoint = queryMap[query];
        if (ATTRIBUTE_LIST_ENDPOINTS.hasOwnProperty(endpoint)) {
            const selected = getRandomElementFromWeightedList(ATTRIBUTE_LIST_ENDPOINTS[endpoint]);
            response[query] = selected;
        }
    }

    res.status(200).json(response);
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { ATTRIBUTE_LIST_ENDPOINTS, INVALID_ENDPOINT_MESSAGE } from '../../constants';
import { getValidEndpoints } from '../../utils';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { attributeId } = req.query;
    let list;

    if(typeof attributeId === 'string') {
        if(ATTRIBUTE_LIST_ENDPOINTS.hasOwnProperty(attributeId)) {
            list = ATTRIBUTE_LIST_ENDPOINTS[attributeId];
        }
    }

    if(list) {
        const options = Object.keys(list);
        const selected = options[Math.floor(Math.random()*options.length)]
        res.status(200).json(selected);
    }
    else {
        const errorJson = {
            'message': INVALID_ENDPOINT_MESSAGE,
            'validEndpoints': getValidEndpoints(ATTRIBUTE_LIST_ENDPOINTS)
        }
        res.status(404).json(errorJson);
    }    
}
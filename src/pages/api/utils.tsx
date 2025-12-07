export const getRandomElementFromWeightedList = (weightedList: AttributeList) => {
    // return a random room
    // get total weight first
    const totalWeight = Object.values(weightedList).reduce((acc, current) => acc + current, 0);
    
    // get random number within total weight
    const randomNum = Math.random() * totalWeight;
    
    // iterate through options and sum up running weight
    let runningWeight = 0;
    for(const option in weightedList) {
        runningWeight += weightedList[option];
        if(randomNum <= runningWeight) {
            return option;
        }
    }

    throw new Error('Error getting random element from weighted attribute list');
}

export const getValidEndpoints = (endpointList: EndpointList) => {
    return Object.keys(endpointList);
}
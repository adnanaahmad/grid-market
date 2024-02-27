
export const queryBuilder = (filters) => {
    let technology = genrateFilterQuery('Technologies', filters.technology);
    let financing = genrateFilterQuery('Financing Options', filters.financing);
    let country = genrateFilterQuery('Country', filters.country);
    let output = generateFinalQuery([technology, financing, country]);
    return output;
}

const genrateFilterQuery = (field, optionsArray) => {
    if (optionsArray.length === 0) return null;
    let array = [...optionsArray];
    array = array.map((value) => `SEARCH(",${value},", "," & SUBSTITUTE(LOWER(ARRAYJOIN({${field}}) & ","), ", ", ","))`);
    return `OR(${array.join(',')})`;
}

const generateFinalQuery = (queryArray) => {
    let array = [...queryArray];
    array = array.filter((query) => query!== null);
    switch (array.length) {
        case 0:
            return null;
        case 1:
            return array[0];
        default:
            return `AND(${array.join(',')})`;
    }
}
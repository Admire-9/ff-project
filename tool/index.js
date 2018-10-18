
export const queryParams = searchUrl => {
    let queryArray = searchUrl.slice(1).split("&");
    let queryObject = {};
    queryArray.map(item => {
        let itemArray = item.split("=");
        queryObject[itemArray[0]] = itemArray[1];
    });
    return queryObject;
}

export const isEmptyObject = object => {
    let keys = Object.keys(object);
    let isEmpty = !keys.length;
    if(isEmpty) {
        return true;
    }else{
        for(let key of keys) {
            if(object[key]){
                return false;
            }
        }
    }
    return true;
}

export const sqlParamsAdd = params => {
    let sqlParams = "";
    let keys = Object.keys(params);
    for(let key of keys) {
        if(params[key]){
            sqlParams += `${key}=${isNumberObject(params[key])? params[key] : `'${params[key]}'`} AND `;
        }
    }
    return sqlParams.substring(0, sqlParams.length-5);
}

export const updateParamsAdd = params => {
    let updateParams = "";
    let keys = Object.keys(params);
    for(let key of keys) {
        if(params[key]){
            updateParams += `${key}='${params[key]}',`;
        }
    }
    return updateParams.substring(0, updateParams.length-1);
}

export const insertParamsAdd = params => {
    let insertParams = "";
    let keys = Object.keys(params);
    for(let key of keys) {
        if(params[key]){
            insertParams += `'${params[key]}',`;
        }
    }
    return insertParams.substring(0, insertParams.length-1);
}

const isNumberObject = object => {
    return object.constructor === Number;
}
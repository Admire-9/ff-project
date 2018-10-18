import superagent from "superagent";

const HOST = "/api";

const setHeader = () => {
    return {};
}

/**
 * GET请求封装
 * @param {*} url
 * @param {*} params
 * @param {
 *     host
 *     headers
 * } opt
 */
export const GET = (url, params, opt = {}) => {
    const headers = setHeader();
    const reqUrl = (opt.host ? opt.host : HOST) + url;

    return superagent.get(reqUrl)
        .query(params)
        .set(opt.headers ? opt.headers : headers)
        .then(rs => rs.body)
        .then(data => {
            if(data.msg !== "") {
                return Promise.reject(data.msg);
            }else{
                return data;
            }
        })
        .catch(err => {
            err = typeof err === "string" ? err : "API ERROR";
            console.error(url, "| Error Message: " + err);
            return Promise.reject(err);
        })
}

/**
 * POST请求封装
 * @param {*} url
 * @param {*} params
 * @param {
 *     host
 *     headers,
 *     type
 * } opt
 */
export const POST = (url, params, opt = {}) => {
    const headers = setHeader();
    const reqUrl = (opt.host ? opt.host : HOST) + url;

    return superagent.post(reqUrl)
        .send(params)
        .set(opt.headers || headers)
        .type(opt.type !== undefined ? opt.type : "application/x-www-form-urlencoded")
        .then(rs => rs.body)
        .then(data => {
            if(data.msg !== "") {
                return Promise.reject(data.msg);
            }else{
                return data;
            }
        })
        .catch(err => {
            err = typeof err === "string" ? err : "API ERROR";
            console.error(url, "| Error Message: " + err);
            return Promise.reject(err);
        })
}

export const FETCHAll = apis => {
    let api_arr = apis;

    if(!Array.isArray(api_arr)) {
        api_arr = [api_arr];
    }

    return Promise.all(api_arr);
}


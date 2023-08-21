import axios, { AxiosResponse } from "axios";

const baseUrl = 'http://localhost:8080';

// Passing configuration object to axios
function get(url:string, paramsMap?: Map<string, any>): Promise<AxiosResponse<any, any>>{
    let response = axios({
      method: 'get',
      url: `${baseUrl}/${url}`,
      params: paramsMapToObject(paramsMap),
      data: {body:"HELLO! THIS IS A DATA BLOCK!"}
    });
    return response;
}

function post(url:string, data?: any, paramsMap?: Map<string, any>): Promise<AxiosResponse<any, any>>{
    let response = axios({
      method: 'post',
      url: `${baseUrl}/${url}`,
      params: paramsMapToObject(paramsMap),
      headers: {'Content-Type': 'application/json'},
      data: data
    });
    return response;
}

function paramsMapToObject(paramsMap?: Map<string, any>) : any {
    const params: {[key: string]: any} = {};
    if(paramsMap == undefined) return params;

    paramsMap.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

export {get, post};
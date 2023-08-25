import axios, { AxiosResponse } from "axios";

const baseUrl = 'http://localhost:8080';

/**
 * Get data from the server.
 * @param apiEndpoint Mapping for the requested API endpoint. For example, users/getUser
 * @param paramsMap Map containing optional parameters that get sent in the URL, where the keys represent the parameter names, and the values are the parameter values.
 * For example: @example users/getUser?userId=14&name=Hadi
 * @returns A promise containing the result of the request.
 */
function get(apiEndpoint: string, paramsMap?: Map<string, any>): Promise<AxiosResponse<any, any>>
{
  let response = axios({
    method: 'get',
    url: `${baseUrl}/${apiEndpoint}`,
    params: paramsMapToObject(paramsMap),
  });
  return response;
}

/**
 * Post data to the server.
 * @param apiEndpoint Mapping for the requested API endpoint. For example, users/updateUser
 * @param data JSON data that gets sent as the request body.
 * @param paramsMap Map containing optional parameters that get sent in the URL, where the keys represent the parameter names, and the values are the parameter values.
 * For example: @example users/updateUser?userId=14
 * @returns A promise containing the result of the request.
 */
function post(apiEndpoint: string, data?: any, paramsMap?: Map<string, any>): Promise<AxiosResponse<any, any>>
{
  let response = axios({
    method: 'post',
    url: `${baseUrl}/${apiEndpoint}`,
    params: paramsMapToObject(paramsMap),
    headers: { 'Content-Type': 'application/json' },
    data: data
  });
  return response;
}

/**
 * Converts a parameter map into an object that can be used as request parameters. @example
 * A map containing [<"name", "Hadi">, <"email", "test@gmail.com">] gets converted to an object {name: "Hadi", email: "test@gmail.com"}
 */
function paramsMapToObject(paramsMap?: Map<string, any>): any
{
  const params: { [key: string]: any } = {};
  if (paramsMap == undefined) return params;

  paramsMap.forEach((value, key) =>
  {
    params[key] = value;
  });
  return params;
}

export { get, post };
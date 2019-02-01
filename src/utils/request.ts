/**
 * Parse response from server
 * @param response 
 * @return Promise<T>
 */
const parseResponse = <T>(response: Response): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
        let content;

        try {
            content = await response.json() as any;
        } catch (error) {
            reject(`${response.status} ${response.statusText}`);
            return;
        }

        // Response ok but content error
        if (content && content.error) {
            reject(content.error);
            return;
        }

        // Response not ok but no server error
        if (response && !response.ok) {
            console.error('Server Error', response);
            reject('Server No Response');
            return;
        }

        resolve(content);
    });
}

/**
 * Format params to uri query
 * @param params
 * @return string
 */
const paramsToUriQuery = (params: any): string => {
    if (!params) {
        return '';
    }

    return '?' + Object.keys(params).map((key: string) => {
        return `${key}=${Array.isArray(params[key]) ? params[key].join(',') : params[key]}`
    }).join('&');
}

/**
 * Set request headers
 * @return object
 */
const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  };
  

/**
 *  ----------------------- API CALLS ---------------------
 */
export const GET = async <T>(url: string, params?: any): Promise<T> => {
    const response = await fetch(url + paramsToUriQuery(params), {
        method: 'GET',
        headers: getHeaders(),
    });

    return await parseResponse<T>(response);
}

export const PUT = async <T>(url: string, params: any): Promise<T> => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(params),
    });

    return await parseResponse<T>(response);
}

export const POST = async <T>(url: string, params: any): Promise<T> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params),
    });

    return await parseResponse<T>(response);
}

export const DELETE = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    return await parseResponse<T>(response);
}
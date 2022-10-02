type RequestUrl = string;
type RequestInitOptions = RequestInit | undefined;
type RequestBody = object | undefined;

/**HttpClient
 * > preconfigured fetch methods to resolve response as valid json objects
 * */
type HttpClient = {
    delete: (url: RequestUrl, options?: RequestInitOptions) => Promise<any>;
    get: (url: RequestUrl, options?: RequestInitOptions) => Promise<any>;
    patch: (url: RequestUrl, body: RequestBody, options?: RequestInitOptions) => Promise<any>;
    post: (url: RequestUrl, body: RequestBody, options?: RequestInitOptions) => Promise<any>;
    put: (url: RequestUrl, body: RequestBody, options?: RequestInitOptions) => Promise<any>;
};

const handleResponse = (response: Response): Promise<any> => {
    return Promise.resolve(response.json());
};

const handleError = (error: Error): Promise<never> => {
    return Promise.reject(error);
};

const getCookie = (name: string): string | null => {
    if (!document.cookie) return null;

    const xsrfCookies = document.cookie
        .split(';')
        .map((c) => c.trim())
        .filter((c) => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) return null;

    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
};

const httpClient: HttpClient = {
    delete: (url: RequestUrl, options: RequestInitOptions = undefined): Promise<any> => {
        return fetch(url, {
            headers: new Headers({
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            ...options,
            method: 'DELETE',
        })
            .then(handleResponse)
            .catch(handleError);
    },
    get: (url: RequestUrl, options: RequestInitOptions = undefined): Promise<any> => {
        return fetch(url, {
            headers: new Headers({
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'Fetch',
            }),
            ...options,
            method: 'GET',
        })
            .then(handleResponse)
            .catch(handleError);
    },
    patch: (url: RequestUrl, body: RequestBody, options: RequestInitOptions = undefined): Promise<any> => {
        return fetch(url, {
            headers: new Headers({
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body),
        })
            .then(handleResponse)
            .catch(handleError);
    },
    post: (url: RequestUrl, body: RequestBody, options: RequestInitOptions = undefined): Promise<any> => {
        return fetch(url, {
            headers: new Headers({
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then(handleResponse)
            .catch(handleError);
    },
    put: (url: RequestUrl, body: RequestBody, options: RequestInitOptions = undefined): Promise<any> => {
        return fetch(url, {
            headers: new Headers({
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        })
            .then(handleResponse)
            .catch(handleError);
    },
};

export default httpClient;

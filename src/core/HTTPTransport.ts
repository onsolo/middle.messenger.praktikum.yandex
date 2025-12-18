enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Method = typeof METHODS[keyof typeof METHODS];

interface Options {
  method?: Method;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object' || !data) {
    throw new Error('Data mast be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

// eslint-disable-next-line
class HTTPTransport {
  get = (url: string, options = {} as OptionsWithoutMethod) => {
    if (options.data) {
      url = `${url}${queryStringify(options.data)}`;
    }

    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options = {} as OptionsWithoutMethod) => this.request(url, {
    ...options,
    method: METHODS.PUT,
  }, options.timeout);

  post = (url: string, options = {} as OptionsWithoutMethod) => this.request(url, {
    ...options,
    method: METHODS.POST,
  }, options.timeout);

  delete = (url: string, options = {} as OptionsWithoutMethod) => this.request(url, {
    ...options,
    method: METHODS.DELETE,
  }, options.timeout);

  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = function () {
        reject('Timeout');
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}

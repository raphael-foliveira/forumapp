export default class Fetcher {
    static apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    static get = async (endPoint: string, authToken?: string) => {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (authToken) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${authToken}`,
            };
        }

        const response = await fetch(this.apiUrl + endPoint, requestInit);
        if (response.ok) {
            return response.json();
        }
        return response.status;
    };

    static retrieve = async (endPoint: string, id: string, authToken?: string) => {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (authToken) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${authToken}`,
            };
        }
        const response = await fetch(this.apiUrl + endPoint + `/${id}`, requestInit);
        if (response.ok) {
            return response.json();
        }
        return response.status;
    };

    static post = async (endPoint: string, body: Object, authToken?: string) => {
        const requestInit: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        if (authToken) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${authToken}`,
            };
        }

        const response = await fetch(this.apiUrl + endPoint, requestInit);

        if (response.ok) {
            return response.json();
        }
        return response.status;
    };

    static put = async (endPoint: string, body: Object, authToken?: string) => {
        const requestInit: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        if (authToken) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${authToken}`,
            };
        }

        const response = await fetch(this.apiUrl + endPoint, requestInit);
        if (response.ok) {
            return response.json();
        }

        return response.status;
    };

    static delete = async (endPoint: string, authToken?: string) => {
        const requestInit: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (authToken) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: `Bearer ${authToken}`,
            };
        }

        const response = await fetch(this.apiUrl + endPoint, requestInit);
        if (response.ok) {
            return response.json();
        }

        return response.status;
    };

    static postFormData = async (endPoint: string, body: BodyInit, authToken?: string) => {
        const requestInit: RequestInit = {
            method: "POST",
            body,
        };
        if (authToken) {
            requestInit.headers = {
                Authorization: `Bearer ${authToken}`,
            };
        }
        const response = await fetch(this.apiUrl + endPoint, requestInit);
        if (response.ok) {
            return response.json();
        }
        return response.status;
    };
}

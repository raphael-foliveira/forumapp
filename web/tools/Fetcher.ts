export default class Fetcher {
    static apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

    static get = async (endPoint: string) => {
        const response = await fetch(this.apiUrl + endPoint);
        if (response.ok) {
            return response.json();
        }
        return response.status;
    };

    static retrieve = async (endPoint: string, id: string) => {
        const response = await fetch(this.apiUrl + endPoint + `/${id}`);
        if (response.ok) {
            return response.json();
        }
        return response.status;
    };

    static post = async (endPoint: string, body: Object) => {
        const response = await fetch(this.apiUrl + endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            return response.json();
        }
        return response.status;
    };

    static postFormData = async (endPoint: string, body: Object, authToken?: string) => {
        const requestInit: RequestInit = {
            method: "POST",
            body: body as BodyInit,
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

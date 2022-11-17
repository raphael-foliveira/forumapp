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
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            return response.json();
        }
        return response.status;
    };
}

type Resolution = "MINUTE" | "MINUTE_5" | "MINUTE_15" | "MINUTE_30" | "HOUR" | "HOUR_4" | "DAY" | "WEEK";

export class Markets {
    constructor(private securityToken: string, private cst: string, private demo: boolean = true, private apiVersion: string = "v1") {
    }

    private getBaseUrl() {
        return this.demo ? "https://demo-api-capital.backend-capital.com" : "https://api-capital.backend-capital.com";
    }

    public getTopLevelMarkets() {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/marketnavigation`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getCategorySubNodes(nodeID: string, limit: number = 500) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/marketnavigation/${nodeID}?limit=${limit}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getMarketsDetails(searchTerm: string, epics: string = ""): Promise<{ markets: Array<any> }> {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/markets?searchTerm=${searchTerm}&epics=${epics}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getSingleMarketDetails(epic: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/markets/${epic}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getPriceHistory(epic: string, resolution: Resolution, max: number = 10, from: string, to: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/prices/${epic}?resolution=${resolution}&max=${max}&from=${from}&to=${to}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getClientSentimentForMarkets(marketIds: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/clientsentiment?marketIds=${marketIds}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getClientSentimentForMarket(marketId: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/clientsentiment/${marketId}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }
}

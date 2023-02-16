class Watchlists {
    constructor(private securityToken: string, private cst: string, private demo: boolean = true, private apiVersion: string = "v1") {
    }

    private getBaseUrl() {
        return this.demo ? "https://demo-api-capital.backend-capital.com" : "https://api-capital.backend-capital.com";
    }

    public getAllWatchlists() {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/watchlists`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public createWatchlist(name: string, epics: string[] = []) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/watchlists`, {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify({
                name: name,
                epics: epics
            })
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getSingleWatchlist(watchlistId: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/watchlists/${watchlistId}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public addMarketToWatchlist(watchlistId: string, epic: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/watchlists/${watchlistId}`, {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify({
                epic: epic
            })
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public deleteWatchlist(watchlistId: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/watchlists/${watchlistId}`, {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public deleteMarketFromWatchlist(watchlistId: string, epic: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/watchlists/${watchlistId}/${epic}`, {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }
}

type CreatePositionParameters = {
    direction: "BUY" | "SELL";
    epic: string;
    size: number;
    guaranteedStop?: boolean;
    trailingStop?: boolean;
    stopLevel?: number;
    stopDistance?: number;
    stopAmount?: number;
    profitLevel?: number;
    profitDistance?: number;
    profitAmount?: number;
}

type UpdatePositionParameters = {
    guaranteedStop?: boolean;
    trailingStop?: boolean;
    stopLevel?: number;
    stopDistance?: number;
    stopAmount?: number;
    profitLevel?: number;
    profitDistance?: number;
    profitAmount?: number;
}

type CreateWorkingParameters = {
    direction: "BUY" | "SELL";
    epic: string;
    size: number;
    level: number;
    type: "LIMIT" | "STOP";
    goodTillDate?: string;
    guaranteedStop?: boolean;
    trailingStop?: boolean;
    stopLevel?: number;
    stopDistance?: number;
    stopAmount?: number;
    profitLevel?: number;
    profitDistance?: number;
    profitAmount?: number;
}

type UpdateWorkingParameters = {
    level?: number;
    goodTillDate?: string;
    guaranteedStop?: boolean;
    trailingStop?: boolean;
    stopLevel?: number;
    stopDistance?: number;
    stopAmount?: number;
    profitLevel?: number;
    profitDistance?: number;
    profitAmount?: number;
}

export class Trading {
    constructor(private securityToken: string, private cst: string, private demo: boolean = true, private apiVersion: string = "v1") {
    }

    private getBaseUrl() {
        return this.demo ? "https://demo-api-capital.backend-capital.com" : "https://api-capital.backend-capital.com";
    }

    public getPositionConfirmation(dealReference: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/confirms/${dealReference}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getAllPositions() {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/positions`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public createPosition(options: CreatePositionParameters) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/positions`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(options),
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getSinglePosition(dealId: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/positions/${dealId}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public updatePosition(dealId: string, options: UpdatePositionParameters) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/positions/${dealId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(options),
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public closePosition(dealId: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/positions/${dealId}`, {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getAllWorkingOrders() {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/workingorders`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public createWorkingOrder(options: CreateWorkingParameters) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/workingorders`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(options),
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public updateWorkingOrder(workingOrderId: string, options: UpdateWorkingParameters) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/workingorders/${workingOrderId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(options),
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public deleteWorkingOrder(workingOrderId: string) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/workingorders/${workingOrderId}`, {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }
}

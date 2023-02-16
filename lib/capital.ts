import {Markets} from "./markets";
import {Trading} from "./trading";
import {Accounts} from "./accounts";

export class Capital {
    private securityToken: string;
    private cst: string;

    public market: Markets;
    public trading: Trading;
    public accounts: Accounts;

    constructor(private apiKey: string, private apiPassword: string, private apiEmail: string, public demo: boolean = true, public apiVersion: string = "v1") {
    }

    private getBaseUrl() {
        return this.demo ? "https://demo-api-capital.backend-capital.com" : "https://api-capital.backend-capital.com";
    }

    public status() {
        if (!this.securityToken || !this.cst) {
            throw new Error("Session not created");
        }

        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/ping`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public serverTime() {
        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/time`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public async ping() {
        let startTime = new Date().getTime();
        let serverTime = await this.serverTime();
        return {ping: (serverTime.serverTime - startTime) * 2, unit: "ms"};
    }

    public getEncryptionKey() {
        let headers = new Headers();
        headers.append("X-CAP-API-KEY", this.apiKey);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/session/encryptionKey`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public async createSession() {
        let headers = new Headers();
        headers.append("X-CAP-API-KEY", this.apiKey);
        headers.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "identifier": this.apiEmail,
            "password": this.apiPassword
        });

        let response = await fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/session`, {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        })
            .then(async response => {
                return {
                    response: await response.json(),
                    headers: response.headers
                }
            })
            .catch(error => console.log('error', error));

        if (typeof response !== "object") {
            throw new Error("Invalid response");
        }

        this.cst = response.headers.get("CST");
        this.securityToken = response.headers.get("X-SECURITY-TOKEN");

        this.market = new Markets(this.securityToken, this.cst, this.demo, this.apiVersion);
        this.trading = new Trading(this.securityToken, this.cst, this.demo, this.apiVersion);
        this.accounts = new Accounts(this.securityToken, this.cst, this.demo, this.apiVersion);
    }

    public getSessionDetails() {
        if (!this.securityToken || !this.cst) {
            throw new Error("Session not created");
        }

        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/session`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public switchActiveAccountTo(accountId: string) {
        if (!this.securityToken || !this.cst) {
            throw new Error("Session not created");
        }

        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "accountId": accountId
        });

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/session`, {
            method: 'PUT',
            headers: headers,
            redirect: 'follow',
            body: raw
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public async closeSession() {
        if (!this.securityToken || !this.cst) {
            throw new Error("Session not created");
        }

        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        let response = await fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/session`, {
            method: 'DELETE',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));

        if (typeof response !== "object") {
            throw new Error("Invalid response");
        }

        if (response.status === "SUCCESS") {
            this.securityToken = null;
            this.cst = null;
            this.market = null;
            this.trading = null;
        }

        return response;
    }

    public async keepSessionActive() {
        this.status();
        setTimeout(() => {
            this.keepSessionActive();
        }, 1000 * 60 * 9)
    }
}

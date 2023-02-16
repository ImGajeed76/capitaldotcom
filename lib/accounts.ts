type Source =
    "==CLOSE_OUT"
    | "==DEALER"
    | "==SL"
    | "==SYSTEM"
    | "==TP"
    | "==USER"
    | "!=CLOSE_OUT"
    | "!=DEALER"
    | "!=SL"
    | "!=SYSTEM"
    | "!=TP"
    | "!=USER";
type Status =
    "==ACCEPTED"
    | "==CREATED"
    | "==EXECUTED"
    | "==EXPIRED"
    | "==REJECTED"
    | "==MODIFIED"
    | "==MODIFY_REJECT"
    | "==CANCELLED"
    | "==CANCEL_REJECT"
    | "==UNKNOWN"
    | "!=ACCEPTED"
    | "!=CREATED"
    | "!=EXECUTED"
    | "!=EXPIRED"
    | "!=REJECTED"
    | "!=MODIFIED"
    | "!=MODIFY_REJECT"
    | "!=CANCELLED"
    | "!=CANCEL_REJECT"
    | "!=UNKNOWN";
type Type =
    "==EDIT_STOP_AND_LIMIT"
    | "==POSITION"
    | "==SYSTEM"
    | "==WORKING_ORDER"
    | "!=EDIT_STOP_AND_LIMIT"
    | "!=POSITION"
    | "!=SYSTEM"
    | "!=WORKING_ORDER";

type ActivityQueryParameters = {
    from?: string,
    to?: string,
    lastPeriod?: number,
    detailed?: boolean,
    dealId?: string,

    filter?: { source?: Source, status?: Status, type?: Type },
}

type TransactionQueryParameters = {
    from?: string,
    to?: string,
    lastPeriod?: number,
    type?: "INACTIVITY_FEE" | "RESERVE" | "VOID" | "UNRESERVE" | "WRITE_OFF_OR_CREDIT" | "CREDIT_FACILITY" | "FX_COMMISSION" | "COMPLAINT_SETTLEMENT" | "DEPOSIT" | "WITHDRAWAL" | "REFUND" | "WITHDRAWAL_MONEY_BACK" | "TRADE" | "SWAP" | "TRADE_COMMISSION" | "TRADE_COMMISSION_GSL" | "NEGATIVE_BALANCE_PROTECTION" | "TRADE_CORRECTION" | "CHARGEBACK" | "ADJUSTMENT" | "BONUS" | "TRANSFER" | "CORPORATE_ACTION" | "CONVERSION" | "REBATE" | "TRADE_SLIPPAGE_PROTECTION"
}

export class Accounts {
    constructor(private securityToken: string, private cst: string, private demo: boolean = true, private apiVersion: string = "v1") {
    }

    private getBaseUrl() {
        return this.demo ? "https://demo-api-capital.backend-capital.com" : "https://api-capital.backend-capital.com";
    }

    public getAllAccounts() {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/accounts`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getAccountPreferences() {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/accounts/preferences`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getAccountActivity(queryParameters: ActivityQueryParameters = {}) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        let queryParamString = "";

        if (queryParameters.from) queryParamString += `from=${queryParameters.from}&`;
        if (queryParameters.to) queryParamString += `to=${queryParameters.to}&`;
        if (queryParameters.lastPeriod) queryParamString += `lastPeriod=${queryParameters.lastPeriod}&`;
        if (queryParameters.detailed) queryParamString += `detailed=${queryParameters.detailed}&`;
        if (queryParameters.dealId) queryParamString += `dealId=${queryParameters.dealId}&`;

        if (queryParameters.filter) {
            queryParamString += `filter=`;
            if (queryParameters.filter.source) queryParamString += `source${queryParameters.filter.source};`;
            if (queryParameters.filter.status) queryParamString += `status${queryParameters.filter.status};`;
            if (queryParameters.filter.type) queryParamString += `type${queryParameters.filter.type};`;
        }


        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/history/activity?${queryParamString}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }

    public getAccountTransactions(queryParameters: TransactionQueryParameters = {}) {
        let headers = new Headers();
        headers.append("X-SECURITY-TOKEN", this.securityToken);
        headers.append("CST", this.cst);

        let queryParamString = "";

        if (queryParameters.from) queryParamString += `from=${queryParameters.from}&`;
        if (queryParameters.to) queryParamString += `to=${queryParameters.to}&`;
        if (queryParameters.lastPeriod) queryParamString += `lastPeriod=${queryParameters.lastPeriod}&`;
        if (queryParameters.type) queryParamString += `type=${queryParameters.type}&`;

        return fetch(`${this.getBaseUrl()}/api/${this.apiVersion}/history/transactions?${queryParamString}`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }
}

class response {
    constructor(
        res,
        message,
        status = 500,
        auth = false,
        token = null,
        body = null
    ) {
        this.res = res;
        this.message = message;
        this.status = status;
        this.auth = auth;
        this.token = token;
        this.body = body;
    }

    get json() {
        return {
            auth: this.auth,
            message: this.message,
            token: this.token,
            body: this.body
        };
    }

    send() {
        this.res.status(this.status).json(this.json);
    }
}

module.exports = response;

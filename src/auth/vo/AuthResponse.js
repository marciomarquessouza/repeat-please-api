class AuthResponse {
    constructor(
        message,
        status = 500,
        auth = false,
        token = null,
        user = null
    ) {
        this.message = message;
        this.status = status;
        this.auth = auth;
        this.token = token;
        this.user = user;
    }

    get response() {
        return {
            auth: this.auth,
            message: this.message,
            token: this.token,
            user: this.user
        };
    }
}

module.exports = AuthResponse;

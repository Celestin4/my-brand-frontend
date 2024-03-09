// yourfile.js
function gettingToken() {
    return JSON.parse(localStorage.getItem("token"));
}

function decodeToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}

function gettingUserId() {
    const token = gettingToken();
    if (token) {
        const decodedToken = decodeToken(token);
        const { userId } = decodedToken;
        return userId;
    }
}

export { gettingUserId, gettingToken };

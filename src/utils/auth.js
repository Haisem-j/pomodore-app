let inMemoryToken;


function login(token){
    inMemoryToken = {
        token: token.token,
        expiry: token.expiresIn
    };
}

export default login;
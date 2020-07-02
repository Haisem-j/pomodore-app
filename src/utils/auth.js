let inMemoryToken;
let isLoggedIn = false;

function login(token){
    inMemoryToken = {
        token: token.token,
        expiry: token.expiresIn,
        username: token.username
    };

    isLoggedIn = true;
}

function LoggedIn(){
    if(isLoggedIn === true){
        return true
    }else{
        return false;
    }
}

function logOut(){
    inMemoryToken = null;
    isLoggedIn = false;
}

function useToken(){
    if(isLoggedIn){
        return inMemoryToken;
    }else{
        return null
    }
}
function getUser(){
    if(isLoggedIn){
        return inMemoryToken.username
    }else{
        return null
    }
}

export default {
    login,
    LoggedIn,
    logOut,
    useToken,
    getUser
}

export default {
    signin(tokens){
        localStorage.setItem('loginfo',JSON.stringify(tokens));
    },
    
    signout(){
        localStorage.removeItem('loginfo');
    },
    
    getToken(){
        return JSON.parse(localStorage.getItem('loginfo'));
    }
}
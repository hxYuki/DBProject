import token from '../store/LoginStore';
var baseUrl = "";
export default {
    setBase(base) {
        baseUrl = new URL('', base).toString();
    },
    post(path, data) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token.getToken()) {
            myHeaders.append("Authorization", "Bearer " + token.getToken().token);
            const uid = token.getToken().user.journalistId || token.getToken().user.editorId
            myHeaders.append("uid", uid)
        }
        return fetch(new URL(path, baseUrl), {
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify(data)
        })
    },
    postFile(path,file){
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "multipart/form-data");
        if (token.getToken()) {
            myHeaders.append("Authorization", "Bearer " + token.getToken().token);
            const uid = token.getToken().user.journalistId || token.getToken().user.editorId
            myHeaders.append("uid", uid)
        }
        return fetch(new URL(path, baseUrl), {
            headers: myHeaders,
            method: 'POST',
            body: file
        })
    }

}
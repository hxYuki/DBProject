import axios from 'axios'
import token from '../store/LoginStore';

export default axios.create({
    baseURL: "https://localhost:44365/api/",
    headers: {
        "Authorization": "Bearer " + token.getToken().token,
        'uid': token.getToken().user.journalistId || token.getToken().user.editorId,
        'isEditor': (token.getToken().user.journalistId==null ? true : false)
    }
})
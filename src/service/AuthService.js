import {usePost,registerSuccessfulLoginForJwt,isUserLoggedIn} from './ApiManager'
import {registration,authenticate} from './Constants'

class AuthService { 
    registerUser(data) {
        console.log("In the AuthService registerUser method");
        //console.log(data);
       let response= usePost(data,registration).then((res) => {
            console.log(res);
            if(res.status === 200) {
               return true;     
            }
        }
        )

        return response;
    }

    authenticateUser(data) {
        console.log("In the athenticate user");
        let response = usePost(data,authenticate).then((res) => {
            console.log(res);
            if(res.status === 200) {
                registerSuccessfulLoginForJwt(data.username,res.data.accessToken);
            }
            return res; 
        })
        return response;
    }

    checkUserLoggedin() {
        console.log("calling");
        let response =  isUserLoggedIn();
        console.log("response: " , response);
        return response;
    }
}

export default new AuthService()
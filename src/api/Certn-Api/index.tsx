// Actual API fetch requests here
import { Base64 } from 'js-base64';

const Login = async (username: string, password: string) => {
    try {	
        const response = await fetch(`https://demo-api.certn.co/api/v2/login/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": 'Basic ' + Base64.encode(username + ":" + password)
            }
        });
        const responseData = await response.json();
        console.log("data: ", responseData)
        console.log("Token: ", responseData.token)
        console.log("UserID: ", responseData.user.id)
        if(!response.ok) {
            console.log(responseData.message);
            throw new Error(responseData.message);
        }
        // auth.login(responseData.user.id, responseData.token);
        // history.push("/");
    } catch (err) {
        console.log("something went wrong")
        // setShowError({
        //     show: true,
        //     message: err.message
        // })
    }
}

export { Login }

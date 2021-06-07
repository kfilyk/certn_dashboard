// Any local mock API requests here.

const Softcheck = async (token: string) => {
    console.log("TOKEN: ", token);
    const raw = JSON.stringify({
        "request_softcheck": true,
        "information": {
          "first_name": "Andrew",
          "last_name": "McLeod",
          "date_of_birth": "1970-06-28",
          "addresses": [
            {
              "address": "4412 King Alfred Court",
              "city": "Victoria",
              "province_state": "BC",
              "country": "CA"
            }
          ],
          "sin_ssn": "123456789"
        }
    })
    console.log("BODY: ")
    console.log(raw)
    try {	
        const response = await fetch(`https://demo-api.certn.co/api/v2/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": token
                //"Authorization":'Token 7a5c7eaef00fdbbc68fcc5a6560293c148d1808a7e6477bf700e8b9fdc8f9745'
               //"Authorization": 'Bearer '+token //'Bearer 47914591cbc760b9897070f8221af66176296352' //'Basic ' + Base64.encode(username + ":" + password)  //
            }, 
            body: raw,
            //redirect:'follow'
        });

        const responseData = await response.json();
        console.log("data: ", responseData)
        //console.log("Token: ", responseData.token)
        //console.log("UserID: ", responseData.user.id)
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

export { Softcheck }

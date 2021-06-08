/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';

const userLogin = async (username: string, password: string) : Promise<any> => {
  const response = await fetch(`https://demo-api.certn.co/api/v2/login/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(username + ':' + password)
    }
  });
  const responseData = handleErrors(response);
  return responseData;
}

function handleErrors(response: any) {
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export { userLogin }

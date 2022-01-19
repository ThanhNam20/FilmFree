
import axios from 'axios';

export const jwtInterceptorError = () =>{
  axios.interceptors.response.use((error: any) => {
    const { response } = error;
    if (!response) {
        // network error
        console.error(error);
        return;
    }

    if ([401, 403].includes(response.status)) {
        // auto logout if 401 or 403 response returned from api
        // accountService.logout();
    }

    const errorMessage = response.data?.message || response.statusText;
    console.error('ERROR:', errorMessage);
});
}

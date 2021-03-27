import axios from 'axios'

export const defaultheaders = () =>{
    if(localStorage.getItem('auth_token')){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('auth_token');
    }
    else {
        axios.defaults.headers.common['Authorization'] = '';
    }

}
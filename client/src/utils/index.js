import axios  from 'axios';
const API_URL = "https://localhost:8800/api-vi";

export const API = axios.create({
    baseURL : API_URL,
    responseType:"json",
})

export const apiRequest = async({url ,token,data,method}){
    try{
        const result = await API(URL,{
            method : method,
            headers:{
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
    } catch (error){
        console.log(error)
    }
}
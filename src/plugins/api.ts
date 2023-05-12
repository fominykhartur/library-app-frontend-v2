import axios from "axios";

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
};

export async function getRequest(url:string) {
    const result = await axios.get(url,config)

    return result
}

export async function postRequest(url:string, body:any){
    const result = await axios.post(url,body)

    return result
}
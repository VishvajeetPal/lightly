import axios from "axios";

const instance = axios.create({
    baseURL: 'https://fileants-production-74af.up.railway.app/api/v1/',
    //baseURL: 'http://localhost:8080/api/v1/',
    timeout: 900000,
});


export const UploadFile =  (file,time,callback) => {
    let formData = new FormData();
    formData.append("file", file);


    instance.post("user/upload/"+time, formData)
        .then(
            res => {
                if(callback != null){
                    callback(res);
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
                if(callback != null){
                    callback(error.response);
                }
            } else if (error.request) {
                console.log(error.request);
                if(callback != null){
                    callback(error.response);
                }
            }
        })
    return{}

}

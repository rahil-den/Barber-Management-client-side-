import axios from 'axios';


const URL = "http://localhost:3000"
export const getallBarber = async () => {
    try {
        const response = await axios.get(`${URL}/allBarber`);
        // console.log(response)
       return response
       
    } catch (error) {
        return error;
    }
}

export const adduser = async (formData) =>{
    try{
        console.log(formData);
        const response = await axios.post(`${URL}/adduser`,formData);
        return response.data;
    } catch(err){
        return err;
    }
}


export const addappointment = async (formData) => {
    try {
        console.log(formData)
        const response = await axios.post(`${URL}/addappointment`, formData);
        return response.data;
    } catch (error) {
        return error;
    }
}
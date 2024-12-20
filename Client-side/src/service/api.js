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

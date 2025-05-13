import axios from "axios";

export default axios.create({
    baseURL: '/api',
    params: {
        api_key: '5cce41aaf230b52d1353ac8c1ec447c9'
        
    }
})
import axios from 'axios'

const axiosInstance=axios.create({
    
    baseURL:'https://jsonplaceholder.typicode.com/todos',
  
    headers:{
        
    },
    params:{
        
    }

})

export default axiosInstance
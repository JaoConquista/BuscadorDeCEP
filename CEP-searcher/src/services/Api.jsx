import axios from 'axios'

//https://viacep.com.br/ws/01310930/json

/**baseURL é a url base que você vai utilizar, ela não muda */

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
})

export default api
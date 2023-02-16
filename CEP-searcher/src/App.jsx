import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import api from './services/Api'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

function App() {

  const ErrorNotify = () => toast.error("Digite um CEP válido.")
  const ErrorNotify2 = () => toast.error("Digite algum CEP.")
  const SucceedNotify = () => toast.success("CEP Encontrado !")

  const [input, setInput] =  useState('')
  const [cep, setCep] = useState({})

  async function searcher () {

    if(input === '') {
      ErrorNotify2()
      return
    }

    /*Try = aquilo que você deseja
      executar, mas que pode dar algum erro.
     Catch = O que fazer se houver algum erro.*/

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
      SucceedNotify()
      
    }
    catch{
      ErrorNotify()
      setInput("")
      /*alert('Ops ! Erro de busca, digite um CEP válido.')*/
      
    }
  }

  return (
    <div className="App">
      <ToastContainer/>
      <main>
        <h1>Buscador de CEP</h1>
        <div className="input">

          <input 
          type="text"
          placeholder='Digite o CEP...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button type='button' onClick={searcher}>
            <FiSearch size={20}/>
          </button>
        </div>
      </main>
      {Object.keys(cep).length > 0 && (
        <div className="content">
          <h2>CEP: {cep.cep}</h2>
        
          <span>Logradouro: {cep.logradouro}</span>
          {Object.keys(cep.complemento) != '' && (
            <span>Complemento: {cep.complemento}</span>
          )}
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </div>
      )}
      
  </div>      
  )
}

export default App
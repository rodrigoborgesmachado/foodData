import { useState } from 'react';
import api from './api.js';
import { toast } from 'react-toastify';

function App() {
  const[alimento, setAlimento] = useState('');
  const[listaResultados, setListaResultados] = useState([]);
  const[loadding, setLoadding] = useState(false);

  async function getResultados(){
    setLoadding(true);

    await api.get('/Alimentos/byName?name=' + alimento).then((response) => {
      setLoadding(false);
      if(response.data.success){
        setListaResultados(response.data.object);
        toast.success('Quantidade encontrada: ' + response.data.quantity);
      }else{
        toast.warn('Não encontrado!');
      }
    }).catch(() => {
      setLoadding(false);
      toast.warn('Erro ao buscar!');
    })
  }

  if(loadding){
    return(
        <div className='loaddingDiv'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
  }

  return (
    <div className="app">
      <div className='global-pageContainer'>
        <div className='global-infoPanel'>
          <h2>
            Food Data
          </h2>
          <br/>
          <h4>
            Informações nutricionais segundo tabela <a target='_blank' href="https://www.cfn.org.br/wp-content/uploads/2017/03/taco_4_edicao_ampliada_e_revisada.pdf">TACO</a>
          </h4>
        </div>
        <div className='global-infoPanel'>
          <h4>
            Busque pela descrição do alimento:
          </h4>
          <div className='filtro'>
            <input className='global-input' value={alimento} onChange={(e) => setAlimento(e.target.value)}/>
            <button className='botao' onClick={() => getResultados()}>Buscar</button>
          </div>
        </div>
        {
          listaResultados.length > 0 ?
          <div className='global-infoPanel'>
            <h4>Resultados (por 100 gramas):</h4>
            <br/>
            {
              listaResultados.map((item) => {
                return(
                  <div className='global-infoPanel'>
                    <h4>
                      Código e descrição: {item.numeroAlimento} - {item.descricao}<br/>
                      Grupo: {item.categoriaAlimentos?.descricao}<br/>
                      Calorias: {item.energiaKcal} (Kcal) | {item.energiaKg} (Kg)<br/>
                      Proteína: {item.proteina}<br/>
                      Carboidrato: {item.carboidrato}<br/>
                      Lipídios: {item.lipidios}<br/>
                      Colesterol: {item.colesterol}
                    </h4>
                  </div>
                )
              })
            }
          </div>
          :
          <div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

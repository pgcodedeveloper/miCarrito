import { useEffect, useState } from 'react'
import Header from './components/Header'
import ItemLista from './components/ItemLista'
import Modal from './components/Modal'
import ModalLista from './components/ModalLista';

function App() {
    
    const [modal, setModal] = useState(false);
    const [modalLista, setModalLista] = useState(false);
    const [listas, setListas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [lista, setLista] = useState({});
    const [listaEdit,setListaEdit] = useState({});

    const handleNuevaLista = () =>{
        setModal(true);
    }

    const handleMostarLista = (lista) =>{
        setLista(lista);
        setModalLista(true);
    }

    const handleEditLista = (lista) =>{
        setListaEdit(lista);
        setModal(true);
    }

    const handleEliminarLista = (listaElim) =>{
        const listasAct = listas.filter(list => list.nombre !== listaElim.nombre);
        setListas(listasAct);
    }

    const cambiarEstadoLista = (lista,producto) =>{
        listas.map(list => {
            if(list.nombre === lista.nombre){
                list.productosL.map(pr =>{
                    if(pr.nombre === producto.nombre){
                        if(producto.estado === "false"){
                            pr.estado = "true";
                        }
                        else{
                            pr.estado = "false";
                        }
                        
                    }
                });
            }
        });
    }

    useEffect(() =>{
        if(JSON.parse(window.localStorage.getItem("listas"))){
            setListas(JSON.parse(window.localStorage.getItem("listas")));
        }
        else{
            setListas([]);
        }
        
    },[]);
    
    useEffect(() =>{
        if(listas.length > 0){
            window.localStorage.setItem("listas",JSON.stringify(listas));
        }
    },[listas]);

    return (
        <>
            <Header handleNuevaLista={handleNuevaLista}/>
            
            <main className='mt-8 mx-auto w-11/12'>
                <h2 className='text-center text-2xl md:text-4xl font-semibold'>Mis Listas de <span className='font-black'>Compras</span></h2>

                {listas.length > 0 ? (
                    <>
                        {listas.map(lista => (
                            <ItemLista key={lista.nombre} lista={lista} handleMostarLista={handleMostarLista} handleEditLista={handleEditLista} handleEliminarLista={handleEliminarLista}/>
                        ))}
                    </>
                ):
                    <>
                        <div role="alert" className="alert alert-warning flex w-full p-2 mt-6 mx-auto sm:w-3/4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Aún no tienes listas pendientes</span>
                        </div>
                    </>
                }
                
            </main>

            <Modal open={modal} setOpen={setModal} listas={listas} setListas={setListas} listaEdit={listaEdit} setListaEdit={setListaEdit}/>
            {lista?.nombre && ( 
                <ModalLista open={modalLista} setOpen={setModalLista} lista={lista} cambiarEstadoLista={cambiarEstadoLista}/>
            )}
        </>
    )
}

export default App

import React, { Fragment, useEffect, useState } from 'react'
import Alerta from './Alerta';

const Modal = ({open, setOpen, listas, setListas, listaEdit, setListaEdit}) => {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({nombre: "", cantidad: "", estado: "false"});
    const [lista, setLista] = useState({nombre: "", fecha: "", productosL: []});
    const [alerta, setAlerta] = useState({mensaje: "", tipo: ""});


    useEffect(() =>{
        if(listaEdit?.nombre){
            setLista(listaEdit);
            setProductos(listaEdit?.productosL);
        }
    },[listaEdit]);

    const handleChangeP = (e) =>{
        setProducto({...producto,
            [e.target.name] : e.target.value
        });
    }

    const handleNuevoProducto = () =>{
        if(!Object.values(producto).includes("")){
            const existe = productos.some(p => p.nombre === producto.nombre);
            
            if(existe){
                productos.map(p =>{
                    if(p.nombre === producto.nombre){
                        p.cantidad = (+p.cantidad) + (+producto.cantidad);
                    }
                });
                setLista({...lista, productosL: productos});
            }
            else{
                producto.cantidad = +producto.cantidad;
                producto.estado = "false";
                setLista({...lista, productosL: [...lista.productosL,producto]});
                setProductos([...productos,producto]);
            }
            
            setProducto({nombre: "", cantidad: "", estado : "false"});
        }
        else{
            setAlerta({mensaje: "Debes agregar nombre y cantidad al producto", tipo: "Error"});
        }
    }

    const agregarProducto = (producto,nuevaCantidad) =>{
        const existe = productos.some(p => p.nombre === producto.nombre);
        if(existe){
            productos.map(p =>{
                if(p.nombre === producto.nombre){
                    p.cantidad = (+p.cantidad) + (+nuevaCantidad);
                }
            });
            setLista({...lista, productosL: productos});
        }
    }

    const quitarProducto = (producto,nuevaCantidad) =>{
        const existe = productos.some(p => p.nombre === producto.nombre);
        if(existe){
            productos.map(p =>{
                if(p.nombre === producto.nombre){
                    if(p.cantidad > nuevaCantidad){
                        p.cantidad = (+p.cantidad) - (+nuevaCantidad);
                    }
                }
            });
            setLista({...lista, productosL: productos});
        }
    }

    const handleChangeL = (e) =>{
        setLista({...lista,
            [e.target.name] : e.target.value
        });
    }
 
    const handleEliminar = (pr) =>{
        const existe = productos.some(p => p.nombre === pr);
        if(existe){
            const nuevoArray = productos.filter(p => p.nombre !== pr);
            setProductos(nuevoArray);
            if(listaEdit?.nombre){
                lista.productosL = nuevoArray;
            }
        }
    }

    const handleAgregarLista = (e) =>{
        e.preventDefault();
        if(listaEdit?.nombre){
            if(!Object.values(lista).includes("")){    
                if(productos.length > 0){
                    const listaEditada = listas.map(l =>{
                        //Edito la lista que tiene el mimo nombre
                        if(l.nombre === lista.nombre){
                            l.fecha = lista.fecha;
                            l.productosL = lista.productosL;
                        }
                        return l;
                    });
                    
                    setListas(listaEditada);
                    setAlerta({mensaje: "Lista modificada correctamente", tipo: "Exito"});

                    limpiar();
                    document.querySelector("#modal").close();
                }
                else{
                    setAlerta({mensaje: "Debes agregar productos a la lista", tipo: "Error"});
                }
            }
            else{
                setAlerta({mensaje: "Debes agregar datos en todos los campos", tipo: "Error"});
            }
        }
        else{
            if(!Object.values(lista).includes("")){    
                if(productos.length > 0){
                    setListas([...listas,lista]);
                    setAlerta({mensaje: "Lista agregada correctamente", tipo: "Exito"});
                    console.log("aca");
                    limpiar();
                }
                else{
                    setAlerta({mensaje: "Debes agregar productos a la lista", tipo: "Error"});
                }
            }
            else{
                setAlerta({mensaje: "Debes agregar datos en todos los campos", tipo: "Error"});
            }
        }
    }

    const limpiar = () =>{
        setLista({nombre: "", fecha: "", productosL: []});
        setAlerta({mensaje: "", tipo : ""});
        setProducto({nombre: "", cantidad: "", estado: "false"});
        setProductos([]); 
        setListaEdit({});
    }
    useEffect(() =>{
        if(alerta.mensaje !== ""){
            setTimeout(() =>{
                setAlerta({mensaje: "", tipo : ""});
            },2500);
        }
    },[alerta])
    
    useEffect(() =>{
        if(open){
            document.querySelector("#modal").showModal();
        }
        else{
            document.querySelector("#modal").close();
            setLista({nombre: "", fecha: "", productosL: []});
            setAlerta({mensaje: "", tipo : ""});
            setProducto({nombre: "", cantidad: "", estado: "false"});
            setProductos([]);
            setListaEdit({});
        }
    },[open]);

    return (
        <dialog id="modal" className="modal">
            <div className="modal-box max-w-none w-11/12 sm:w-4/5 overflow-x-hidden">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setOpen(false)}>✕</button>
                </form>
                
                {listaEdit?.nombre ? 
                    <h3 className="text-xl text-center uppercase">Editar lista de <span className='text-2xl text-primary font-bold italic'>Compra</span></h3>
                : 
                    <h3 className="text-xl text-center uppercase">Nueva lista de la <span className='text-2xl text-primary font-bold italic'>Compra</span></h3>
                }

                {alerta.mensaje !== "" && 
                    <Alerta alerta={alerta}/>
                }
                
                <form className='w-full mx-auto' onSubmit={(e) => handleAgregarLista(e)}>
                    <div className='form-control'>
                        <label htmlFor="nombre" className='p-2 font-semibold'>Nombre</label>
                        {listaEdit?.nombre ? 
                            <input type="text" name='nombre' disabled value={lista.nombre} onChange={(e) => handleChangeL(e)} id='nombre' placeholder="Ingrese el nombre" className="input input-bordered w-full" />
                        : 
                            <input type="text" name='nombre' value={lista.nombre} onChange={(e) => handleChangeL(e)} id='nombre' placeholder="Ingrese el nombre" className="input input-bordered w-full" />
                        }
                    </div>
                    <div className='form-control'>
                        <label htmlFor="fecha" className='p-2 font-semibold'>Fecha</label>
                        <input type="date" name='fecha' id='fecha' value={lista.fecha} onChange={(e) => handleChangeL(e)} placeholder="Ingrese la fecha" className="input input-bordered w-full" />
                    </div>

                    <div className="divider">Lista</div> 

                    <div className='form-control'>
                        <div className='flex items-center gap-1.5'>
                            <label htmlFor="nombre" className='p-2 font-semibold'>Productos</label>
                            <div className="tooltip tooltip-right" data-tip="Agregue los productos para su lista de compras">
                                <button className="btn btn-ghost btn-circle btn-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-start sm:justify-between gap-2 sm:gap-3'>
                            <div className='flex-auto flex gap-1 flex-col items-center sm:flex-row sm:gap-2'>
                                <input type="text" name='nombre' id='nombre' value={producto?.nombre} onChange={(e) => handleChangeP(e)} placeholder="Ingrese el nombre del producto" className="input input-bordered sm:w-2/3 w-full"/>
                                <input type="number" name='cantidad' id='cantidad' value={producto?.cantidad} onChange={(e) => handleChangeP(e)} placeholder="Cantidad" className="input input-bordered sm:w-auto w-full" />
                            </div>

                            <button type='button' className="btn btn-ghost btn-circle btn-sm" onClick={handleNuevoProducto}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                    </div>
                    <div className='form-control'>
                        <label htmlFor="nombre" className='p-2 font-semibold'>Resumen de productos</label>
                        {productos.length > 0 ? (
                            <ul className="flex flex-col gap-1 list-none p-3 bg-base-200 rounded-box">
                                {productos.map(pr => (
                                    <li key={pr.nombre} className='flex items-center gap-2 justify-between flex-row'>
                                        <div className='w-full flex items-center justify-between gap-4'>
                                            <p className='text-base sm:text-xl text-gray-400 font-semibold'>
                                                {pr.nombre} 
                                            </p>
                                            <div className='flex items-center gap-1'>
                                                <button type='button' className='btn btn-ghost btn-circle btn-xs' onClick={() => quitarProducto(pr,1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                                    </svg>
                                                </button>
                        
                                                <p className='font-bold badge badge-primary'>x{pr.cantidad}</p>
                                                
                                                <button type='button' className='btn btn-ghost btn-circle btn-xs' onClick={() => agregarProducto(pr,1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <button type='button' className='btn btn-ghost btn-circle btn-sm' onClick={() => handleEliminar(pr.nombre)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div role="alert" className="alert alert-info flex w-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Aún no hay productos agregados</span>
                            </div>
                        )}
                        
                    </div>

                    <div className="divider">Finalizar</div>

                    <button type='submit' className="btn btn-success">
                        {listaEdit?.nombre ? "Guardar Cambios" : "Agregar Lista"}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clipRule="evenodd" />
                            <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                        </svg>
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default Modal

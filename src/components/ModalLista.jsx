import React, { useEffect, useState } from 'react'

const ModalLista = ({setOpen,open,lista, cambiarEstadoLista}) => {
    const [estado, setEstado] = useState(false);

    useEffect(() =>{
        if(open){
            document.querySelector("#modalLista").showModal();
        }
        else{
            document.querySelector("#modalLista").close();
        }
    },[open]);

    const handleCheck = (producto) =>{
        cambiarEstadoLista(lista,producto);

        //Cambiar el state local

        setEstado(!estado);
    }
    return (
        <dialog id="modalLista" className="modal">
            <div className="modal-box max-w-none w-11/12 sm:w-3/5 overflow-x-hidden">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setOpen(false)}>✕</button>
                </form>
                
                <h3 className="text-xl text-center uppercase">Lista de <span className='text-2xl text-primary font-bold italic'>{lista.nombre}</span></h3>
            
                <section className='w-full mx-auto mt-6'>
                    {lista.productosL.length > 0 && (
                        <ul className="flex flex-col gap-1 list-none p-3 bg-base-200 rounded-box">
                            {lista.productosL.map(pr => (
                                <li key={pr.nombre} className='flex items-center gap-2 justify-between flex-row'>
                                    <div className='w-full flex items-center justify-between gap-4'>
                                        {pr.estado === "false" ? (
                                            <p className='text-base sm:text-xl text-gray-400 font-semibold'>
                                                {pr.nombre} 
                                            </p>
                                        ): (
                                            <p className='text-base sm:text-xl text-gray-400 font-semibold line-through decoration-sky-500'>
                                                {pr.nombre} 
                                            </p>
                                        )}
                                        
                                        <div className='flex items-center gap-1'>
                                            <p className='font-bold badge badge-primary'>x{pr.cantidad}</p>
                                        </div>
                                    </div>
                                    
                                    <button type='button' className='btn btn-ghost btn-circle btn-sm' onClick={() => handleCheck(pr)}>
                                        {pr.estado === "false" ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </dialog>
    )
}

export default ModalLista

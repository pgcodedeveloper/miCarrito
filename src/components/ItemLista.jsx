import React, { useState } from 'react'
import Paginador from './Paginador'
import { formatearFecha } from '../helpers'
import ModalLista from './ModalLista'

const ItemLista = ({lista,handleMostarLista}) => {

    return (
        <>
            <section className='w-2/3 mx-auto mt-8'>
                <div className="card h-full md:card-side bg-base-100 shadow-xl">
                    <figure className='md:w-1/5 p-2 bg-sky-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                            <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                        </svg>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{lista.nombre}</h2>
                        <p>Fecha: <span className='text-gray-500 font-extrabold'>{formatearFecha(lista.fecha)}</span></p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-info" onClick={() => handleMostarLista(lista)}>Ver</button>
                        </div>
                    </div>
                </div>
            </section>

            <Paginador />
            
        </>
    )
}

export default ItemLista

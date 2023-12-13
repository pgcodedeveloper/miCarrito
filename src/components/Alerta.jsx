import React from 'react'

const Alerta = ({alerta}) => {
    return (
        <div className={`flex items-center justify-start gap-1 p-1 mt-4 sm:p-2 ${alerta.tipo === "Error" ? 'border-l-red-600 bg-red-300' : 'border-l-green-600 bg-green-300'} border-l-4 rounded-md`}>
            {alerta.tipo === "Error" ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </>
            )}
            
            <p className='font-bold text-base text-black'>{alerta.mensaje}</p>
        </div>
    )
}

export default Alerta

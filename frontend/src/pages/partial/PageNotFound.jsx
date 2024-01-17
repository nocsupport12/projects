import React from 'react'

export const PageNotFound = () => {
  return (
    <>
        <section className='py-40 px-10'>
            <div className='container mx-auto '>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-center md:text-3xl'>The page you are looking for may have been moved, deleted,<span className='block'> or possibly never existed.</span></p>
                    <h2 className='md:text-[200px]'>404</h2>
                </div>

            </div>
        </section>
    </>
  )
}


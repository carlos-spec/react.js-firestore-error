 import React from 'react'

import {db, auth} from '../firebase'

const Login = () => {

    const[email,setEmail] = React.useState('')
    const[pass,setPass] = React.useState('')
    const[error,setError]= React.useState(null);
    const[esRegistro,setEsRegistro]= React.useState(true);

    const agregarDatos= (e)=>{
        e.preventDefault()
        if (email==='') {
            //alert('Please, get email.')
            setError('Please, get email.')
            return
        }

        if (pass==='') {
            //alert('Please, get password.')
            setError('Please, get password.')
            return
        }
        if (pass.length < 6) {
        //alert('password to small,please write password whit more  6 numbers')
        setError('password to small,please write password whit more  6 numbers')
        return
        }
        setError(null)
        if (esRegistro) {
            registrar()
        }
        setEmail('')
        setPass('')

    }

        const registrar = React.useCallback(async()=>{
            try {
                const resp= await auth.createUserWithEmailAndPassword(email, pass)
                await db.collection('usuarios').doc(resp.user.email).set({
                    email: resp.user.email,
                    uid: resp.user.uid
                })
                //console.log(resp.user)

            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        },[email, pass])
        


  return (
    <div className='mt-5'>
        <h3 className='text-center'>
            {
                esRegistro? 'Registro Usuario' : 'Login de Usuario'
            }
            
            
        </h3>
        <hr />
        <div className='row justify-content-center'>
            <div className='col 12 col-sm-8 col-md-6 col-xl-4'>
                <form onSubmit={agregarDatos}>
                    {
                        error && (
                        <div className='alert alert-danger'>
                            {error}
                        </div>)
                    }
                    <input type="email"
                     className='form-control mb-2'
                     placeholder='Ingrese email'
                     onChange={(e)=> setEmail(e.target.value)}
                     value={email}
                     />

                    <input type="password"
                     className='form-control mb-2'
                     placeholder='Get your password'
                     onChange={(e)=>setPass(e.target.value)}
                     value={pass}
                     />
                    <div className="d-grid gap-2">
                        <button className="btn btn-dark" type="submit">Enter</button>
                        <button className="btn btn-primary" 
                        type="button"
                         onClick={()=> setEsRegistro(!esRegistro)}>
                            {
                                esRegistro?  'you dont account?' : 'I need a account'
                            }
                        </button>
                        
                    </div>

                </form>
            </div>
        </div>
    </div>
    
  )
}


export default ( Login )
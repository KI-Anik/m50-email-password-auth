import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] =useState(false)
    const [logInError, setLogInError] = useState('')
    const emailRef = useRef()

    const handleLogIn= e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(email, password)

        //reset state
        setSuccess(false)
        setLogInError('')

        // fireBase
        signInWithEmailAndPassword(auth,email,password)
        .then(result => {
            console.log(result.user)


            if(result.user.emailVerified){
                setSuccess(true)
            }
            else{
                setLogInError('please verify your email')
            }
        })
        .catch(error => {
            console.log('ERROR', error.message)
            setLogInError(error.message)
        })
    }

    const handleForgetPass = () => {
        const email = emailRef.current.value
        if(!email){
            alert('provide a valid email address')
        }
        else{
            sendPasswordResetEmail(auth,email)
            .then(()=> {
                alert('password reset email is send, please check your mail')
            })
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label onClick={handleForgetPass} className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>New here? please <Link className='text-blue-700' to={'/signup'}> Sign-Up </Link>  first </p>
                            </form>
                            </div>
                        {
                            success && <p className='text-2xl text-green-500 font-semibold'>log in successful</p>
                        }
                        {
                            logInError && <p className='text-2xl text-red-500 font-semibold'>{logInError}</p>
                        }
                </div>
            </div>
        </div>
    );
};

export default Login;
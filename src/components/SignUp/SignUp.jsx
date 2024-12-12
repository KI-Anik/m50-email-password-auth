import React, { useState } from 'react';
import auth from '../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
    const [success, setSuccess] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        // reset error status
        setErrorMessage('')
        setSuccess(false)

        if (password.length < 6) {
            setErrorMessage('password should contain at least 6 character')
            return
        }

        // firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setSuccess(true)
            })
            .catch(error => {
                console.log('ERROR ', error.message)
                setErrorMessage(error.message)
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label ">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? "text" : "password"} name='password' placeholder="password" className="input input-bordered" required />
                            <button 
                            onClick={()=> setShowPassword(!showPassword)}
                            className='btn btn-xs absolute right-2 top-12'>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                                </button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className='text-2xl font-semibold'>

                    {
                        errorMessage && <p className='text-red-500'>{errorMessage}</p>
                    }
                    {
                        success && <p className='text-green-500'> Successfully Signed Up</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SignUp;
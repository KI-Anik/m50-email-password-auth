import React, { useState } from 'react';
import auth from '../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [success, setSuccess] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const terms = e.target.terms.checked;
        console.log(email, password, terms)

        // reset error status
        setErrorMessage('')
        setSuccess(false)

        if (password.length < 6) {
            setErrorMessage('password should contain at least 6 character')
            return
        }

        if(!terms){
            setErrorMessage('please accept terms and condition')
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
                            <p
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-xs absolute right-2 top-12'>
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </p>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <div className="form-control">
                                <label className="label justify-start gap-4 cursor-pointer">
                                    <input type="checkbox"  name='terms' className="checkbox checkbox-accent" />
                                    <span className="label-text">Accept our Term's & Conditions</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                            <p>Already have an account? then <Link className='underline' to={'/login'}>Log-in</Link> </p>
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
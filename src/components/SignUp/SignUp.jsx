import React, { useState } from 'react';
import auth from '../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const hansleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        // reset error status
        setErrorMessage('')

        // firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => console.log(result))
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
            <form onSubmit={hansleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
            {
                errorMessage && <p className='text-red-500'>{errorMessage}</p>
            }
        </div>
      </div>
    );
};

export default SignUp;
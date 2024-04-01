import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";


const Login = () => {
    const [signupError, setSignupError] = useState('');
    const [signupSuxcess, setSignupSuxcess] = useState('');
    const emailRef = useRef();

    const handleSignUp = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        setSignupError('');

        if (password.length < 6) {
            setSignupError("Password should be at least 6 characters");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setSignupError("Password should be at A-Z characters");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            if(result.user.emailVerified){
                setSignupSuxcess(toast.success('Suxcess'))
            }else{
                setSignupError(toast.error('This Email is not varified'))
            }
            
        })
        .catch((error) => {
            console.error(error)
            setSignupError(toast.error('This Pass is rong'))
            setSignupError(error.message)
        })
    }

    const handleForgotPass = () => {
        const email = emailRef.current.value;
        if(!email){
            return;
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setSignupError("Password write the valid email");
            return;
        }
        sendPasswordResetEmail(auth,email)
            .then(() => {
                setSignupSuxcess(toast.success('Chack Your Email'))
            })
            .catch(error => {
                setSignupError(toast.error(error))
            })
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className="hero min-h-[800px] w-full">
                <div className="hero-content w-full flex-col justify-between lg:flex-row-reverse px-24 py-32 rounded-3xl bg-[#6c81f821]">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSignUp} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" ref={emailRef} className="input input-bordered" name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name="password" required />
                                <label className="label flex-col items-start">
                                    <a onClick={handleForgotPass} className="label-text-alt link link-hover">Forgot password?</a>
                                    <p className="mt-3">New here <Link to='/signup'>Create Acount</Link></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>

                    <div className="text-center lg:text-left max-w-[600px] text-[#5469db]">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                </div>
            </div>
            {
                signupError && <div className="mx-auto flex-col text-center justify-between px-5 py-10 rounded-3xl bg-[#ff220521] text-[#ff3a3a] max-w-[500px]"><p>{signupError}</p></div>
            }
        </div>
    );
};

export default Login;
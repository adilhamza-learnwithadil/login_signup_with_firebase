import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [signupError, setSignupError] = useState('');
    const [signupSuxcess, setSignupSuxcess] = useState('');
    const [showPass, setShowPass] = useState();



    const handleSignUp = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password)
        setSignupError('');

        if (password.length < 6) {
            setSignupError("Password should be at least 6 characters");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setSignupError("Password should be at A-Z characters");
            return;
        } else if (!terms){
            setSignupError('Please Accept out terms and condition');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password, terms)
            .then((result) => {
                console.log(result.user)
                setSignupSuxcess(toast.success('Suxcess'))

                sendEmailVerification(result.user)
                .then(() => {
                    setSignupSuxcess(toast.success('Please chack your email and varify it'))
                })

                updateProfile(result.user, {
                    displayName: name
                })
                .then()
                .catch()
            })
            .catch((error) => {
                console.error(error)
                setSignupError(toast.error('Something is rong'))
                setSignupError(error.message)
            })
    }


    return (
        <div className="container mx-auto">

            <ToastContainer></ToastContainer>
            <div className="hero min-h-[800px] w-full">
                <div className="hero-content w-full flex-col justify-between lg:flex-row-reverse px-24 py-32 rounded-3xl bg-[#6c81f821]">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" name="name" placeholder="Your Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type={showPass ? "text" : "password"} name="password" placeholder="password" className="w-full" required />
                                    <span onClick={() => setShowPass(!showPass)} className="label-text-alt link link-hover">
                                        {
                                            showPass ? <LuEyeOff className="text-[23px]" /> : <LuEye className="text-[23px]" />
                                        }
                                    </span>
                                </label>
                                <label className="text-[17px] items-center flex mt-5">
                                    <input type="checkbox" name="terms" className="checkbox checkbox-info mr-3" />
                                    <span>Accept our terms and conditions</span>
                                </label>
                                <p className="mt-3">If you have Acount <Link to='/login'>LogIn</Link></p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>

                    <div className="text-center lg:text-left max-w-[600px] text-[#6961da]">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
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

export default SignUp;
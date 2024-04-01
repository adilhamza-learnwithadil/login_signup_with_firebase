import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase/firebase.init";

const LoginOthers = () => {
    const [user, setUser] = useState();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const logedInUser = result.user;
                console.log(logedInUser)
                setUser(logedInUser)
            })
            .catch(error => {
                console.log("Error: ", error.message)
            })
    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const logedInUser = result.user;
                console.log(logedInUser)
                setUser(logedInUser)
            })
            .catch(error => {
                console.log("Error: ", error.message)
            })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then((result) => {
                setUser(null)
                console.log(result)
            })
            .catch((error) => {
                console.log("Error: ", error.message)
            })
    }
    return (
        <div className="bg-[#6c81f821] w-[500px] py-10 px-10 mt-10 rounded-3xl mx-auto justify-center items-center">

            {user &&
                <div className="flex flex-col justify-center items-center my-5">
                    <div className="flex items-center gap-4">
                        <img src={user.photoURL} alt="" className="rounded-full w-28" />
                        <div className="">
                            <h2 className="text-2xl font-bold">{user.displayName}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
            }
            {user ?
                <div className="flex items-center justify-center">
                    <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button>
                </div> :
                <div className="flex items-center justify-center gap-5 mb-5">
                    <button onClick={handleGoogleSignIn} className="btn btn-primary">Google</button>
                    <button onClick={handleGithubSignIn} className="btn btn-primary">GitHub</button>
                </div>
            }

        </div>
    );
};

export default LoginOthers;
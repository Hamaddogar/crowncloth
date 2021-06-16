import React, { Component, Fragment } from 'react';
import './Sign-In.scss';
import Logo from '../assets/logo.svg';
import Input from './Input';
import { signInWithGoogle, auth, createUserProfileDocument, signInWithFacebook } from '../firebase/firebase-utility';

class SignIn extends Component {
    state = {
        err: '',
        loader: false,
        signUpMode: true,
    }
    data = {};
    formElm = [];
    getRef = elm => this.formElm.push(elm);
    closeModel = () => !this.state.loader && this.props.close();
    changeMode = () => {
        const prevMode = this.state.signUpMode;
        this.setState({ signUpMode: !prevMode, err: '' });
        prevMode && this.formElm.shift();
        for (let elm of this.formElm) {
            let className = elm.className.replace("danger", "");
            elm.className = className;
        }
    }
    render() {
        return (
            <Fragment>
                <div className='blur' onClick={this.closeModel}>
                    {this.state.loader && <div className="lds-ring"><div></div><div></div><div></div></div>}
                </div>
                <div className={`Sign-In Model ${this.state.loader ? 'hideModel' : ''}`}>
                    <div className='icon close' onClick={this.closeModel}></div>
                    <img src={Logo} alt='' />
                    <form onSubmit={this.handleSubmit}>
                        {this.state.signUpMode && <Input type='text' name='displayName' label="Full Name" validate="true" getRef={elm => this.formElm.unshift(elm)} />}
                        <Input type='text' name='email' label="Email" validate="true" getRef={this.getRef} />
                        <Input type='password' name='password' label="Password" validate="true" getRef={this.getRef} />
                        {<span className='alert'>{this.state.err}</span>}
                        <button>Sign {this.state.signUpMode ? "up" : 'in'}</button>
                        <span className='signup' onClick={this.changeMode}>
                            {this.state.signUpMode ? 'Already have an acount, sign in!' : "Don't have an accout, sign up today!"}
                        </span>
                    </form>
                    <p>OR</p>
                    <div className='google btn flex'>
                        <i className="fab fa-google"></i>
                        <span className='fg' onClick={this.signInWithGoogle}>Sign In with Google</span>
                    </div>
                    <div className='facebook btn flex'>
                        <i className="fab fa-facebook-f"></i>
                        <span className='fg' onClick={this.signInWithFacebook}>Sign In with Facebook</span>
                    </div>
                </div>
            </Fragment>
        )
    }
    signInWithGoogle = () => {
        this.setState({ loader: true });
        signInWithGoogle().catch(err => this.errHandler(err));
    }
    signInWithFacebook = () => {
        this.setState({ loader: true });
        signInWithFacebook().catch(err => this.errHandler(err));
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ loader: true });
        let verify = true;
        const data = {};
        for (let elm of this.formElm) {
            if (elm.value.trim() === "") {
                verify = false
                elm.className = 'danger';
            } else {
                const { name, value } = elm;
                data[name] = value;
            }
        }
        verify ?
            (this.state.signUpMode ? this.SignUpWIthEmail(data) : this.SignInWithEmail(data))
            :
            this.setState({ err: 'All the fields are mandatory!', loader: false });
    };
    SignUpWIthEmail = ({ email, password, displayName }) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                // user.sendEmailVerification().catch((err => console.log(err)));
                await user.updateProfile({
                    displayName: displayName
                }).catch(err => this.errHandler(err));
                await createUserProfileDocument(user);
            })
            .catch(err => this.errHandler(err))
    }
    SignInWithEmail = ({ email, password }) => {
        auth.signInWithEmailAndPassword(email, password)
            .catch(err => this.errHandler(err));
    }
    errHandler = ({ code }) => {
        switch (code) {
            case "auth/wrong-password" || "auth/user-not-found":
                return this.showErr("Email or Password is invalid!");
            case "auth/email-already-in-use" || "auth/account-exists-with-different-credential":
                return this.showErr("Email is already in use!");
            case "auth/network-request-failed":
                return this.showErr("Failed to connect internet");
            case "auth/invalid-email":
                return this.showErr("Please provide a valid email address!");
            case "auth/weak-password":
                return this.showErr("Password must be 6 characters long!");
            case "auth/popup-closed-by-userSIGN":
                return this.showErr("You have closed the popup!")
            default: 
                return this.showErr(code);
        }
    }
    showErr = err => this.setState({ err: err, loader: false });
}

export default SignIn;
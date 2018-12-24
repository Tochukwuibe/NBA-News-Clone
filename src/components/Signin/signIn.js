import React, { Component } from 'react'
import styles from './signIn.module.css';
import FormField, { FormControl, checkFormValid, getFormData } from '../widgets/FormFields/formFields';
import { auth, AuthContext } from '../../app-firebase';
import { Redirect } from 'react-router-dom'

export default class SignIn extends Component {

    state = {
        error: '',
        loading: false,
        form: this.createForm(),
        formValid: false
    }


    render() { return this.renderView(); }


    renderView() {
        return (
            <div className={styles.Container}>
                <form>
                    <h2>Login</h2>
                    <FormField
                        control={this.state.form.email}
                        onChange={this.handelFieldChange('email')}
                        onBlur={this.onBlur}
                    />
                    <FormField
                        control={this.state.form.password}
                        onChange={this.handelFieldChange('password')}
                        onBlur={this.onBlur}
                    />
                    {this.renderError()}
                    {this.renderSubmit()}
                    {!!this.context.user ? <Redirect to="/" /> : null}
                </form>
            </div>
        );
    }

    renderSubmit = () => {
        return this.state.loading ?
            <p>Loading...</p>
            : (
                <div>
                    <button type="button" disabled={!this.state.formValid} onClick={this.onRegister}>Register</button>
                    <button type="button" disabled={!this.state.formValid} onClick={this.onLogin} >Login</button>
                </div>
            )
    }

    renderError = () => {
        return !(!!this.state.error) ? null : (
            <div className={styles.Error}>
                {this.state.error}
            </div>
        )
    }


    onRegister = async () => {
        this.setState({ loading: true, error: '' })

        const { email, password } = getFormData(this.state.form)
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push('/')
            })
            .catch((e) => {
                console.log('the errro ', e)
                this.setState({ loading: false, error: e.message })
            })

    }

    onLogin = () => {
        this.setState({ loading: true, error: '' })

        const { email, password } = getFormData(this.state.form)
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push('/')
            })
            .catch((e) => {
                this.setState({ loading: false, error: e.message })
            });
    }



    onBlur = (name, data) => {
        let field = this.state.form[name];
        field = { ...field, ...data }
        const form = { ...this.state.form, [name]: field }
        this.setState({ form })
    }

    handelFieldChange = (name) => {
        return (data) => {
            let field = this.state.form[name];
            field = { ...field, ...data }
            const form = { ...this.state.form, [name]: field }
            this.setState({ form, formValid: checkFormValid(form) })
        }
    }

    

 


    createForm() {
        return {
            email: FormControl('input', 'email', {
                value: '',
                native: {
                    name: 'email-input',
                    type: 'email',
                    placeholder: 'Enter your email..',
                },
                validation: {
                    required: true,
                    email: true
                }
            }),
            password: FormControl('input', 'password', {
                value: '',
                native: {
                    name: 'password-input',
                    type: 'password',
                    placeholder: 'Enter your password..',
                },
                validation: {
                    required: true,
                    minLength: 6
                }
            })
        }
    }
}


SignIn.contextType = AuthContext;
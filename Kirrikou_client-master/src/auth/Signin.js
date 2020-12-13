import React, {useState} from 'react';
import { signin} from './api-auth.js'
import auth from './auth-helper'
import {Redirect} from 'react-router-dom'

import {  
    Button, FormGroup,  Label, Input,  } from 'reactstrap';
export default function Signin(props){
    const [values, setValues] = useState({
        email: '',
        password:'',
        error: '',
        redirectToReferrer: false
    })
    const clickSubmit = () => {
        const user = {
            email : values.email || undefined ,
            password : values.password || undefined
        }
        try {
            signin(user).then((data) => {
                if(data && data.error){
                    setValues({...values, error: data.error})
                }
                else{
                    auth.authenticate(data, ()=>{
                        setValues({...values, error: '', redirectToReferrer:true})
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }
    const { from } = props.location.state || {
        from: {
            pathname:'/home'
        }
    }
    const { redirectToReferrer} = values 
    if(redirectToReferrer){
        return (<Redirect to={from} /> )
    }
    return (
     
        <div className='card card-center'> 
            <div>

                <h2 className='center'>Login</h2>
            <FormGroup>
                <Label htmlFor="username">Email</Label>
                <Input type="text" id="email" name="email"
                    value={values.email}
                    onChange={handleChange('email')} required />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange('password')} required />
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" name="remember"
                        />
                    Remember me
                </Label>
            </FormGroup>
            <FormGroup>
                {values.error && (
                    <Label color='error'>
                        {values.error}
                    </Label>
                )}
            </FormGroup>
            <Button type="submit" className='button' value="submit" onClick={clickSubmit} color="primary">Login</Button>     
            </div>
        </div>    
    )
}
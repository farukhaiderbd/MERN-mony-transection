import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {Button,Container,Col,Row} from 'react-bootstrap'
import { connect } from "react-redux";
import { register } from "../store/actions/authActions";
 class Register extends Component {
    state ={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        error:{}
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)){
            return {error:nextProps.auth.error}
        }
        return null
    }

    changeHandler = event =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submitHandler = event =>{
        event.preventDefault()
        let {name,email,password,confirmPassword} = this.state
        this.props.register({name,email,password,confirmPassword},this.props.history)
    }

    render() {
       let {error} = this.state
    return (
        <>
        <Container>
            <Row className="mt-5">
                <Col></Col>
                <Col md={6} xl={6}>
                <Form onSubmit={this.submitHandler} method="POST">
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.changeHandler} placeholder="Enter Your Name" className={error.name ? 'is-invalid':''} />
                        <Form.Control.Feedback type="invalid">
                        {error.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.changeHandler} placeholder="Enter Your email" className={error.email ? 'is-invalid':''} />
                        <Form.Control.Feedback type="invalid">
                        {error.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}  placeholder="Password" className={error.password ? 'is-invalid':''} />
                        <Form.Control.Feedback type="invalid">
                        {error.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className={error.confirmPassword ? 'is-invalid mb-2':'mb-2'} type="password" name="confirmPassword" onChange={this.changeHandler} placeholder="Confirm Password" />
                        <Form.Control.Feedback type="invalid">
                        {error.confirmPassword}
                        </Form.Control.Feedback>
                        <Link to="/login">Already have account! Please Login</Link>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    </>
    )
}
}

const mapStateToProps = (state) =>({
    auth: state.auth
})
export default connect(mapStateToProps,{register})(Register)
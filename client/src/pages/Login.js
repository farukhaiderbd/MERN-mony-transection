import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {Button,Container,Col,Row} from 'react-bootstrap'
import { connect } from "react-redux";
import { login } from "../store/actions/authActions";
class Login extends Component {
    state ={
        email:'',
        password:'',
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
        let { email, password} = this.state
        event.preventDefault()
        this.props.login({email,password},this.props.history);
    }
    render() {
        let {error} = this.state
    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col></Col>
                    <Col md={6} xl={6}>
                    <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.changeHandler} placeholder="Enter Your email" className={error.email ? "is-invalid":""} />
                        <Form.Control.Feedback type="invalid">
                            {error.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={error.password ? "is-invalid mb-2":"mb-2"} type="password" name="password" onChange={this.changeHandler}  placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            {error.password}
                        </Form.Control.Feedback>
                        <Link to="/register">Already have account! Please Login</Link>
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

const mapStateToProps = (state)=>({
    auth:state.auth
})
export default connect(mapStateToProps,{login})(Login)
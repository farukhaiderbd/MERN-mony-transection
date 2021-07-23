import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addNewTransaction,updateTransaction} from '../../store/actions/transactionsActions'
class CreateTransaction extends Component {
    
        state = {
            amount:'',
            type:'',
            note:''
        }
        
       
        componentWillReceiveProps(nextProps) {
            if(nextProps.actionformType ==='edit'){
                this.setState({
                    amount: nextProps.transaction.amount,
                    note: nextProps.transaction.note,
                    type: nextProps.transaction.type
    
                })
            }
        }

    changeHandler = (event) =>{
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }
    submitHandler = (event) =>{
        event.preventDefault()
        let {amount, type, note} = this.state
        if(this.props.actionformType === 'create'){
            this.props.addNewTransaction({amount, type, note})
        }else if(this.props.actionformType === 'edit'){
          this.props.updateTransaction(this.props.transaction._id,{amount, type, note})
        }
        this.setState({
            amount:0,
            type:'',
            note:''
        })

    }
    closeOnForm=(event)=>{ 
        this.setState({
                amount:0,
                type:'',
                note:''
            })
        this.props.onClose()
       
    }
  
    render() {
        let {amount,type,note} = this.state
        return (
            <div>
                <Modal show={this.props.onShow} onHide={this.closeOnForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create New Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group controlId="formBasicAmount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control required type="number" name="amount" onChange={this.changeHandler} placeholder="Enter Amount" value={amount} />
                                <Form.Control.Feedback type="invalid">
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicType">
                                <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" name="type" onChange={this.changeHandler} aria-label="Default select example" value={type}>
                                    <option>Select Type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formBasicNote">
                                <Form.Label>Note</Form.Label>
                                    <Form.Control name="note" as="textarea" onChange={this.changeHandler} placeholder="Please provide Note" value={note} />
                                <Form.Control.Feedback type="invalid">
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className="btn btn-block" variant="primary" onClick={this.props.onClose}>
                                Create Transaction
                            </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(null,{addNewTransaction,updateTransaction})(CreateTransaction);
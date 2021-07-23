import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Container,Col,Row,Card,Button} from 'react-bootstrap'
import {loadTransactions} from '../store/actions/transactionsActions'
import CreateTransaction from '../components/transactions/CreateTransaction';
class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state ={
            isOpenModal: false,
            formActionType:'',
            id:'',
            transaction:{}
        }
    }
    componentWillMount() {
        this.props.loadTransactions()
    }
    handleCreate = () => {this.setState({isOpenModal:true,formActionType:'create',transaction:{}})}
    handleEdit = (id,transaction) => {
        this.setState({isOpenModal:true,formActionType:'edit',id:id,transaction:transaction})
    }
    handleClose = () => this.setState((state) =>({isOpenModal:false,formActionType:state.formActionType}))

    render() {
        let {auth,transactions} = this.props 
        return (
            <div>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col md={8} xl={8}>
                            <h1 className="text-center">Welcome {auth.user.name}</h1>
                            <h5 className="text-center"><b>Email: </b> {auth.user.email}</h5>
                            <h5 className="text-center"><b>Total Balance: </b> {auth.user.balance}</h5>
                            <Button variant="primary" onClick={this.handleCreate}>
                                Create Transaction
                            </Button>
                            <CreateTransaction onClose={this.handleClose} onShow={this.state.isOpenModal} actionformType={this.state.formActionType} transaction={this.state.transaction} />
                            <br />
                            <h1>Transactions: </h1>
                                {auth.user.transactions.length !== 0 ?
                                transactions.map(transaction=>(
                                    <Card key={transaction.id}>
                                        <Card.Body>
                                            <b>Type: </b> <span>{transaction.type}</span><br />
                                            <b>Amount: </b> <span>{transaction.amount }</span><br />
                                            <Button variant="info" onClick={()=>this.handleEdit(transaction._id,transaction)}>Edit</Button>
                                        </Card.Body>
                                    </Card>
                                    )
                                ) : transactions.message
                                }

                            
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = state=>({
auth: state.auth,
transactions: state.transactions
})
export default connect(mapStateToProps,{loadTransactions})(Dashboard)
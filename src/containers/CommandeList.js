import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import PayCommand from '../components/PayCommand';
import { connect } from 'react-redux';
import { deleteCommand, loadCommands, loadCommandItems, payCommand } from '../actions/commandActions';
class CommandeList extends Component {

    state = {
        url1: "http://localhost:8099/commande-api-v1/commandes/",
        url2: "http://localhost:8099/commande-api-v1/commandeItems/",
    }

    async componentWillMount(){
        const res = await axios.get(this.state.url1);
        this.props.loadCommands(res.data);
    }   

    onInfoCommand = async (reference) => {
        const res = await axios.get(this.state.url2 + "reference/" + reference);
        this.props.loadCommandItems(res.data);
    }
    onDeleteCommand = async (reference) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                try {
                    axios.delete(this.state.url1 + "reference/" + reference);
                    this.props.deleteCommand(reference);
                } catch (error) {
                    console.log(error);
                }
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: 'Deleted successfully'
                })
            }
        })
    }
    render() {
        let { commands, commandItems, payCommand } = this.props;
        return (
            <React.Fragment> 
            <div className="container">
                <div className="row col-md12">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Commands
                            </div>
                            <div className="card-body">
                                <table className="table table-hovered table-sm">
                                    <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Total</th>
                                            <th>Total Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commands.length!==0?(commands.map((cmd, index) => (
                                            <tr key={index}>
                                                <td>{cmd.reference}</td>
                                                <td>{cmd.total}</td>
                                                <td>{cmd.totalPaiement}</td>
                                                <td>
                                                    <button data-target={`#modelId${index}`} data-toggle="modal" className="btn btn-outline-success fa fa-credit-card"></button>
                                                    <PayCommand id={"modelId" + index} payCommand={payCommand} reference={cmd.reference} />
                                                    <button onClick={this.onDeleteCommand.bind(this, cmd.reference)} className="btn btn-outline-danger fa fa-trash-o m-2"></button>
                                                    <button onClick={this.onInfoCommand.bind(this, cmd.reference)} className="btn btn-outline-primary fa fa-plus"></button>
                                                </td>
                                            </tr>
                                        ))):
                                        (<tr>
                                            <td colSpan="3" className="font-italic">No commands found</td>
                                        </tr>)
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Command Items
                            </div>
                            <div className="card-body">
                                <table className="table table-hovered table-sm">
                                    <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Quantite</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commandItems.map((cmdItem, index) => (
                                            <tr key={index}>
                                                <td>{cmdItem.ref}</td>
                                                <td>{cmdItem.quantity}</td>
                                                <td>{cmdItem.price}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        commands: state.command.commands,
        commandItems: state.command.commandItems
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCommands : (data) =>{
            dispatch(loadCommands(data))
        },
        loadCommandItems: (data)=> {
            dispatch(loadCommandItems(data))
        },
        payCommand : (data) => {
            dispatch(payCommand(data))
        },
        deleteCommand : (reference) =>{
            dispatch(deleteCommand(reference))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandeList);
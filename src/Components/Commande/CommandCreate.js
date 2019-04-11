import React, { Component } from "react";
import { Consumer } from "../Controller/context";
import Input from "./Partials/Input";
import Swal from 'sweetalert2';
import axios from 'axios';

class CommandCreate extends Component{

    state={
        url: "http://localhost:8099/commande-api-v1/commandes/",
        reference: "",
        total: 0,
        totalPaiement:0,
        commandItems: [],
        ref: "",
        quantity: 0,
        price: 0,
        errors: {}
    };

    onChangeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    onAddCommandItem = (dispatch, e) => {
        e.preventDefault();
        let {reference, ref, price, quantity } = this.state;
        price=parseInt(price);
        quantity=parseInt(quantity);
        if (reference===""){
            this.setState({errors:{reference: "the reference is required"}});
            return;
        }
        if (ref===""){
            this.setState({errors:{ref: "the ref is required"}});
            return;
        }
        if (quantity===0){
            this.setState({errors:{quantity: "the quantity is required"}});
            return;
        }
        if (price===0){
            this.setState({errors:{price: "the price is required"}});
            return;
        }
        let newCommandItem={
            ref,
            quantity,
            price
        };
        this.setState({
            commandItems: [...this.state.commandItems, newCommandItem],
            ref: "",
            total: this.state.total+newCommandItem.price*newCommandItem.quantity,
            quantity: 0,
            price: 0,
            errors:{}
        });

    };

    onSubmitCommand = async (dispatch, e) => {
        e.preventDefault();
        const { reference, total, totalPaiement, commandItems } = this.state;

        if (commandItems.length===0){
            this.setState({errors:{commandItem:"The list of command items can't be empty"}});
            return;
        }
        const command={
            reference,
            total,
            totalPaiement,
            commandItems
        };
        
        const swalWithBootstrapButtons = Swal.mixin({
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        })
        try {
            const res = await axios.post(this.state.url,command);
            console.log(res.data);
            if (res.data===1) {
                swalWithBootstrapButtons.fire(
                    'Saved!',
                    'Your file has been saved.',
                    'success'
                );
                dispatch({
                    type: 'ADD_COMMAND',
                    payload: command
                })
                this.props.history.push("/");
            }
        } catch (error) {
            console.log(error)
        }    
    };

    render() {
        const { reference, total, ref, quantity, price, errors, commandItems }=this.state;
        return(
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return(
                        <div className="container">
                            <div className="col-md-12 row">
                                <form onSubmit={this.onAddCommandItem.bind(this, dispatch)} className="col-md-6">
                                    <div className="card mt-2">
                                        <div className="card-header">
                                            Command
                                        </div>
                                        <div className="card-body">
                                            <Input type="text" label="Reference" name="reference" error={errors.reference} value={reference} disability={false} onChange={this.onChangeInput}/>
                                            <Input type="number" label="Total" name="total" value={total} disability={true}/>
                                        </div>
                                    </div>
                                    <div className="card mt-2">
                                        <div className="card-header">
                                            Command Item
                                        </div>
                                        <div className="card-body">
                                            <Input type="text" label="Reference" name="ref" error={errors.ref} value={ref} disability={false} onChange={this.onChangeInput}/>
                                            <Input type="number" label="Quantity" name="quantity" error={errors.quantity} value={quantity} disability={false} onChange={this.onChangeInput}/>
                                            <Input type="number" label="Price" name="price" error={errors.price} value={price} disability={false} onChange={this.onChangeInput}/>
                                            <button type="submit"  className="btn btn-primary btn-block">Add</button>
                                        </div>
                                    </div>
                                </form>
                                <form onSubmit={this.onSubmitCommand.bind(this, dispatch)} className="col-md-6">
                                    <table className="table table-hover table-sm mt-2">
                                        <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {commandItems.map((command, index)=>(
                                            <tr key={index}>
                                                <td>{ command.ref }</td>
                                                <td>{ command.quantity }</td>
                                                <td>{ command.price }</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
export default CommandCreate;

import React, { Component } from 'react'
import { Consumer } from '../Controller/context';
import axios from 'axios';

class CommandeList extends Component {

    state = {
        url1:"http://localhost:8099/commande-api-v1/commandes/",
        url2: "http://localhost:8099/commande-api-v1/commandeItems/",
        commandItems:[]
    }
    onCommandeClick = async (reference) => {
        const res = await axios.get(this.state.url2+"reference/"+reference);
        
        this.setState({
            commandItems: res.data
        })
    }
  render(){
    const { commandItems } = this.state;
    return (
        <Consumer>
        {value =>{
            const { commands } = value;
            return(
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
                                            {commands.map((cmd,index)=>(
                                            <tr key={index}>
                                                <td>{ cmd.reference }</td>
                                                <td>{ cmd.total }</td>
                                                <td>{ cmd.maptotalPaiement }</td>
                                                <td><button onClick={this.onCommandeClick.bind(this, cmd.reference)} className="btn btn-outline-primary fa fa-plus"></button></td>
                                            </tr>
                                            ))}
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
                                            {commandItems.map((cmdItem,index)=>(
                                            <tr key={index}>
                                                <td>{ cmdItem.ref }</td>
                                                <td>{ cmdItem.quantity }</td>
                                                <td>{ cmdItem.price }</td>
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
            )
        }}
        </Consumer>
      )
  }
}
export default CommandeList;
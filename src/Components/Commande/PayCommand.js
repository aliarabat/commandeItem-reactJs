import React, { Component } from 'react'
import Input from './Partials/Input'
import { Consumer } from '../Controller/context';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class PayCommand extends Component {

  state={
    url: "http://localhost:8099/commande-api-v1/commandes/",
    reference: "",
    total:0,
    price: 0,
    toalPaiment: 0,
    errors: {}
  };

  onChangeInput= (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onPayCommand = async (dispatch, reference, e) => {
    const { price } = this.state;
    e.preventDefault();
    if (price===0) {
      this.setState({
        error: {price: "the price is obligatory"}
      })
      console.log("Please fill in the approprited price");
      return;
    }

    const res = await axios.put(this.state.url+"reference/"+reference+"/price/"+price);

    if (res.data==="") {
      Swal.fire({
        title: 'Ops!',
        text: 'The total paid passed.',
        type:'error'
      })
    } else {
      dispatch({
        type: 'PAY_COMMAND',
        payload: res.data
      })
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
          type: 'success',
          title: 'Paid successfully'
      })
    }
  }

  render() {
    const { price, errors } = this.state;
    const { reference, id } = this.props;
    return (
      <Consumer>
        {value=>{
          const { dispatch } = value;
          return(
            <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <form onSubmit={this.onPayCommand.bind(this, dispatch, reference)} className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <Input type="text" label="Reference:" name="reference" error={errors.reference} onChange={this.onChangeInput} value={reference} disability={true}/>
                    <Input type="number" label="Price:" name="price" error={errors.price} value={price} onChange={this.onChangeInput} disability={false}/>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Pay</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

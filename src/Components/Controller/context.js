import React from "react";
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_COMMAND": return{
            commands: [action.payload, ...state.commands]
        };
        default: return state;
    }
};

export class Provider extends React.Component{
    state = {
        url: "http://localhost:8099/commande-api-v1/commandes/",
        commands:[],
        dispatch: action => this.setState(state=>reducer(state,action))
    };

    async componentWillMount(){
        const res = await axios.get(this.state.url);
        this.setState({
            commands: res.data
        })
    }

    render() {
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
export const Consumer = Context.Consumer;

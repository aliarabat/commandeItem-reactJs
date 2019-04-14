import { LOAD_COMMANDS, ADD_COMMAND, DELETE_COMMAND, PAY_COMMAND, LOAD_COMMAND_ITEMS} from "../actions/types";

const initialState = {
    commands: [],
    commandItems:[]
}

export default function (state = initialState, action) {
    
    switch (action.type) {
        case LOAD_COMMANDS:
            return {
                ...state,
                commands: action.payload
            };
        case LOAD_COMMAND_ITEMS:
            return{
                ...state,
                commandItems: action.payload
            };
        case ADD_COMMAND:
            return {
                ...state,
                commands: [...state.commands, action.payload]
            };
        case DELETE_COMMAND:
            return {
                commandItems:[],
                commands: state.commands.filter((cmd) => cmd.reference !== action.payload)
            };
        case PAY_COMMAND:
            return {
                ...state,
                commands: state.commands.map((cmd) => (cmd.reference === action.payload.reference) ? (cmd = action.payload) : cmd)
            };
        default:
            {
                return state;
            }
    }

}
export function loadCommands(data) {
    return {
        type: 'LOAD_COMMANDS',
        payload: data
    }
}
export function loadCommandItems(data) {
    return {
        type: 'LOAD_COMMAND_ITEMS',
        payload: data
    }
}
export function addCommand(command) {
    return {
      type: 'ADD_COMMAND',
      payload: command
    }
  }
  
export function payCommand(command) {
    return {
      type: 'PAY_COMMAND',
      payload: command
    }
}
export function deleteCommand(reference) {
    return {
        type: 'DELETE_COMMAND',
        payload: reference
    }
}
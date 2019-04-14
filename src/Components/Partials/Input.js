import React from "react";
import classnames from 'classnames';

export default function Input(props) {
    return(
        <div className="form-group text-left">
            <label htmlFor={ props.name }>{props.label}</label>
            <input type={ props.type } value={ props.value } disabled={ props.disability } id={ props.name } onChange={ props.onChange } name={ props.name }
                   className={ classnames("form-control", { "is-invalid": props.error })}/>
            <div className="invalid-feedback">{ props.error }</div>
        </div>
    )
}

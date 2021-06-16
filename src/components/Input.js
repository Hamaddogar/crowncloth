import React, { Component } from 'react';
import './Input.scss';


class Input extends Component {
    render() {
        const onBlur = ({ target }) => target.value.trim() !== "" ? target.className = "filled" : (this.props.validate ? target.className = "danger": target.className = '');
        return (
            <label className='input-container'>
                <input onChange={this.props.onChange} type={this.props.type} name={this.props.name} onBlur={onBlur} ref="input" />
                <span>{this.props.label}</span>
            </label>
        )
    }
    componentDidMount(){
        this.props.getRef && this.props.getRef(this.refs.input);
    }
}

export default Input;
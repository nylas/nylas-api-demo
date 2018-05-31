import React from 'react';

export default function LoginForm(props) {
    return (
        <form onSubmit={props.handleLoginSubmit}>
            <label>
                Email:
                <input type="text" name="email" value={props.email} onChange={props.handleLoginChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={props.password} onChange={props.handleLoginChange} />
            </label>
            <input type="submit" value="Start" />
        </form>
    );
}

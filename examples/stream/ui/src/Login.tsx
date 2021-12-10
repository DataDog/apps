import React from 'react';

// simulating 'login' by generating a random token
const generateToken = () => 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const Login = () => {
    const redirect = new URLSearchParams(window.location.search).get('redirect');

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // on login, redirect user to provided redirect uri including a token in the search params. This is
        // simulating an oauth flow
        if (redirect) {
            window.location.href = `${redirect}?token=${generateToken()}`
        }
    }

    return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
        <form onSubmit={onSubmit} style={{ width: 500 }}>
            <div className="d-flex align-items-center flex-shrink-0 mb-3 link-dark text-decoration-none justify-content-between">
            <div>
                <img alt="Stream Logo" style={{ width: 50, height: 50, marginRight: 10 }}src="https://freesvg.org/img/Simple-Water-Icon.png" />
                <span className="fs-5 fw-semibold" >Stream (It's basically Twitter)</span>
            </div>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
        </form>
    </div>
  );
}

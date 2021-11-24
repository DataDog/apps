/* eslint-disable @typescript-eslint/no-unused-vars */
import { post, API_URL, API_TOKEN_KEY } from '../api';
import { ModalSize } from '@datadog/ui-extensions-sdk';
import '../index.css';

import './widget.css';
import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.css';
import client from '../client';

import React from 'react';

export default function Widget() {
    let rateLimitControls = null;
    // <<<WORKSHOP STEP 6>>>: Please un-comment the code below
    // cmd+k+u on Mac and ctrl+k+u on Windows to uncomment multiple lines
    //
    // const setRateLimit = (value: number) => {
    //     post("limits", {
    //         value,
    //     });
    // };

    // rateLimitControls = (
    //     <section className="mt-3 p-2">
    //         <div className="container-fluid">
    //             <div className="border-bottom">
    //                 <h4> Traffic control</h4>
    //             </div>
    //             <div className="d-flex flex-row justify-content-between mt-4">
    //                 <button
    //                     type="button"
    //                     className="btn btn-primary"
    //                     onClick={() => {
    //                         setRateLimit(1);
    //                     }}
    //                 >
    //                     Rate limit
    //                 </button>
    //                 <button
    //                     type="button"
    //                     className="btn btn-danger"
    //                     onClick={() => {
    //                         setRateLimit(0.3);
    //                     }}
    //                 >
    //                     Severly limit
    //                 </button>
    //                 <button
    //                     type="button"
    //                     className="btn btn-success"
    //                     onClick={() => {
    //                         setRateLimit(100);
    //                     }}
    //                 >
    //                     Remove limits
    //                 </button>
    //             </div>
    //         </div>
    //     </section>
    // );

    let blockUserContent = null;
    // <<<WORKSHOP STEP 7>>>: Please un-comment the code below

    // const onBlockUser = (args: any) => {
    //     client.modal.open({
    //         source: "blocklist-modal",
    //         key: "custom-modal",
    //         title: "Blocklist",
    //         size: ModalSize.LARGE,
    //     });
    // };

    // blockUserContent = (
    //     <section className="mt-3 p-2">
    //         <div className="container-fluid">
    //             <div className="border-bottom">
    //                 <h4> User management</h4>
    //             </div>
    //             <div className="d-flex flex-row justify-content-between mt-4">
    //                 <button
    //                     type="button"
    //                     className="btn btn-primary"
    //                     onClick={onBlockUser}
    //                 >
    //                     Block users
    //                 </button>
    //             </div>
    //         </div>
    //     </section>
    // );

    const [isLoggedIn, setLoggedIn] = React.useState(
        !!localStorage.getItem(API_TOKEN_KEY)
    );

    const logout = () => {
        localStorage.removeItem(API_TOKEN_KEY);

        setLoggedIn(false);

        client.auth.updateAuthState();
    };

    return (
        <div
            className="d-flex flex-column align-items-stretch"
            style={{ height: '100vh' }}
        >
            <div className="d-flex flex-row align-items-center m-3">
                <img
                    alt="Stream Logo"
                    style={{ width: 50, height: 50, marginRight: 10 }}
                    src="https://freesvg.org/img/Simple-Water-Icon.png"
                />
                <h1 className="flex-grow-1">Stream Admin</h1>
                <a
                    href={API_URL}
                    className="link-primary"
                    target="_blank"
                    rel="noreferrer"
                >
                    See it in action
                </a>
            </div>
            {rateLimitControls}
            {blockUserContent}
            <div
                className="flex-grow-1 d-flex flex-row p-2"
                style={{ justifyContent: 'end', alignItems: 'end' }}
            >
                {isLoggedIn && (
                    <button className="btn btn-secondary" onClick={logout}>
                        Log Out
                    </button>
                )}
            </div>
        </div>
    );
}

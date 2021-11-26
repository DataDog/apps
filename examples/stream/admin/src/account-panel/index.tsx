import { useState, useEffect } from 'react';
import '../index.css';
import React from 'react';
import { get } from '../api';
import client from '../client';

interface Tweet {
    text: string;
    author: string;
}

export default function AccountPanel() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [account, setAccount] = useState<string>('');

    useEffect(() => {
        client.getContext().then(({ args }) => setAccount(args.account));
    }, []);

    async function getTweets(account: string) {
        const data = await get<{ tweets: Tweet[] }>(`stream/${account}`);
        setTweets(data.tweets);
    }

    useEffect(() => {
        if (!account) {
            return;
        }
        getTweets(account);
    }, [account]);

    return (
        <div>
            <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom justify-content-between mb-5">
                <div>
                    <img
                        alt="Stream Logo"
                        style={{ width: 50, height: 50, marginRight: 10 }}
                        src="https://freesvg.org/img/Simple-Water-Icon.png"
                    />
                    <span className="fs-5 fw-semibold">{`Stream from ${account}`}</span>
                </div>
            </div>
            {tweets.length > 0 && (
                <div className="list-group list-group-flush border-bottom scrollarea">
                    {tweets.map(t => {
                        return (
                            <div className="list-group-item list-group-item-action lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{account}</strong>
                                </div>
                                <div className="col-10 mb-1 small">
                                    {t.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

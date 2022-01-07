import { useState, useEffect } from 'react';
import { get, post, del } from '../api';
import './../index.css';

export default function BlocklistModal() {
    const [email, setEmail] = useState<string>('');
    const [blockList, setBlockList] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    async function fetchBlocklist() {
        const data = await get<{ users: string[] }>('blocklist');
        setBlockList(data.users);
    }

    async function addToBlocklist(email: string) {
        const data = await post<{ email: string }, { success: boolean }>(
            'blocklist',
            {
                email
            }
        );

        if (data.success) {
            await fetchBlocklist();
            setError('');
            setEmail('');
        } else {
            setError('Could not block user. Did you spell the email right?');
        }
    }

    async function removeFromBlocklist(email: string) {
        const data = await del<{ email: string }, { success: boolean }>(
            'blocklist',
            { email }
        );

        if (data.success) {
            await fetchBlocklist();
        }
    }

    useEffect(() => {
        fetchBlocklist();
    }, []);

    return (
        <div className="container">
            {blockList.length > 0 && (
                <div style={{ marginBottom: 15 }}>
                    <label>Currently blocked users</label>
                    <ul className="list-group">
                        {blockList.map(user => {
                            return (
                                <li key={user} className="list-group-item">
                                    <span>{user}</span>
                                    <span
                                        style={{
                                            float: 'right',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            removeFromBlocklist(user);
                                        }}
                                    >
                                        ❌
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            <div className="row">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        addToBlocklist(email);
                    }}
                >
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => {
                                if (!e) {
                                    return;
                                }
                                setEmail(e.target.value);
                            }}
                        />
                        <small
                            id="emailHelp"
                            className={`form-text ${
                                error ? 'text-danger' : 'text-muted'
                            }`}
                        >
                            {error ||
                                'This address will be blocked from submitting'}
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: '15px' }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

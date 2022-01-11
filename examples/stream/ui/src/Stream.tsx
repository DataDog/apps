import * as React from 'react';

interface Tweet {
    author: string;
    text: string;
}

// Placeholder
const CURRENT_USER = 'alice@dashdogs.com';

export default function App() {
    const [tweets, setTweets] = React.useState<Tweet[]>([]);
    const [newTweet, setNewTweet] = React.useState<string>('');

    async function getStream() {
        const response = await fetch('http://localhost:3001/stream');
        const data = await response.json();
        setTweets(data.tweets);
    }

    async function postToStream(text: string) {
        if (!text.length) {
            return;
        }

        await fetch('http://localhost:3001/stream', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                author: CURRENT_USER
            })
        });

        setNewTweet('');
        getStream();
    }

    React.useEffect(() => {
        getStream();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div
                className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
                style={{ width: 700 }}
            >
                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom justify-content-between">
                    <div>
                        <img
                            alt="Stream Logo"
                            style={{ width: 50, height: 50, marginRight: 10 }}
                            src="https://freesvg.org/img/Simple-Water-Icon.png"
                        />
                        <span className="fs-5 fw-semibold">
                            Stream (It's basically Twitter)
                        </span>
                    </div>
                    <small className="text-muted">{CURRENT_USER}</small>
                </div>

                <div className="p-3 text-decoration-none">
                    <textarea
                        placeholder="Your tweet here"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        value={newTweet}
                        rows={3}
                        onChange={e => {
                            setNewTweet(e.target.value);
                        }}
                    />
                </div>

                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark  border-bottom">
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
                        onClick={() => {
                            postToStream(newTweet);
                        }}
                    >
                        Post
                    </button>
                </div>

                <div className="list-group list-group-flush border-bottom scrollarea">
                    {tweets.map(t => (
                        <span className="list-group-item list-group-item-action lh-tight">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{t.author}</strong>
                            </div>
                            <div className="col-10 mb-1 small">{t.text}</div>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

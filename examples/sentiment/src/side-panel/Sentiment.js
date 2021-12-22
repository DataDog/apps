const Sentiment = tweets => {
    let wordBubble = [];
    let altText = 'twitter avatar of ' + tweets.tweets.name;

    for (const word of tweets.tweets.keywords) {
        wordBubble.push(<li>{word}</li>);
    }

    return (
        <div className="sentiment-wrapper">
            <div className="tweet">
                <div className="profile-picture">
                    <img
                        src={tweets.tweets.profile_image_url}
                        alt={altText}
                        className="avatar"
                    />
                </div>
                <div className="tweetContent">
                    <span className="display-name">{tweets.tweets.name}</span>{' '}
                    <span className="username">@{tweets.tweets.username}</span>
                    <p className="tweet-body">{tweets.tweets.text}</p>
                </div>
            </div>
            <div className="sentiment">
                <p className={tweets.tweets.sentiment}>
                    Sentiment: {tweets.tweets.sentiment}
                </p>
            </div>
            <div className="sentiment-body">
                <h4>Full Sentiment Analysis:</h4>
                <p>
                    We are {tweets.tweets.confidenceScore}% confident of this
                    sentiment, broken down roughly as follows:
                </p>
                <div className="sentiment-scores">
                    <b>Positive:</b>{' '}
                    <p>{tweets.tweets.confidenceScores.positive}%</p>
                    <b>Neutral:</b>
                    <p>{tweets.tweets.confidenceScores.neutral}%</p>
                    <b>Negative:</b>
                    <p>{tweets.tweets.confidenceScores.negative}%</p>
                </div>

                <p>Words that influenced our decision:</p>
                <ul className="word-bubble">{wordBubble}</ul>
            </div>
        </div>
    );
};

export default Sentiment;

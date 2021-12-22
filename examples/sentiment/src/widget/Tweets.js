const Tweets = tweets => {
    let clickable = tweets.onClick,
        altText = 'twitter avatar of ' + tweets.tweets.name;

    return (
        <div className="sentiment-wrapper">
            <div
                className="tweet tweet-openable"
                onClick={
                    clickable ? tweets.onClick.bind(this, tweets.tweets) : null
                }
            >
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
        </div>
    );
};

export default Tweets;

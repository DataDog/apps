import { init } from "@datadog/ui-extensions-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";
import Tweets from './Tweets';
import "./widget.css";
import "typeface-roboto";
import "milligram";
import { useEffect, useState } from "react";

// just importing this, versus a typical usecase which would be making API Calls.
import tweets from '../tweets.js';


const client = init({ debug: true });

function Widget() {
  const [getTweets, setTweets] = useState([]);

  useEffect(() => {
    setTweets(tweets.tweets);

  }, []);

  const onOpenSidePanel = (args) => {
    client.sidePanel.open(
      {
        source: "panel",
        key: "custom-side-panel",
        title:'@datadoghq Sentiment Analysis'
      },
      { args }
    );
  };

  let sentimentTweets;

  if (getTweets) {
    sentimentTweets = 
    getTweets.map(tweet => {
      return <Tweets tweets={tweet} onClick={onOpenSidePanel}></Tweets>
    });
  }

  return (
    <section style={{ padding: "10px" }}>
      <div className="tweet-timeline">
      {sentimentTweets}
      </div>
    </section>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Widget />}</React.StrictMode>,
    document.getElementById("root")
  );
}
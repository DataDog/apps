import { init, Timeframe, EventType } from "@datadog/ui-extensions-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";
import {fetchMetrics} from "@datadog/vis-fetch";
import WordCloud, {Options} from 'wordcloud';

import "./widget.css";
import "typeface-roboto";
import "milligram";
import { useEffect, useState } from "react";

const client = init({debug: true});

const numberOfMetrics = 100; // Total number of metrics to show TODO - make this a configuration option for users
const gridScaleFactor = 50 // pixels in one dd dashboard grid
const canvasSizeToMaxWordSizeFactor = 8000; // Scaling factor for canvas pixels (width x height) to max font size

// for every series, removes all points from the pointlist except the most recent
// borrowed from https://github.com/DataDog/apps-viz-demo/blob/a381dc7d8a3749fdb03a3e3486749e3cdbafbe36/src/widget/index.tsx#L18
// TODO allow different functions to aggregate timeseries to scalar e.g. min, max, avg, last similar to top list
const makeMetricsResponseScalar = (metricsData: any) => {
    const scalarData = Object.assign({}, metricsData);

    metricsData.series?.forEach((_: any, idx: number) => {
        scalarData.series[idx].pointlist =
            scalarData.series[idx].pointlist.slice(-1);
    });

    return scalarData;
};

const topK = (wordsData: any[][], k: number) => {
    wordsData.sort((a, b) => b[1] - a[1])
    return wordsData.slice(0, k)
}

// scale metrics values so that they will fit in the wordcloud
const scaleValues = (wordsData: any[][], canvasSize: CanvasSize) => {
    let max = 0
    for (const e of wordsData) {
        if (e[1] > max) { // @ts-ignore
            max = e[1]
        }
    }
    const largestSize = (canvasSize.height * canvasSize.width) / canvasSizeToMaxWordSizeFactor;
    const scaleFactor = largestSize / max // max * sf = goal ... sf = goal / max

    wordsData.forEach((e, idx, _) => {wordsData[idx][1] = e[1] * scaleFactor})
    return wordsData
}

const transformData = (metricsData: any, canvasSize: CanvasSize) => {
    const series = metricsData.series
    const valuesByTags = []
    for (let i = 0; i < series.length; i++) {
        const data = series[i]
        const tags = data.tag_set.join(",")
        const value = data.pointlist[0][1] // pointlist is array of two value arrays [[timestamp, val], ...] where we've made it scalar above in   makeMetricsResponseScalar
        valuesByTags.push([tags, value])
    }

    return scaleValues(topK(valuesByTags, numberOfMetrics), canvasSize)
}

interface CanvasSize {
    height: number, // Pixels
    width: number
}

const computeCanvasSize = (layout: any) => {
    const canvasSize: CanvasSize = {
        height: layout.height * gridScaleFactor,
        width: layout.width * gridScaleFactor,
    }
    return canvasSize
}


function Widget() {
  const [metric, setMetric] = useState("system.cpu.user");
  const [groupByTag, setGroupByTag] = useState("service");
  const [timeframe, setTimeframe] = React.useState<Timeframe | undefined>();
  const [wordData, setWordData] = React.useState<any[][]>([])
  const [canvasSize, setCanvasSize] = React.useState<CanvasSize>({height: 0, width: 0})


    useEffect(() => {
    client.getContext().then((c) => {
      setMetric(c.widget?.definition.options?.metric);
      setGroupByTag(c.widget?.definition.options?.group_by_tag);
      setTimeframe(c.dashboard?.timeframe);
      const canvasSize = computeCanvasSize(c.widget?.layout)
      setCanvasSize(canvasSize)
    });

    client.events.on(
      EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
      ({ metric, group_by_tag }) => {
          console.log(metric, group_by_tag)
        if (typeof metric === "string") {
            setMetric(metric);
        }
        if (typeof group_by_tag === "string") {
            setGroupByTag(group_by_tag)
        }
      }
    );

    client.events.on(
        EventType.DASHBOARD_TIMEFRAME_CHANGE,
        (timeframe) => {
            setTimeframe(timeframe)
        }
    );

    client.events.on(
        EventType.CONTEXT_CHANGE,
        (context) => {
            const canvasSize = computeCanvasSize(context.widget?.layout)
            setCanvasSize(canvasSize)
        }
    )
  }, []);

    useEffect(() => {
        const query =`avg:${metric}{*} by {${groupByTag}}`;
        if (timeframe) {
            fetchMetrics(
                timeframe,
                query,
                client as any
            ).then((rawMetricsData) => {
                const metricsData = makeMetricsResponseScalar(rawMetricsData);

                const wordData = transformData(metricsData, canvasSize)

                setWordData(wordData)
            });
        }
    }, [metric, groupByTag, timeframe, canvasSize]);

    useEffect(() => {
        console.log("The word data is", wordData)
        const canvas = document.getElementById('canvas')
        const colors = [ // Datadog colors
            "#965fcc",
            "#623293",
            "#4e91d1",
            "#0953bf",
            "#ffdf52",
            "#fcc028",
        ]
        if (canvas !== null) {
            // configuration options https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md#option
            // example wordcloud https://wordcloud2-js.timdream.org/#love
            const options: Options = {
                // gridSize: Math.round(16 * canvas.offsetWidth / 100),
                // gridSize: 150,
                // weightFactor: function (size: number) {
                //     return Math.pow(size, 2.3) * canvas.offsetWidth / 1024;
                // },
                fontFamily: 'Roboto',
                fontWeight: 'normal',
                color: function (word: string, weight: string | number) {
                    const idx = Math.floor(Math.random() * colors.length);
                    return colors[idx];
                },
                rotateRatio: 0.75, // probability (0-1) that a word rotates
                // @ts-ignore
                // rotationSteps: 4,
                // backgroundColor: '#ffe0e0',
                list: wordData,
                drawOutOfBound: false,
                // @ts-ignore
                shrinkToFit: true,
            }

            WordCloud(canvas, options);
        }
    }, [wordData, canvasSize])

    return (
      <div className="widget">
          <span>Plotting {metric} by {groupByTag}</span>
          <div className="canvas-container span12" id="canvas-container">
              <canvas id="canvas" width={`${canvasSize.width}px`} height={`${canvasSize.width}px`} className="canvas"/>
          </div>
      </div>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Widget />}</React.StrictMode>,
    document.getElementById("root")
  );
}

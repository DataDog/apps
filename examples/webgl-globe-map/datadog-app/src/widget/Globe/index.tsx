import { init } from '@datadog/ui-extensions-sdk'
import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Globe from 'react-globe.gl'

import './style.css'

const client = init()

const getDimensions = (): {width: number; height: number} => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
})


const useDimensions = (): { width: number; height: number} => {
    const [dimensions, setDimensions] = useState(getDimensions())

    useEffect(() => {
        const resizeListener = () => setDimensions(getDimensions())
        window.addEventListener('resize', resizeListener)

        return () => window.removeEventListener('resize', resizeListener)
    }, [])

    return dimensions
}


const Widget = () => {
    const globeElt = useRef<any>()

    const N = 300
    const gData = Array.from({length: 300}, (x, i) => i) 
        .map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: Math.random() / 3,
            color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        }))

    useEffect(() => {
        if (globeElt.current !== null) {
            globeElt.current.controls().autoRotate = true
            globeElt.current.controls().autoRotateSpeed = 0.3
        }
    }, [])

    useEffect(() => {
        const fromDate = (new Date(new Date().getTime() / 1000 + -1 * 86400).getTime() / 1000).toString()
        const toDate = (new Date().getTime() / 1000).toString()

        // it works
        console.log('query dashboards')
        client.api.get('/api/v1/dashboard', {
        })
        .then(data => console.log('+++++++++', data))
        .catch(e => console.log('--------', e))
    }, [])


    useEffect(() => {
        const fromDate = (new Date(new Date().getTime() / 1000 + -1 * 86400).getTime() / 1000).toString()
        const toDate = (new Date().getTime() / 1000).toString()

        // it also works
        console.log('query metrics')
        client.api.get('/api/v1/metrics', {
            params: {
                from: '34312785'
            }
        })
        .then(data => console.log('++++++++', data))
        .catch(e => console.log('--------', e))

    }, [])

    return (
        <div className='globe-wrapper'>
            <Globe
                ref={globeElt}
                globeImageUrl='./earth-night.jpeg'
                height={500}
                width={700}
                pointsData={gData}
                pointAltitude='size'
                pointColor='color'
            />
        </div>
    )
} 

export default function render() {
    ReactDOM.render(
        <Widget />,
        document.getElementById('root')
    )
}


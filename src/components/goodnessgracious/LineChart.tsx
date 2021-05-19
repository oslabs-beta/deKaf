import React, {useEffect, useRef, useState} from 'react';
import {select, selectAll, Selection} from 'd3-selection';
import {scaleLinear, scaleBand} from 'd3-scale';
import {max} from 'd3-array';
import {axisLeft, axisBottom} from 'd3-axis';

const dataa = [
    {timestamp: "100", metric: 'latency', unit:'milliseconds', count: 1000, col:'red'},
    {timestamp: "200", metric: 'latency', unit:'milliseconds', count: 200, col: 'orange'},
    {timestamp: "300", metric: 'latency', unit:'milliseconds', count: 342, col: 'yellow'},
    {timestamp: "400", metric: 'latency', unit:'milliseconds', count: 132, col: 'green'},
    {timestamp: "500", metric: 'latency', unit:'milliseconds', count: 10, col: 'blue'},
    {timestamp: "600", metric: 'latency', unit:'milliseconds', count: 123, col: 'purple'},
    {timestamp: "700", metric: 'latency', unit:'milliseconds', count: 550, col: 'black'}
]

let dimensions = {
    width: 1000, 
    height: 1000,

    chartW: 700,
    chartH: 700,

    margin: 50
}

//x = timestamp
//y =  
const Vis = () => {
    const svgRef = useRef<SVGSVGElement | null>(null)

    ///////////////////////////////////////////////////////

    const [selection, setSelection] = useState<null | Selection<any, unknown, null, undefined>>(null);
    const [data, setData] = useState(dataa)

    ///////////////////////////////////////////////////////

    let maxValue = max(data, d => d.count) // imported function from d3-array can be used in y and x

    let y = scaleLinear()
        .domain([0, max(data, d => d.count)!]) //count metric, in this case, latency
        .range([dimensions.chartH, 0]) // svg height range

    let x = scaleBand() //divide the range into uniform bands
        .domain(data.map(d=>d.timestamp)) //domain accepts unique identifiers for divison
        .range([0, dimensions.chartW]) //svg width range
        //.padding(0.1) //closer to 1 = more space between bars
        .paddingInner(0.1)
        //.paddingOuter

    let yAx = axisLeft(y)//.ticks
        //.tickFormat((d) => (`${d}`) )
    let xAx = axisBottom(x)
    ///////////////////////////////////////////////////////

    useEffect(() => {
        console.log(select(svgRef.current)) 

        if(!selection) {
            setSelection(select(svgRef.current))
        } else {

        selection  
            .append('rect')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)
            .attr('fill', "white")

        ///////////////////////////////////////////////////////

        const xAxGroup = selection

            .append('g')
            .attr(
                'transform',
                `translate(${dimensions.margin}, ${dimensions.chartH})`
            )
            .call(xAx)

        const yAxGroup = selection
        
            .append('g')
            .attr(
                'transform',
                `translate(${dimensions.margin}, 0)`
            )
            .call(yAx)

    
        ///////////////////////////////////////////////////////  

        selection
            .append('g')
            .attr('transform', `translate( ${dimensions.margin}, 0)`) // second arg is ^ or v
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d=> dimensions.chartH - y(d.count))
            //.attr('x', d =>x(d.timestamp)!) // typescript ignores possiblity of null d.timestamp
            //.attr('x', d=>(d.timestamp)!)
            .attr('x', d=> {
                const xX = x(d.timestamp)
                if(xX) {
                    return xX;
                }
                return null;
            })
            .attr('y', d => y(d.count))
            .attr('fill', d => d.col)
            //y scales the input
           
    }, [selection])


const BasicLineChart = (props: BasicLineChartProps) => {
    const [selection, setSelection] = useState<null | Selection<any, unknown, null, undefined>>(null);
    const [data, setData] = useState(dataa)

    
    useEffect(() => {
      draw()
    })
    const draw = () => {
    
        //dimensions of the chart
        let width = props.width - props.left - props.right
        let height = props.height - props.top - props.bottom

        let svg = selection
        .select('.basicLineChart')
        .append('svg')
        .attr('width', width + props.left + props.right)
        .attr('height', height + props.top + props.bottom)
        .append('g')
        .attr('transform', `translate(${props.left},${props.top})`)

        let x = d3
            .scaleTime()
            .domain([0, max(data, d => d.count)!])
            .domain(
                d3.extent(data, d => {
                    return d.timestamp
                }) as [Date, Date]
            )
            .range([0, dimensions.chartW])
        svg.append('g')
        .attr('transform', `translate(0, ${chartH})`)
        .call(d3.axisBottom(x))
    
        let y = d3
            .scaleLinear()
            .domain([0, max(data, d => d.count)!])
            .range([0, dimensions.chartH])
        svg.append('g').call(d3.axisLeft(y))

        svg
            .append('path')
            .data(data)
            .attr('fill', 'none')
            .attr('stroke', props.fill)
            .attr('stroke-width', 1.5)
            .attr(
                'd',
                // @ts-ignore
                d3
                    .line()
                    .x((d) => {
                        return x(d.timestamp)
                    })
                    .y((d) => {
                        return y(d.count)
                    })
            )
    }
}

interface BasicLineChartProps {
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
    fill: string
}
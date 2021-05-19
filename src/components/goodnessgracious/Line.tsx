import React, {useEffect, useRef, useState} from 'react';
import {select, selectAll, Selection} from 'd3-selection';
import {scaleLinear, scaleBand} from 'd3-scale';

///////////////////////////////////////////////////////

//local

// const data = [
//     {width: 100, height: 250, col: "wine"},
//     {width: 100, height: 100, col: "black"},
//     {width: 100, height: 55, col: "yellow"},
//     {width: 100, height: 55, col: "burgundy"},
//     {width: 100, height: 300, col: "cream"}
// ];

const data = [
    {timestamp: "Monday", metric: 'latency', count: 100, col:'red'},
    {timestamp: "Tuesday", metric: 'latency', count: 200, col: 'orange'},
    {timestamp: "Wednesday", metric: 'latency', count: 342, col: 'yellow'},
    {timestamp: "Thursday", metric: 'latency', count: 132, col: 'green'},
    {timestamp: "Friday", metric: 'latency', count: 632, col: 'blue'},
    {timestamp: "Saturday", metric: 'latency', count: 123, col: 'purple'},
    {timestamp: "Sunday", metric: 'latency', count: 550, col: 'white'}
]

///////////////////////////////////////////////////////
//: React.FC
const Line = () => {
    const svgRef = useRef<SVGSVGElement | null>(null)

    ///////////////////////////////////////////////////////

    const [selection, setSelection] = useState<null | Selection<any, unknown, null, undefined>>(null);

    ///////////////////////////////////////////////////////

    const y = scaleLinear()
        .domain([0,1000]) //count metric, in this case, latency
        .range([0,1000]) // svg height range

    const x = scaleBand() //divide the range into uniform bands
        .domain(data.map(d=>d.timestamp)) //domain accepts unique identifiers for divison
        .range([0,700]) //svg width range
        .padding(0.5) //closer to 1 = more space between bars
        //.paddingInner
        //.paddingOuter

    ///////////////////////////////////////////////////////

    useEffect(() => {
        console.log(select(svgRef.current)) 

        if(!selection) {
            setSelection(select(svgRef.current))
        } else {

        selection
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 100)
            //.attr('x', d =>x(d.timestamp)!) // typescript ignores possiblity of null d.timestamp
            .attr('x', d=> {
                const xX = x(d.timestamp)
                if(xX) {
                    return xX;
                }
                return null;
            })
            .attr('fill', d => d.col)
            .attr('height', d=>y(d.count))
            //y scales the input
            
        ///////////////////////////////////////////////////////

            // const graph = selection
            //     .selectAll('rect')
            //     .data(data)
            //     .attr('width', 100)
            //     .attr('height', d => d.height)
            //     .attr('fill', d => d.col)
            //     .attr('x', (e,i) => i * 100); // horizontally adds 100 to the x axis based on i

            //entering this virtual selection, currently contains 2 bargraphs that do not
            //have a <rect/> available
            //.enter modifies that by entering the const graph
            // graph
            //     .enter()
            //     .append('rect')
            //     .attr('width', 100)
            //     .attr('height', d => d.height)
            //     .attr('fill', d => d.col)
            //     .attr('x', (e,i) => i * 100);

        ///////////////////////////////////////////////////////

                // .data(data)
                // .append('rect')
                // .attr('width', d => d.width)
                // .attr('height', d => d.height)
                // .attr('fill', d => d.col);

        ///////////////////////////////////////////////////////

                //hardcode
                // .append('rect')
                // .attr('height', 100)
                // .attr('width', 200)
                // .attr('fill', 'purple');
        }

        //select is a wrapper that provides properties and methods 
            //append
        //.current is a reference to the element

        // select(svgRef.current)
        //     .append('rect')
        //     .attr('width', 100)
        //     .attr('height', 100)
        //     .attr('fill', 'purple')
        
        // selectAll('rect') //(".className") <rect className=""/> 
        //     .append('rect')
        //     .attr('width', 100)
        //     .attr('height', 100)
        //     .attr('fill', 'purple') 
    }, [selection])

    ///////////////////////////////////////////////////////

    return (
        <div>
            <div>line</div>
            <svg ref ={svgRef} width={700} height={1000}>
            <div id="linechart"></div>
            </svg> 
        </div>
    )
}

{/* <svg ref ={ref} width={700} height={1000}>
                <rect/>
                <rect/>
                <rect/>
            </svg> */}

///////////////////////////////////////////////////////

//svg inclusions
//<line/>
//<rect width={100} height = {100} fill={}/>
//<circle/>

//export default LineChar
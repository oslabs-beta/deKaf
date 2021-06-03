import React, {useEffect, useRef, useState} from 'react';
import {select, selectAll, Selection} from 'd3-selection';
import {scaleLinear, scaleBand} from 'd3-scale';
import {max} from 'd3-array';
import {axisLeft, axisBottom} from 'd3-axis';
import * as d3 from 'd3';
import { easeCircle } from 'd3';


///////////////////////////////////////////////////////

//local

// const data = [
//     {width: 100, height: 250, col: "wine"},
//     {width: 100, height: 100, col: "black"},
//     {width: 100, height: 55, col: "yellow"},
//     {width: 100, height: 55, col: "burgundy"},
//     {width: 100, height: 300, col: "cream"}
// ];

const dataa = [
    {timestamp: 100, 
        //timestamp: "Monday", 
        metric: 'latency', unit:'milliseconds', count: 1000, col:'red'},
    {timestamp:200,
        //timestamp: "Tuesday", 
        metric: 'latency', unit:'milliseconds', count: 200, col: 'orange'},
    {timestamp:300,
        //timestamp: "Wednesday", 
    metric: 'latency', unit:'milliseconds', count: 342, col: 'yellow'},
    {timestamp: 400,
        //timestamp: "Thursday", 
    metric: 'latency', unit:'milliseconds', count: 132, col: 'green'},
    {timestamp: 500,
        //timestamp: "Friday", 
    metric: 'latency', unit:'milliseconds', count: 10, col: 'blue'},
    {timestamp: 600,
        //timestamp: "Saturday", 
    metric: 'latency', unit:'milliseconds', count: 123, col: 'purple'},
    {timestamp: 700,
        //timestamp: "Sunday", 
    metric: 'latency', unit:'milliseconds', count: 550, col: 'black'},
    {timestamp: 1000, 
        //timestamp: "Monday", 
        metric: 'latency', unit:'milliseconds', count: 1000, col:'red'},
    {timestamp:2000,
        //timestamp: "Tuesday", 
        metric: 'latency', unit:'milliseconds', count: 200, col: 'orange'},
    {timestamp:3000,
        //timestamp: "Wednesday", 
    metric: 'latency', unit:'milliseconds', count: 342, col: 'yellow'},
    {timestamp: 4000,
        //timestamp: "Thursday", 
    metric: 'latency', unit:'milliseconds', count: 132, col: 'green'},
    {timestamp: 5000,
        //timestamp: "Friday", 
    metric: 'latency', unit:'milliseconds', count: 10, col: 'blue'},
    {timestamp: 6000,
        //timestamp: "Saturday", 
    metric: 'latency', unit:'milliseconds', count: 123, col: 'purple'},
    {timestamp: 7000,
        //timestamp: "Sunday", 
    metric: 'latency', unit:'milliseconds', count: 550, col: 'black'},
]


let dimensions = {
    width: 800, 
    height: 730,

    chartW: 700,
    chartH: 700,

    margin: 70
}




// const updating = () => {

//     let randomX = Math.floor(Math.random() * 10000);
//     let randomY = Math.floor(Math.random() * 1000);
// //   {x value: y value }
//     let objectobject = {}
//     objectobject[randomX] = randomY;
//     console.log(`randomX: ${randomX}`);
//     console.log(`randomX: ${randomY}`);

//     for (const [k, v] of Object.entries(objectobject)) {
//             dataa.push({timestamp: k, metric: 'latency', unit:'milliseconds', count: v, col: "brown"})
//     }
//     return; 
// }


// setTimeout((), 3000);
///////////////////////////////////////////////////////
//: React.FC


//let data = [];
// function updating () {
   
   
//     let randomX = Math.floor(Math.random() * 10000);
//     let randomY = Math.floor(Math.random() * 1000);
// //   {x value: y value }
//     let objectobject = {}
//     objectobject[randomX] = randomY;
//     console.log(`randomX: ${randomX}`);
//     console.log(`randomX: ${randomY}`);

//     for (const [k, v] of Object.entries(objectobject)) {
//         dataa.push({timestamp: k, metric: 'latency', unit:'milliseconds', count: v, col: "brown"})
//     }
//     if (renderGraph) setTimeout(() => updating(), 5000);
// }

const Testing2 = (props) => {
    
    
    //let dataconverted = [];
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [data, setData] = useState(props.dataa)
    // const [renderGraph, setGraph] = useState(hahaprops.render)
    //y is .count
    //x is .timestamp
    // useEffect(() => {
    //     if (renderGraph === false) {
    //         updating()
    //      } 
    // })
    // setTimeout(() => {
    //     setGraph(false);
    // }, 5000);

// useEffect(() => {
//     setTimeout(() => updating(), 5000); 
// }, [data])
    
    // for (const [k, v] of Object.entries(props.dataa)) {
    //     data.push({timestamp: k, count: v, col: "brown"})
    //     console.log("IS THIS EVEN?????????????????")
    //     // if (!data.length) {
    //     //     data.push({timestamp: k, count: v, col: "brown"})
    //     // } else {
    //     //     data.forEach(e => {
    //     //         if (e.timestamp === k) e.count += v;
    
    //     //         else data.push({timestamp: k, count: v, col: "brown"})
    //     //     })
    //     // }
    //     //setData(dataconverted);
    // }



    
    //data.forEach(e => {console.log(e)}, "!!!!!!!!!!!!!!!!");
    //console.log(data, "!!!");
    ///////////////////////////////////////////////////////

    const [selection, setSelection] = useState<null | Selection<any, unknown, null, undefined>>(null);

    ///////////////////////////////////////////////////////

    //let maxValue = max(data, d => d.count) // imported function from d3-array can be used in y and x

    let y = scaleLinear()
        .domain([0, max(data, d => d.count) + (max(data, d => d.count)*0.3)!]) //count metric, in this case, latency
        .range([dimensions.chartH, 0]) // svg height range

    let x = scaleBand() //divide the range into uniform bands
        .domain(data.map(d=>d.timestamp)) //domain accepts unique identifiers for divison
        .range([0, dimensions.chartW]) //svg width range
        //.padding(0.1) //closer to 1 = more space between bars
        .paddingInner(0.3)
        .paddingOuter(0.3)

    let yAx = axisLeft(y)//.ticks
        //.tickFormat((d) => (`${d}`) )
    let xAx = axisBottom(x)

    let pathOfLine = 100;
    let LineEmUp = d3.line(pathOfLine);
    //let path = {fill: 'none', stroke: 'orange'};
    // let line = d3.line()
    //     .x(d => x(d.timestamp))
    //     .y(d => y(d.count));
    ///////////////////////////////////////////////////////

    useEffect(() => {
        console.log(select(svgRef.current)) 

        if(!selection) {
            setSelection(select(svgRef.current))
        } else {

        // selection  
        //     .append('rect')
        //     .attr('width', dimensions.width)
        //     .attr('height', dimensions.height)
        //     .attr('fill', "white")
        

        
    
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
            .attr('x', d=> {
                const xX = x(d.timestamp)
                if(xX) {
                    return xX;
                }
                return null;
            })
            .attr('width', x.bandwidth)
            .attr('y', dimensions.chartH)
            .attr('height', 0)
            
            .transition()
            .duration(1000)
            // .delay((e,i) => i * 100)
            .ease(easeCircle)

            //.attr('x', d =>x(d.timestamp)!) // typescript ignores possiblity of null d.timestamp
            //.attr('x', d=>(d.timestamp)!)

            .attr('height', d=> dimensions.chartH - y(d.count))
            .attr('y', d => y(d.count))
            .attr('fill', d => d.col)
            //y scales the input

            // selection
            // .append('path')
            // .attr('transform', `translate( ${dimensions.margin + 50}, 0)`)
            // .attr('fill', 'none')
            // .attr('stroke', 'orange')
            // .attr('stroke-width', 10)
            // .datum(data)
            // .attr("d", line);
           
            
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
    useEffect(() => {
        //find a way to update y axis
        if(selection){
            y = scaleLinear()
            .domain([0, max(data, d => d.count)]) //count metric, in this case, latency
            .range([dimensions.chartH, 0]) // svg height range
    
            x = scaleBand() //divide the range into uniform bands
            .domain(data.map(d=>d.timestamp)) //domain accepts unique identifiers for divison
            .range([0, dimensions.chartW]) //svg width range
            //.padding(0.1) //closer to 1 = more space between bars
            .paddingInner(0.1)

            yAx = axisLeft(y)//.ticks
            .tickFormat((d) => (`${d} messages`) )
            xAx = axisBottom(x)
            
            // xAxGroup = selection

            // .append('g')
            // .attr(
            //     'transform',
            //     `translate(${dimensions.margin}, ${dimensions.chartH})`
            // )
            // .call(xAx)

            // yAxGroup = selection
        
            // .append('g')
            // .attr(
            //     'transform',
            //     `translate(${dimensions.margin}, 0)`
            // )
            // .call(yAx)


            const grapheles = selection.selectAll('rect').data(data)

            grapheles
                .exit()
                .remove()
            
            grapheles
            .attr('transform', `translate( ${dimensions.margin}, 0)`)
            .attr('width', x.bandwidth)
            .attr('height', d=> dimensions.chartH - y(d.count))
            //.attr('x', d =>x(d.timestamp)!) // typescript ignores possiblity of null d.timestamp
            .attr('x', d=> {
                const xX = x(d.timestamp)
                if(xX) {
                    return xX;
                }
                return null;
            })
            .attr('y', d => y(d.count))
            .attr('fill', d => d.col)

            grapheles
            .enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d=> dimensions.chartH - y(d.count))
            //.attr('x', d =>x(d.timestamp)!) // typescript ignores possiblity of null d.timestamp
            .attr('x', d=> {
                const xX = x(d.timestamp)
                if(xX) {
                    return xX;
                }
                return null;
            })
            .attr('y', d => y(d.count))
            .attr('fill', d => d.col)

        }
    }, [data])

    // const addData = () => {
    //     let dataToAdd = {
    //         timestamp: 'Random',
    //         metric: 'random',
    //         unit: 'random',
    //         count: Math.floor(Math.random() * 300),
    //         col: 'orange'
    //     } 
    //     setData([...data, dataToAdd]);
    // }

    // const removeData = () => {
    //     if (data.length === 0) {
    //         return
    //     }
    //     let slicedData = data.slice(0, data.length - 1);
    //     setData(slicedData);
    // }


    return (
        <div>
            <div></div>
            <svg ref ={svgRef} width={dimensions.width} height={dimensions.height}>
                
            </svg> 
            {/* <button onClick={addData}>Add</button>
            <button onClick={removeData}>Rem</button> */}

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

export default Testing2;
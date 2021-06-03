import React, {useEffect, useRef, useState} from 'react';
import {select, selectAll, Selection} from 'd3-selection';
import {scaleLinear, scaleBand} from 'd3-scale';
import {max} from 'd3-array';
import {axisLeft, axisBottom} from 'd3-axis';
import * as d3 from 'd3';
import { easeCircle } from 'd3';


///////////////////////////////////////////////////////
let dimensions = {
    
    width: 800, 
    height: 730,

    chartW: 700,
    chartH: 700,

    margin: 70

}
///////////////////////////////////////////////////////
//: React.FC



const Line = (props) => {
    let arr = [];
    let data = [];

    const svgRef = useRef<SVGSVGElement | null>(null)
    //const [data, setData] = useState(dataconverted)
  
    for (const [k, v] of Object.entries(props.dataa)) {
        arr.push({timestamp: k, count: v, col: "green"})
 
    }
        data = arr.slice(arr.length-20, arr.length-1);

    const [selection, setSelection] = useState<null | Selection<any, unknown, null, undefined>>(null);

    ///////////////////////////////////////////////////////

    let maxValue = max(data, d => d.count) // imported function from d3-array can be used in y and x

    let y = scaleLinear()
        .domain([0, max(data, d => d.count) + (max(data, d => d.count)*0.3)]) //count metric, in this case, latency
        .range([dimensions.chartH, 0]) // svg height range

    let x = scaleBand() //divide the range into uniform bands
        .domain(data.map(d=>d.timestamp)) //domain accepts unique identifiers for divison
        .range([0, dimensions.chartW]) //svg width range
        //.padding(0.1) //closer to 1 = more space between bars
        .paddingInner(0.3)
        .paddingOuter(0.3)

    let yAx = axisLeft(y);
    let xAx= axisBottom(x);
    let xAxGroup;
    let yAxGroup;

    let pathOfLine ;
    let LineEmUp;
    //let path = {fill: 'none', stroke: 'orange'};
    let line;
    ///////////////////////////////////////////////////////

    useEffect(() => {
        if(!selection) {
            setSelection(select(svgRef.current))
        } else {

        y = scaleLinear()
            .domain([0, max(data, d => d.count) + (max(data, d => d.count)*0.3)]) 
            .range([dimensions.chartH, 0]) 

        x = scaleBand()
            .domain(data.map(d=>d.timestamp))
            .range([0, dimensions.chartW])
            
            .paddingInner(0.3)
            .paddingOuter(0.3)
    
        yAx = axisLeft(y)
        xAx = axisBottom(x)
        
        selection
            .selectAll(".xaxis").remove()

        selection
            .selectAll(".yaxis").remove()
        
        ///////////////////////////////////////////////////////

        xAxGroup = selection
            .append('g')
            .attr("class","xaxis")
            .attr(
                'transform',
                `translate(${dimensions.margin}, ${dimensions.chartH})`
            )
            .call(xAx)

        yAxGroup = selection
        
            .append('g')
            .attr("class","xaxis")
            .attr(
                'transform',
                `translate(${dimensions.margin}, 0)`
            )
            .call(yAx)

        selection
            .selectAll(".line").remove()

        pathOfLine = 100;
        LineEmUp = d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]])
        //LineEmUp = d3.line(pathOfLine);
        line = d3.line()
            .x(d => x(d.timestamp))
            .y(d => y(d.count));
        ///////////////////////////////////////////////////////  
        // if (selection.selectAll(".line")[0].length>1) {

        //     selection
        //         .selectAll(".line")
        //         .datum(data)
        //         .append('path')
        //         .transition()
        //         .duration(1000)
        //         .attr("class", "line")
        //         .attr('transform', `translate( ${dimensions.margin}, 0)`)
        //         .attr('fill', 'none')
        //         .attr('stroke', 'green')
        //         .attr('stroke-width', 1.1)
        //         .attr("d", line);
    
        //     } else {
        // selection
        //     .append('path')
        //     .attr("class", "line")
        //     .attr('transform', `translate( ${dimensions.margin}, 0)`)
        //     .attr('fill', 'none')
        //     .attr('stroke', 'green')
        //     .attr('stroke-width', 1.1)
        //     .datum(data)
        //     .attr("d", line);
           
            selection
            .append('path')
            .attr("class", "line")
            .attr('transform', `translate( ${dimensions.margin + 20}, 0)`)
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .datum(data)
            .attr("d", LineEmUp)
            .transition()
            //delay((e,i) => i * 1000)
            .duration(1000)
            .ease(easeCircle)
            //.datum(data)
            .attr('stroke-width', 9)
            .attr("d", 
                d3.line()
                .x(d => x(d.timestamp))
                .y(d => y(d.count))
            )
        //     }
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

        yAx = axisLeft(y)

        xAx = axisBottom(x)

        selection
            .selectAll(".xaxis").remove()
            
        selection
            .selectAll(".yaxis").remove()

        xAxGroup = selection
            .append('g')
            .attr("class", "xaxis")
            .attr(
                'transform',
                `translate(${dimensions.margin}, ${dimensions.chartH})`
            )
            .call(xAx)

        yAxGroup = selection
            .append('g')
            .attr("class", "yaxis")
            .attr(
                'transform',
                `translate(${dimensions.margin}, 0)`
            )
            .call(yAx)

        pathOfLine = -1000;
        //LineEmUp = d3.line(pathOfLine);
        LineEmUp = d3.line()([[10, 60], [40, 90], [60, 10], [190, 10]])
        // linezero = d3.line()
        // .x(d => x(d.timestamp))
        // .y(d => y(d.count));

        line = d3.line()
            .x(d => x(d.timestamp)!)
            .y(d => y(d.count)!);

        selection
            .selectAll(".line").remove()

            // if (selection.selectAll(".line")[0].length>1) {

            //     selection
            //         .selectAll(".line")
            //         .append('path')
            //         .datum(data)
            //         .transition()
            //         .duration(1000)
            //         .ease(easeCircle)
            //         .attr("class", "line")
            //         .attr('transform', `translate( ${dimensions.margin}, 0)`)
            //         .attr('fill', 'none')
            //         .attr('stroke', 'green')
            //         .attr('stroke-width', 1.1)
            //         .attr("d", line);
        
            //     } else {
    
                
            // selection
            //     .append('path')
            //     .attr("class", "line")
            //     .attr('transform', `translate( ${dimensions.margin}, 0)`)
            //     .attr('fill', 'none')
            //     .attr('stroke', 'green')
            //     .attr('stroke-width', 1.1)
            //     .datum(data)
            //     .attr("d", line);
               
            //     }

                // ========================================
        selection
            .append('path')
            .attr("class", "line")
            .attr('transform', `translate( ${dimensions.margin + 20}, 0)`)
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .datum(data)
            .attr("d", LineEmUp)
            .transition()
            //delay((e,i) => i * 1000)
            .duration(1000)
            .ease(easeCircle)
            //.datum(data)
            .attr('stroke-width', 9)
            .attr("d", 
                d3.line()
                .x(d => x(d.timestamp))
                .y(d => y(d.count))
            )
            
        }
    }, [data])

   

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

export default Line;
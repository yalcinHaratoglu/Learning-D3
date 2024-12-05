import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const BarChart = () => {
  const [barData, setBarData] = useState(generateRandomData());
  const ref = useRef<SVGSVGElement>(null);

  function generateRandomData() {
    return Array.from({ length: Math.floor(Math.random() * 6) + 3 }, () =>
      Math.floor(Math.random() * 100)
    );
  }
  const width = 600;
  const height = 300;

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 80 };

    const svgHeight = height - margin.bottom;

    const svg = d3.select(ref.current);

    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(barData.map((_, i) => i.toString()))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData)!])
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "darkGray")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("visibility", "hidden")
      .style("pointer-events", "none");

    svg
      .selectAll("rect")
      .data(barData)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (_, i) => xScale(i.toString())!)
            .attr("height", 0)
            .attr("y", svgHeight)
            .attr("width", xScale.bandwidth())
            .attr("fill", "white")
            .attr("stroke", "dark")
            .attr("stroke-width", 2)
            .on("mouseover", (_, d) => {
              tooltip.style("visibility", "visible").text(d);
            })
            .on("mousemove", (event) => {
              tooltip
                .style("top", `${event.pageY - 20}px`)
                .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", () => {
              tooltip.style("visibility", "hidden");
            }),
        (update) => update,
        (exit) =>
          exit
            .transition()
            .duration(1000)
            .attr("height", 0)
            .attr("y", svgHeight)
            .remove()
      )
      .transition()
      .duration(1000)
      .attr("x", (_, i) => xScale(i.toString())!)
      .attr("height", (d) => d)
      .attr("y", (d) => svgHeight - d);

    // Add X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => `Bar ${+d + 1}`));

    // Add Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }, [barData]);

  const updateData = () => {
    setBarData(generateRandomData());
  };

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          padding: "10px",
          borderBottom: "1px solid white",
        }}
      >
        Bar Chart
      </h3>
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <svg
          ref={ref}
          width="100%"
          height="auto"
          viewBox={`0 0 ${width} ${height}`}
          style={{ border: "1px solid white", flex: "2" }}
        ></svg>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <button onClick={updateData}>New Data!</button>
          <code
            style={{
              fontSize: "20px",
            }}
          >
            {JSON.stringify(barData)}
          </code>
        </div>
      </div>
    </>
  );
};

export default BarChart;

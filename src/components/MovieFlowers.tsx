import { useEffect } from "react";
import * as d3 from "d3";
import {
  petalPathsObj,
  colors,
  petalColors,
  topGenres,
  petalPaths,
} from "../constants";
import movies from "../constants/movies.json";
import { calculateGridPos } from "../utils";

const MoviewFlowers = () => {
  const pathWidth = 120;
  const perRow = 9;
  const t = 4;

  useEffect(() => {
    const svg = d3.select("#flowers");
    const svgHeight = (Math.floor(movies.length / perRow) + 0.5) * pathWidth;
    const svgWidth = perRow * pathWidth;

    const colorScale = d3
      .scaleOrdinal()
      .domain(topGenres)
      .range(petalColors)
      .unknown(colors.Other);

    const pathScale = d3.scaleOrdinal().range(petalPaths);

    const minMaxRating = d3.extent(movies, (d) => d.rating);

    const sizeScale = d3
      .scaleLinear()
      .domain(minMaxRating as [number, number])
      .range([0.2, 0.6]);

    const minMaxVotes = d3.extent(movies, (d) => d.votes);

    const numPetalScale = d3
      .scaleQuantize()
      .domain(minMaxVotes as [number, number])
      .range([4, 5, 6, 7, 8, 9, 10]);

    const flowers = movies.map((d, i) => ({
      color: colorScale(d.genres[0]),
      path: pathScale(d.rated),
      scale: sizeScale(d.rating),
      numPetals: numPetalScale(d.votes),
      title: d.title,
      translate: calculateGridPos(i),
    }));

    svg
      .attr("width", "100%")
      .attr("height", "auto")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .style("border", "1px solid white");

    const g = svg
      .selectAll("g")
      .data(flowers)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.translate})`);

    // create our petal paths
    g.selectAll("path")
      .data((d) =>
        Array.from({ length: d.numPetals }, (_, i) => ({
          ...d,
          rotate: i * (360 / d.numPetals),
        }))
      )
      .enter()
      .append("path")
      .attr("transform", (d) => `rotate(${d.rotate}) scale(${d.scale})`)
      .attr("d", (d) => d.path as string)
      .attr("fill", (d) => d.color as string)
      .attr("stroke", (d) => d.color as string)
      .attr("fill-opacity", 0.5)
      .attr("stroke-width", 2);

    g.append("text")
      .text((d) => d.title.slice(0, 15))
      .style("cursor", "pointer")
      .style("fill", "white")
      .attr("font-size", ".7em")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-style", "italic")
      .append("title")
      .text((d) => d.title);
  }, []);

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          padding: "10px",
          borderBottom: "1px solid white",
          borderTop: "1px solid white",
        }}
      >
        Movie Flowers
      </h3>
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px 20px" }}
      >
        <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
          Bu grafik, filmlerin farklı özelliklerini çiçek yapraklarıyla temsil
          eder. Çiçeklerin renkleri, filmlerin türlerine göre belirlenmiştir:
        </p>
        <ul style={{ listStyleType: "square", paddingLeft: "20px" }}>
          <li>
            <strong>Aksiyon</strong>: Kırmızı - Hız ve heyecanı simgeler.
          </li>
          <li>
            <strong>Komedi</strong>: Turuncu - Neşeli ve eğlenceli atmosferi
            yansıtır.
          </li>
          <li>
            <strong>Animasyon</strong>: Yeşil - Yaratıcılığı ve doğallığı temsil
            eder.
          </li>
          <li>
            <strong>Drama</strong>: Mavi - Derinlik ve duygusallığı simgeler.
          </li>
          <li>
            <strong>Gizem</strong>: Mor - Gizemli ve keşfedilmeyi bekleyen
            unsurları ifade eder.
          </li>
          <li>
            <strong>Macera</strong>: Turkuaz - Hareket ve keşif duygusunu
            çağrıştırır.
          </li>
        </ul>
        <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
          Her çiçek, bir filmin aldığı oya göre şekillendirilmiştir. Yaprak
          sayısı, filmin aldığı oylara orantılıdır: Daha yüksek oyu olan filmler
          daha fazla yaprağa sahip olur. Yaprak boyutu ise, filmin reytingine
          göre büyür. Yüksek reytingli filmler daha büyük yapraklarla temsil
          edilir.
        </p>
        <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}>Özetle:</p>
        <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
          <li>Renkler: Film türünü gösterir.</li>
          <li>Yaprak Sayısı: Filmin aldığı oyu temsil eder.</li>
          <li>Yaprak Boyutu: Filmin reytingine bağlı olarak değişir.</li>
        </ul>
        <svg
          id="flowers"
          style={{
            border: "1px solid white",
            marginTop: "20px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></svg>
      </div>
    </>
  );
};

export default MoviewFlowers;

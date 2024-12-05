import { useEffect, useState } from "react";
import * as d3 from "d3";
import { parentalGuidelines, genresColors, petalPaths } from "../../constants";
import movies from "../../constants/movies.json";
import { calculateGridPos } from "../../utils";

const MoviewFlowers = () => {
  const pathWidth = 120;
  const [containerWidth, setContainerWidth] = useState(1200); // Başlangıç genişliği
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    Object.keys(genresColors)
  );
  const [selectedRatings, setSelectedRatings] =
    useState<string[]>(parentalGuidelines);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setContainerWidth(width);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const svg = d3.select("#flowers");
    const perRowDynamic = Math.floor(containerWidth / pathWidth);
    const svgWidth = containerWidth;
    const svgHeight =
      (Math.floor(movies.length / perRowDynamic) + 0.5) * pathWidth;

    const colorScale = d3
      .scaleOrdinal()
      .domain(Object.keys(genresColors))
      .range(Object.values(genresColors))
      .unknown(genresColors.Other);

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

    const filteredMovies = movies.filter((movie) => {
      const primaryGenre = movie.genres[0];
      return (
        selectedGenres.includes(primaryGenre) &&
        selectedRatings.includes(movie.rated)
      );
    });

    const flowers = filteredMovies.map((d, i) => ({
      color: colorScale(d.genres[0] || "Other"),
      path: pathScale(d.rated),
      scale: sizeScale(d.rating),
      numPetals: numPetalScale(d.votes),
      title: d.title,
      translate: calculateGridPos(i, perRowDynamic, pathWidth),
    }));

    const t = d3.transition().duration(500);

    svg
      .attr("width", "100%")
      .attr("height", "auto")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .style("border", "1px solid white");

    svg
      .selectAll("g")
      .data(flowers, (d: any) => d.title)
      .join(
        (enter) => {
          const g = enter
            .append("g")
            .attr("opacity", 0)
            .attr("transform", (d) => `translate(${d.translate})`);

          g.selectAll("path")
            .data((d) =>
              Array.from({ length: d.numPetals }, (_, i) => ({
                ...d,
                rotate: i * (360 / d.numPetals),
              }))
            )
            .join("path")
            .attr("transform", (d) => `rotate(${d.rotate})scale(${d.scale})`)
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

          return g;
        },

        (update) => update,
        (exit) => exit.transition(t).attr("opacity", 0).remove()
      )
      .transition(t)
      .attr("opacity", 1)
      .attr("transform", (d) => `translate(${d.translate})`);
  }, [selectedGenres, selectedRatings, containerWidth]);

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: "row",
            marginTop: "20px",
          }}
        >
          {Object.keys(genresColors).map((genre) => (
            <div
              key={genre}
              style={{
                backgroundColor: genresColors[genre],
                padding: "5px 10px",
                borderRadius: "5px",
                color: "#111827",
              }}
            >
              <input
                type="checkbox"
                id={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                style={{
                  marginRight: "5px",
                }}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: "row",
            margin: "20px 0",
          }}
        >
          {parentalGuidelines.map((rating) => (
            <div key={rating}>
              <input
                type="checkbox"
                id={rating}
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                style={{ marginRight: "5px" }}
              />
              <label htmlFor={rating}>{rating}</label>
            </div>
          ))}
        </div>
        <svg
          id="flowers"
          style={{
            border: "1px solid white",
            display: "block",
            margin: "0 auto",
          }}
        ></svg>
      </div>
    </>
  );
};

export default MoviewFlowers;

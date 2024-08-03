import React, { useMemo, useEffect, useState, useCallback, useRef } from "react";
import "./VennDiagramPage.css";
import { VennDiagram, asSets } from "@upsetjs/react";
import * as d3 from "d3";
import * as venn from "venn.js";

const VennDiagramPage = () => {
  const [inputSet1, setInputSet1] = useState(["abc"]);
  const [inputSet2, setInputSet2] = useState(["test"]);

  const calculateIntersection = (set1, set2) =>
    set1.filter((x) => set2.includes(x));

  const baseSets = useMemo(() => [
    { sets: ["Set 1"], size: inputSet1.length, elements: inputSet1 },
    { sets: ["Set 2"], size: inputSet2.length, elements: inputSet2 },
    {
      sets: ["Set 1", "Set 2"],
      size: calculateIntersection(inputSet1, inputSet2).length,
      elements: calculateIntersection(inputSet1, inputSet2),
    },
  ], [inputSet1, inputSet2]);

//   const baseSets = useMemo(() => [
//     { sets: ["Set 1"], size: 12, elements: inputSet1 },
//     { sets: ["Set 2"], size: 12, elements: inputSet2 },
//     {
//       sets: ["Set 1", "Set 2"],
//       size: 2,
//       elements: calculateIntersection(inputSet1, inputSet2),
//     },
//   ], [inputSet1, inputSet2]);

  useEffect(() => {
    const chart = venn.VennDiagram();
    const div = d3.select("#venn");
    div.datum(baseSets).call(chart);

    d3.selectAll("#venn .venn-circle path")
      .style("fill", "white")
      .style("stroke", "black");

    d3.selectAll("#venn text")
      .style("fill", "black")
      .each(function (d) {
        if (d.sets.length === 1 && d.sets[0] === "Set 1") {
          d3.select(this).text("abc");
        } else if (d.sets.length === 1 && d.sets[0] === "Set 2") {
          d3.select(this).text("test");
        } else if (
          d.sets.length === 2 &&
          d.sets.includes("Set 1") &&
          d.sets.includes("Set 2")
        ) {
          d3.select(this).text("abc, test");
        } else {
          d3.select(this).text(d.size);
        }
      });

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "venntooltip")
      .style("position", "absolute")
      .style("text-align", "center")
      .style("width", "auto")
      .style("height", "auto")
      .style("background", "#333")
      .style("color", "#fff")
      .style("padding", "10px")
      .style("font-size", "14px")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    div.selectAll("g")
      .on("mouseover", function (event, d) {
        if (!d.sets) return;

        venn.sortAreas(div, d);

        const elementsList = d.elements.join(", ");
        tooltip.transition().duration(400).style("opacity", 0.9);
        tooltip.html(`${elementsList} (${d.size})`);

        const selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path").style("stroke-width", 3);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 40 + "px");
      })
      .on("mouseout", function (event, d) {
        if (!d.sets) return;
        tooltip.transition().duration(400).style("opacity", 0);
        const selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path").style("stroke-width", 0);
      });

    return () => {
      tooltip.remove();
    };
  }, [baseSets]);

//   const baseSets2 = [
//     { name: "A", elems: inputSet1 },
//     { name: "B", elems: inputSet2 },
//   ];

//   const [selection, setSelection] = useState(null);
//   const [value, setValue] = useState(3);

//   const sets = useMemo(() => asSets(baseSets2).slice(0, value), [value, baseSets2]);

  const [isFixed, setIsFixed] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const atlasLinks = {
    "25 - OLF/CTX":
      "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960424&resolution=13.96&x=5640&y=3983.9998372395835&zoom=-3&structure=342",
    "36 - STR/PAL/OLF/CTX":
      "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960380&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=852",
    "69 - CTX/HPF/TH/HY/CP":
      "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960248&resolution=13.96&x=5640&y=3984.000161488851&zoom=-3&structure=342",
    "85 - MB/TH/HPF/CTX":
      "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960057&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=342",
    "98 - MB/P/CTX":
      "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100966096&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=342",
    "111 - CB/MY":
      "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960181&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=852",
  };

  return (
    <>
      <div className="wrapper">
        <h1 style={{ fontFamily: "ITC", margin: "3rem" }}>Venn Diagram Page</h1>
        <div className="container">
          <div
            className="filters"
            ref={divRef}
            style={{
              position: isFixed ? "absolute" : "absolute",
              top: isFixed ? "28rem" : "100px",
              backgroundColor: "#ddd",
              height: "69rem",
            }}
          >
            <h3>Set 1</h3>
            <input
              value={inputSet1.join(",")}
              onChange={(e) =>
                setInputSet1(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
            />
            <h3 style={{ marginTop: "20px" }}>Set 2</h3>
            <input
              value={inputSet2.join(",")}
              onChange={(e) =>
                setInputSet2(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
            />

            <h4 style={{ marginTop: "50px" }}>Region Image</h4>
            <img
              src={`Saggital Whole Brain_Larger Numbers.png`}
              style={{ width: "100%", marginBottom: "2rem" }}
            />

            <h4>View section in the Allen Brain Atlas</h4>
            <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
              {Object.keys(atlasLinks).map((key) => (
                <li key={key} style={{ margin: "1rem 0" }}>
                  <a
                    style={{ textDecoration: "none" }}
                    href={atlasLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Section: {key}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="temp">
            <div className="text-2">
              <div className="body-header">
                <img className="body-icon" src="/coronal.png" />
                <div className="body-title">Heatmap by Coronal Section</div>
              </div>
              <div className="moto">
                Below is a coronal atlas of lipofuscin load in wild type (WT)
                and PPT1 knockout (KO) mice with age. To explore lipofuscin
                deposition in coronal sections, select the desired genotypes and
                time points from the top menu on the left. To view lipofuscin
                load in a particular set of anatomical regions, select
                section(s) of interest from the bottom menu. To explore the fine
                anatomical areas represented in coronal sections, navigate to
                the Allen Brain Atlas using the links below the sagittal atlas
                legend.
              </div>
              <div className="word-description">
                <ul>
                  <li>
                    Lipofuscin load is graphed on a scale of 0-0.2 for maximum
                    contrast across all conditions.
                  </li>
                  <li>
                    Data were obtained for the right sagittal hemisphere and
                    reflected across the midline for visualization purposes.
                  </li>
                  <li>
                    Areas in grey indicate that load data was not obtained for
                    that region, due to superimposition of sagittal section data
                    on a coronal map.
                  </li>
                </ul>
              </div>
              {/* <div>
                <VennDiagram
                  sets={sets}
                  width={780}
                  height={500}
                  selection={selection}
                  onHover={(e) => {
                    if (e) {
                      setSelection(e.elems);
                    } else {
                      setSelection(null);
                    }
                  }}
                />
              </div>
              {selection && (
                <div className="selection-info">
                  <h4>Hovered Elements:</h4>
                  <ul>
                    {selection.map((elem, index) => (
                      <li key={index}>{elem}</li>
                    ))}
                  </ul>
                </div>
              )} */}
              <div id="venn"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VennDiagramPage;

import React, { useMemo, useEffect, useState, useRef } from "react";
import "./VennDiagramPage.css";
import * as d3 from "d3";
import * as venn from "venn.js";

const VennDiagramPage = () => {
  const [inputSet1, setInputSet1] = useState(["abc", "pop"]);
  const [inputSet2, setInputSet2] = useState(["test", "pop"]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedTextArea, setSelectedTextArea] = useState("");
  const [selectedSetName, setSelectedSetName] = useState("");
  
  const calculateIntersection = (set1, set2) =>
    set1.filter((x) => set2.includes(x));

  const baseSets = useMemo(
    () => [
      { sets: ["Set 1"], size: inputSet1.length, elements: inputSet1 },
      { sets: ["Set 2"], size: inputSet2.length, elements: inputSet2 },
      {
        sets: ["Set 1", "Set 2"],
        size: calculateIntersection(inputSet1, inputSet2).length,
        elements: calculateIntersection(inputSet1, inputSet2),
      },
    ],
    [inputSet1, inputSet2]
  );

  useEffect(() => {
    const chart = venn.VennDiagram();
    const div = d3.select("#venn");
    div.datum(baseSets).call(chart);

    d3.selectAll("#venn .venn-circle path")
      .style("fill", "white")
      .style("stroke", "black");

    d3.selectAll("#venn text").style("fill", "black");

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
        // venn.sortAreas(div, d);

        tooltip.transition().style("opacity", 0.9);
        tooltip.html(`${d.size}`);

        if (!d.sets || selectedArea === d.sets.join(",")) return;

        const selection = d3.select(this).transition("tooltip")
        selection
          .select("path")
          .style("fill", "#c2c2c2")
          .style("fill-opacity", d.sets.length === 1 ? 0.4 : 0.5);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 40 + "px");
      })
      .on("mouseout", function (event, d) {

        tooltip.transition().style("opacity", 0);

        if (!d.sets || selectedArea === d.sets.join(",")) return;

        const selection = d3.select(this).transition("tooltip")
        selection
          .select("path")
          // .style("fill", "white")
          .style("fill-opacity", d.sets.length === 1 ? 0 : 0.0);
      })
      .on("click", function (event, d) {
        console.log(d);
        if (d.elements) {
          const elementDetails = d.elements.map((elem) => {
            if (inputSet1.includes(elem) && inputSet2.includes(elem)) {
              return `${elem} (both sets)`;
            } else if (inputSet1.includes(elem)) {
              return `${elem} (Set 1)`;
            } else if (inputSet2.includes(elem)) {
              return `${elem} (Set 2)`;
            }
            return elem;
          });

          setSelectedElements(elementDetails);
          setSelectedTextArea(elementDetails.join("\n"));

          setSelectedArea(d.sets.join(","));
          setSelectedSetName(d.sets.length === 1 ? d.sets[0] : "Intersection");

          // Set fill color to gray for the intersection area
          d3.select(this).select("path").style("fill", "#404040");
        }
      });

    return () => {
      tooltip.remove();
    };
  }, [baseSets, inputSet1, inputSet2, selectedArea]);

  useEffect(() => {
    d3.selectAll("#venn .venn-circle path").style("fill", function (d) {
      const isSelected = selectedArea === d.sets.join(",");
      return isSelected ? "#404040" : "white";
    });
  }, [selectedArea]);

  const [isFixed, setIsFixed] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
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
  };

  const downloadSelectedSet = () => {
    const element = document.createElement("a");
    const file = new Blob([selectedTextArea], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedSetName.replace(/\s/g, "_")}_selected_set.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetSets = () => {
    setInputSet1(["abc", "pop"]);
    setInputSet2(["test", "pop"]);
    setSelectedElements([]);
    setSelectedArea(null);
    setSelectedTextArea("");
    setSelectedSetName("");
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
              top: isFixed ? "14rem" : "100px",
              backgroundColor: "#ddd",
              height: "69rem",
            }}
          >
            <h3>Set 1</h3>
            <textarea
              value={inputSet1.join("\n")}
              onChange={(e) =>
                setInputSet1(
                  e.target.value.split("\n").map((item) => item.trim())
                )
              }
              className="input-textarea"
            />
            <h3 style={{ marginTop: "20px" }}>Set 2</h3>
            <textarea
              value={inputSet2.join("\n")}
              onChange={(e) =>
                setInputSet2(
                  e.target.value.split("\n").map((item) => item.trim())
                )
              }
              className="input-textarea"
            />
            <button onClick={resetSets} style={{ marginTop: "20px" }}>
              Reset Sets
            </button>
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
              <div style={{ display: "flex" }}>
                <div id="venn"></div>
                <div>
                  {selectedElements.length > 0 && (
                    <div className="selection-info">
                      <h4>Selected Set: {selectedSetName}</h4>
                      <textarea
                        value={selectedTextArea}
                        readOnly
                        className="input-textarea"
                      />
                      <button onClick={downloadSelectedSet} style={{ marginTop: "10px" }}>
                        Download Selected Set
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VennDiagramPage;

import React, { useMemo, useEffect, useState, useRef } from "react";
import "./VennDiagramPage.css";
import * as d3 from "d3";
import * as venn from "venn.js";
import * as XLSX from "xlsx";


const VennDiagramPage = () => {
  const [inputSet1, setInputSet1] = useState([]);
  const [inputSet2, setInputSet2] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedTextArea, setSelectedTextArea] = useState("");
  const [selectedSetName, setSelectedSetName] = useState("");

  const capRatioDifference = (size1, size2, maxRatio = 5) => {
    if (size1 === 0 || size2 === 0) return { cappedSize1: size1, cappedSize2: size2 }; // Avoid division by zero
    const ratio = size1 / size2;
  
    if (ratio > maxRatio) {
      return { cappedSize1: size2 * maxRatio, cappedSize2: size2 };
    } else if (ratio < 1 / maxRatio) {
      return { cappedSize1: size1, cappedSize2: size1 * maxRatio };
    } else {
      return { cappedSize1: size1, cappedSize2: size2 };
    }
  };
  
  
  const calculateIntersection = (set1, set2) =>
    set1.filter((x) => set2.includes(x));

  const baseSets = useMemo(
    () => {
      const { cappedSize1, cappedSize2 } = capRatioDifference(inputSet1.length, inputSet2.length);

      return [
      { sets: ["Set 1"], size: cappedSize1, elements: inputSet1 },
      { sets: ["Set 2"], size: cappedSize2, elements: inputSet2 },
      {
        sets: ["Set 1", "Set 2"],
        size: calculateIntersection(inputSet1, inputSet2).length,
        elements: calculateIntersection(inputSet1, inputSet2),
      },
    ]},
    [inputSet1, inputSet2]
  );

  useEffect(() => {
    const chart = venn.VennDiagram();
    const div = d3.select("#venn");
    div.datum(baseSets).call(chart);

    d3.selectAll("#venn .venn-circle path")
    .filter((d) => d.sets && d.sets.length === 1 && d.sets[0] === "Set 1")
      .style("fill", "white")
      .style("stroke", "#FF00FF");

    d3.selectAll("#venn text").style("fill", function (event, d) {
      if (d == 0) {
        return "#ff24ed"
      }
      else {
        return "black"
      }
      })

    d3.selectAll("#venn .venn-circle path")
    .filter((d) => d.sets && d.sets.length === 1 && d.sets[0] === "Set 2")
    .style("fill", "white")
    .style("stroke", "black");


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
        // Determine which set the hovered area corresponds to
        let size = 0;
        if (d.sets.includes("Set 1") && d.sets.length === 1) {
          size = inputSet1.length;
        } else if (d.sets.includes("Set 2") && d.sets.length === 1) {
          size = inputSet2.length;
        } else if (d.sets.includes("Set 1") && d.sets.includes("Set 2")) {
          size = calculateIntersection(inputSet1, inputSet2).length;
        }
    
        tooltip.transition().style("opacity", 0.9);
        tooltip.html(`${size}`); // Show the calculated size

        if (!d.sets || selectedArea === d.sets.join(",")) return;

        const selection = d3.select(this).transition("tooltip")
        selection
          .select("path")
          .style("fill", function (d) {
            if (d.sets.length === 1 && d.sets[0] === "Set 1") {
              return "#f76fec"
            }
            if (d.sets.length === 1 && d.sets[0] === "Set 2") {
              return "#c2c2c2"
            }
            return "#c2c2c2"
          })
          // .style("fill", "#c2c2c2")
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

          // d3.select(this).select("path").style("fill", "#404040");
          d3.select(this).select("path").style("fill", "#FF00FF")

        }
      });

    return () => {
      tooltip.remove();
    };
  }, [baseSets, inputSet1, inputSet2, selectedArea]);

  useEffect(() => {
    d3.selectAll("#venn .venn-circle path").style("fill", function (d) {
      const isSelected = selectedArea === d.sets.join(",");
  
      // Check if the set is "Set 1"
      if (d.sets.length === 1 && d.sets[0] === "Set 1") {
        return isSelected ? "#FF00FF" : "white"; // Change fill color for Set 1
      }
  
      // Check if the set is "Set 2"
      if (d.sets.length === 1 && d.sets[0] === "Set 2") {
        return isSelected ? "#404040" : "white"; // Change fill color for Set 2
      }
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
    setInputSet1([]);
    setInputSet2([]);
    setSelectedElements([]);
    setSelectedArea(null);
    setSelectedTextArea("");
    setSelectedSetName("");
  };

  const handleFileUpload = (event, setNumber) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming data is in the first sheet and first column
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Flatten the excel data and map each item to a string
      const parsedData = excelData.flat().map((item) => item.toString().trim());
      if(setNumber == 1) {
        setInputSet1(parsedData);
      } else {
        setInputSet2(parsedData);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <div className="wrapper">
        <h1 style={{ fontFamily: "ITC", margin: "3rem" }}>Lipofuscin Proteome</h1>
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
            <div>
              <h3 style={{ marginTop: "10px" }}>Set 1</h3>
              <textarea
                value={inputSet1.join("\n")}
                onChange={(e) =>
                  setInputSet1(
                    e.target.value.split("\n").map((item) => item.trim())
                  )
                }
                className="input-textarea"
              />
              <h4 style={{marginBottom: "10px", marginTop: "0"}}>
                Upload Set 1
              </h4>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => handleFileUpload(e, 1)}
              />
            </div>
            <div>
              <h3 style={{ marginTop: "40px" }}>Set 2</h3>
              <textarea
                value={inputSet2.join("\n")}
                onChange={(e) =>
                  setInputSet2(
                    e.target.value.split("\n").map((item) => item.trim())
                  )
                }
                className="input-textarea"
              />
              <h4 style={{marginBottom: "10px", marginTop: "0"}}>
                Upload Set 2
              </h4>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => handleFileUpload(e, 2)}
              />
            </div>
            <button onClick={resetSets} style={{ marginTop: "20px", marginBottom: "30px" }}>
              Clear Sets
            </button>
            {/* <h4 style={{ marginTop: "50px" }}>Region Image</h4>
            <img
              src={`Saggital Whole Brain_Larger Numbers.png`}
              style={{ width: "100%", marginBottom: "2rem" }}
            /> */}

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
                <img className="body-icon" src="/Venn Logo.png" />
                <div className="body-title">Lipofuscin Proteome</div>
              </div>
              <div className="moto">
              Proteins present in autofluorescent liopofuscin fractions derived from brain were identified by Label Free Quantification Mass Spectrometry (LFQ-MS). 
              </div>
              <div className="word-description">
                <ul>
                  <li>
                  Below is a Venn diagram tool to compare proteins identified in lipofuscin (n = 688) with your proteomic data or protein of interest.
                  </li>
                  <li>
                  Protein names are listed in UniProt protein ID nomenclature.                                
                  </li>
                </ul>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{marginLeft: "-5rem"}} id="venn"></div>
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

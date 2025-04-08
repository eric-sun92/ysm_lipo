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
      const set1Items = inputSet1.map(item => item.trim()).filter(item => item !== "");
      const set2Items = inputSet2.map(item => item.trim()).filter(item => item !== "");
      
      const sets = [];
      if (set1Items.length > 0) {
        const { cappedSize1, cappedSize2 } = capRatioDifference(set1Items.length, set2Items.length);
        sets.push({ sets: ["User Input"], size: cappedSize1, elements: set1Items });
      }
      if (set2Items.length > 0) {
        const { cappedSize1, cappedSize2 } = capRatioDifference(set1Items.length, set2Items.length);
        sets.push({ sets: ["Lipofuscin"], size: cappedSize2, elements: set2Items });
      }
      if (set1Items.length > 0 && set2Items.length > 0) {
        sets.push({
          sets: ["User Input", "Lipofuscin"],
          size: calculateIntersection(set1Items, set2Items).length,
          elements: calculateIntersection(set1Items, set2Items),
        });
      }
      return sets;
    },
    [inputSet1, inputSet2]
  );

  useEffect(() => {
    const chart = venn.VennDiagram();
    const div = d3.select("#venn");
    div.datum(baseSets).call(chart);

    d3.selectAll("#venn .venn-circle path")
    .filter((d) => d.sets && d.sets.length === 1 && d.sets[0] === "User Input")
      .style("fill", "white")
      .style("stroke", "black");

    d3.selectAll("#venn text").style("fill", function (d) {
      if (d.sets && d.sets.length === 1) {
        if (d.sets[0] === "User Input") {
          return "black";
        } else if (d.sets[0] === "Lipofuscin") {
          return "#FF00FF";
        }
      }
      return "black";
    });

    d3.selectAll("#venn .venn-circle path")
    .filter((d) => d.sets && d.sets.length === 1 && d.sets[0] === "Lipofuscin")
    .style("fill", "white")
    .style("stroke", "#FF00FF");

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
        let size = 0;
        if (d.sets.includes("User Input") && d.sets.length === 1) {
          size = inputSet1.length;
        } else if (d.sets.includes("Lipofuscin") && d.sets.length === 1) {
          size = inputSet2.length;
        } else if (d.sets.includes("User Input") && d.sets.includes("Lipofuscin")) {
          size = calculateIntersection(inputSet1, inputSet2).length;
        }
    
        tooltip.transition().style("opacity", 0.9);
        tooltip.html(`${size}`); 

        if (!d.sets || selectedArea === d.sets.join(",")) return;

        const selection = d3.select(this).transition("tooltip");
        selection
          .select("path")
          .style("fill-opacity", 0); 
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 40 + "px");
      })
      .on("mouseout", function (event, d) {
        tooltip.transition().style("opacity", 0);

        if (!d.sets || selectedArea === d.sets.join(",")) return;

        const selection = d3.select(this).transition("tooltip");
        selection
          .select("path")
          .style("fill-opacity", 0); 
      })
      .on("click", function (event, d) {
        if (d.elements) {
          const elementDetails = d.elements.map((elem) => {
            if (inputSet1.includes(elem) && inputSet2.includes(elem)) {
              return { text: `${elem} (both sets)`, type: 'both' };
            } else if (inputSet1.includes(elem)) {
              return { text: `${elem} (User Input)`, type: 'set1' };
            } else if (inputSet2.includes(elem)) {
              return { text: `${elem} (Lipofuscin)`, type: 'set2' };
            }
            return { text: elem, type: 'none' };
          })
          .sort((a, b) => {
            const typeOrder = { 'both': 0, 'set1': 1, 'set2': 2, 'none': 3 };
            return typeOrder[a.type] - typeOrder[b.type];
          })
          .map(item => item.text);

          setSelectedElements(elementDetails);
          setSelectedTextArea(elementDetails.join("\n"));

          setSelectedArea(d.sets.join(","));
          setSelectedSetName(d.sets.length === 1 ? d.sets[0] : "Intersection");

          d3.select(this).select("path").style("fill-opacity", 0);
        }
      });

    return () => {
      tooltip.remove();
    };
  }, [baseSets, inputSet1, inputSet2, selectedArea]);

  useEffect(() => {
    d3.selectAll("#venn .venn-circle path").style("fill-opacity", 0);
    
    d3.selectAll("#venn text").style("font-weight", function(d) {
      if (!d.sets) return "normal";
      const setKey = d.sets.join(",");
      return setKey === selectedArea ? "bold" : "normal";
    });
  }, [selectedArea]);

  useEffect(() => {
    if (!selectedArea) return;

    const set1Items = inputSet1.map(item => item.trim()).filter(item => item !== "");
    const set2Items = inputSet2.map(item => item.trim()).filter(item => item !== "");
    
    let updatedElements = [];
    if (selectedArea === "User Input") {
      updatedElements = set1Items;
    } else if (selectedArea === "Lipofuscin") {
      updatedElements = set2Items;
    } else if (selectedArea === "User Input,Lipofuscin") {
      updatedElements = calculateIntersection(set1Items, set2Items);
    }

    const elementDetails = updatedElements.map((elem) => {
      if (set1Items.includes(elem) && set2Items.includes(elem)) {
        return { text: `${elem} (both sets)`, type: 'both' };
      } else if (set1Items.includes(elem)) {
        return { text: `${elem} (User Input)`, type: 'set1' };
      } else if (set2Items.includes(elem)) {
        return { text: `${elem} (Lipofuscin)`, type: 'set2' };
      }
      return { text: elem, type: 'none' };
    })
    .sort((a, b) => {
      const typeOrder = { 'both': 0, 'set1': 1, 'set2': 2, 'none': 3 };
      return typeOrder[a.type] - typeOrder[b.type];
    })
    .map(item => item.text);

    setSelectedElements(elementDetails);
    setSelectedTextArea(elementDetails.join("\n"));
  }, [inputSet1, inputSet2, selectedArea]);

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
    if (!file) return; // Return early if no file is selected
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      const columnData = [];
      
      for (let C = range.s.c; C <= range.e.c; C++) {
        const column = [];
        for (let R = range.s.r; R <= range.e.r; R++) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = worksheet[cellAddress];
          if (cell && cell.v !== undefined && cell.v !== null && cell.v.toString().trim() !== '') {
            column.push(cell.v.toString().trim());
          }
        }
        if (column.length > 0) {
          columnData.push(...column);
        }
      }

      const uniqueItems = [...new Set(columnData.filter(item => item !== ''))];
      if(setNumber == 1) {
        setInputSet1(uniqueItems);
      } else {
        setInputSet2(uniqueItems);
      }
      
      // Reset the file input value after successful upload
      event.target.value = '';
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
              height: "52rem",
            }}
          >
            <div>
              <h3 style={{ marginTop: "10px" }}>User Input</h3>
              <textarea
                value={inputSet1.join("\n")}
                onChange={(e) => {
                  const lines = e.target.value.split("\n");
                  const setItems = lines.map(item => item.trim()).filter(item => item !== "");
                  setInputSet1(setItems.length > 0 ? lines : []);
                }}
                className="input-textarea"
                placeholder="...Enter UniProt ID"
              />
              <h4 style={{marginBottom: "10px", marginTop: "0"}}>
                Upload User Input
              </h4>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => handleFileUpload(e, 1)}
              />
            </div>
            <div>
              <h3 style={{ marginTop: "40px" }}>Lipofuscin</h3>
              <textarea
                value={inputSet2.join("\n")}
                onChange={(e) => {
                  const lines = e.target.value.split("\n");
                  const setItems = lines.map(item => item.trim()).filter(item => item !== "");
                  setInputSet2(setItems.length > 0 ? lines : []);
                }}
                className="input-textarea"
              />
              <h4 style={{marginBottom: "10px", marginTop: "0"}}>
                Upload Lipofuscin
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

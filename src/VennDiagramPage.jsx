import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import "./Heatmap.css";
import "./CoronalHeatmap.css";
// import html2canvas from 'html2canvas';
import {
  extractSets,
  generateCombinations,
  VennDiagram,
  asSets,
} from "@upsetjs/react";


const VennDiagramPage = () => {
  const [inputSet1, setInputSet1] = useState(["abc"]);
  const [inputSet2, setInputSet2] = useState(["test", "abc", "lol"]);

  const baseSets = [
    { name: "Set 1", elems: inputSet1 },
    { name: "Set 2", elems: inputSet2 },
  ];

  
  const [selection, setSelection] = useState(null);
  const [value, setValue] = useState(3);

  const changeValue = useCallback((e) => {
    setValue(e.target.valueAsNumber);
  }, []);

  const select = useCallback((e) => {
    setSelection(
      Array.from(
        e.target.closest("div")?.querySelectorAll("input:checked") ?? []
      ).map((d) => d.valueAsNumber)
    );
  }, []);

  const sets = useMemo(() => asSets(baseSets).slice(0, value), [value]);

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

  // const downloadImage = async () => {
  //   const dataVizDiv = document.getElementById('my_dataviz');
  //   // const canvas = await html2canvas(dataVizDiv);
  //   // const image = canvas.toDataURL('image/png', 1.0);

  //   // Create a link to trigger the download
  //   const link = document.createElement('a');
  //   link.href = image;
  //   link.download = `${selectedRange}-Lipofuscin-Load.png`; // Name of the file to be downloaded
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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
      <div class="wrapper">
        <h1 style={{ fontFamily: "ITC", margin: "3rem" }}>Venn Diagram Page</h1>
        <div class="container">
          <div
            class="filters"
            ref={divRef} // Assign the ref to your div
            style={{
              position: isFixed ? "absolute" : "absolute",
              top: isFixed ? "28rem" : "100px", // Adjust according to where you want your div to start
              backgroundColor: "#ddd", // Just for visibility
              height: "69rem",
            }}
          >
            <h3>Set 1</h3>
            <input
              value={inputSet1}
              onChange={(e) => setInputSet1(e.target.value)}
            />

            <h3 style={{ marginTop: "50px" }}>Set 2</h3>
            <input
              value={inputSet2}
              onChange={(e) => setInputSet2(e.target.value)}
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

            {/* <p style={{marginTop: "50px", cursor: "pointer", textDecoration: "underline"}} onClick={downloadImage}>Download Heatmap Image</p> */}
          </div>
          <div className="temp">
            <div className="text-2">
              <div class="body-header">
                <img class="body-icon" src="/coronal.png" />
                <div class="body-title">Heatmap by Coronal Section</div>
              </div>
              <div class="moto">
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
              <div class="word-description">
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
              <div>
                <VennDiagram
                  sets={sets}
                  width={780}
                  height={500}
                  selection={selection}
                  onHover={setSelection}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VennDiagramPage;

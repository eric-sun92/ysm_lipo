import React, { useEffect, useState, useRef } from 'react';
import "./Heatmap.css"
import AverageData from "./average.json"
import Select from 'react-select';
import "./CoronalHeatmap.css"
// import html2canvas from 'html2canvas';

const Coronal = () => {
  const [isFixed, setIsFixed] = useState(false);

  const divRef = useRef(null);

  const rowColorMap = {}
  AverageData.forEach(item => {
    rowColorMap[item["Region Name"]] = item["Primary Annotation"]
  })

  const selectRef = React.useRef(null);
  const initialGroups = ["PPT1-2 Average Load", "PPT1-4 Average Load", "PPT1-7 Average Load", "WT-2 Average Load", "WT-12 Average Load", "WT-18 Average Load", "WT-24 Average Load"];

  const [selectedGroups, setSelectedGroups] = useState(initialGroups);
  const [selectedRange, setSelectedRange] = useState('All');

  function getColorForIndex(index) {
    const colors = ['#4F1E5A', '#4A4E8C', '#257F93', '#00AB8B', '#76D160', '#FCE742', '#FF8926'];
    return colors[index];
  }


  const handleGroupChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setSelectedGroups(selectedOptions);
  };

  const handleRangeChange = selectedOption => {
    setSelectedRange(selectedOption.value);
  };

  const dropdownContainerStyle = {
    marginBottom: '20px',
  };
  const rowRanges = {
    "25 - OLF/CTX": {start: 0, end: 101},
    '36 - STR/PAL/OLF/CTX': { start: 102, end: 111 },
    '69 - CTX/HPF/TH/HY/CP': { start: 112, end: 124 },
    '85 - MB/TH/HPF/CTX': { start: 125, end: 136 },
    '98 - MB/P/CTX': { start: 137, end: 145 },
    '111 - CB/MY': { start: 146, end: 182 },
  };

  const options = Object.keys(rowRanges).map((range, index) => ({
    value: range,
    label: range,
  }));

  const colorArray = ["black", "#009354", "#8CCCB5", "#63C34F", "#6FC5F5", "#6189cf", '#FF859A', '#FF3F3D', '#FF82FB', "#FFBC91", '#FFA8D3', "#EDE55C", "#C7C6CB", "#9D9D9F"]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: colorArray[state.data.index],
    }),
    singleValue: (provided, state) => {
      const color = state.data.index !== undefined ? colorArray[state.data.index] : 'defaultColorHere';
      return { ...provided, color };
    },
  };

  const selectedOption = options.find(option => option.value === selectedRange) || null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    "25 - OLF/CTX": "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960424&resolution=13.96&x=5640&y=3983.9998372395835&zoom=-3&structure=342",
    "36 - STR/PAL/OLF/CTX": "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960380&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=852",
    "69 - CTX/HPF/TH/HY/CP": "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960248&resolution=13.96&x=5640&y=3984.000161488851&zoom=-3&structure=342",
    "85 - MB/TH/HPF/CTX": "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960057&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=342",
    "98 - MB/P/CTX": "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100966096&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=342",
    "111 - CB/MY": "http://atlas.brain-map.org/atlas?atlas=1&plate=100960440#atlas=1&plate=100960181&resolution=13.96&x=5640&y=3984.000002543132&zoom=-3&structure=852"
};

  const [selectedRanges, setSelectedRanges] = useState(["25 - OLF/CTX", "36 - STR/PAL/OLF/CTX", "69 - CTX/HPF/TH/HY/CP", "85 - MB/TH/HPF/CTX", "98 - MB/P/CTX", "111 - CB/MY"]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedRanges(prevSelectedRanges => {
        let updatedRanges;
        if (checked) {
            updatedRanges = [...prevSelectedRanges, value];
        } else {
            updatedRanges = prevSelectedRanges.filter(range => range !== value);
        }
        return updatedRanges.sort((a, b) => options.findIndex(option => option.value === a) - options.findIndex(option => option.value === b));
    });
};

  console.log(selectedRanges)
  console.log(selectedGroups)

  return (
    <>
    <div class="wrapper">
    <h1 style={{fontFamily: "ITC", margin: "3rem"}}>Lipofuscin Load by Anatomical Region</h1>
    <div class="container">
      <div class="filters" ref={divRef} // Assign the ref to your div
      style={{
        position: isFixed ? 'absolute' : 'absolute',
        top: isFixed ? '28rem' : '100px', // Adjust according to where you want your div to start
        backgroundColor: '#ddd', // Just for visibility
        height: "69rem",
      }}
      >
        <h3>Genotype & Age (Months)</h3>
        <div style={dropdownContainerStyle}>
          <select multiple={true} 
              value={selectedGroups} 
              onChange={handleGroupChange} 
              ref={selectRef} 
              style={{ marginRight: "1rem", 
              height: "100%", 
              width: "100%", 
              minHeight: "143px",
              backgroundColor: 'white' }}>
            {initialGroups.map((group, index) => (
              <option key={group} value={group} style={{ fontSize: "1rem", color: getColorForIndex(index) }}>{group}</option>
            ))}
          </select>
        </div>

        <h3 style={{marginTop: "50px"}}>Coronal Plane</h3>
        <div className="checkboxcontainer">
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedRanges.includes(option.value)}
                        onChange={handleCheckboxChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>


        <h4 style={{marginTop: "50px"}}>Region Image</h4>
        <img
            src={`Saggital Whole Brain_Larger Numbers.png`}
            style={{ width: '100%', marginBottom: "2rem"}}
          />

        <h4 >
          View section in the Allen Brain Atlas
        </h4>
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
          <div class="moto">Below is a coronal atlas of lipofuscin load in wild type (WT) and PPT1 knockout (KO) mice with age. To explore lipofuscin deposition in coronal sections, select the desired genotypes and time points from the top menu on the left. To view lipofuscin load in a particular set of anatomical regions, select section(s) of interest from the bottom menu. To explore the fine anatomical areas represented in coronal sections, navigate to the Allen Brain Atlas using the links below the sagittal atlas legend.</div>
          <div class="word-description">
            <ul>
              <li>Lipofuscin load is graphed on a scale of 0-0.2 for maximum contrast across all conditions.</li>
              <li>Data were obtained for the right sagittal hemisphere and reflected across the midline for visualization purposes.</li>
              <li>Areas in grey indicate that load data was not obtained for that region, due to superimposition of sagittal section data on a coronal map.</li>
            </ul>
          </div>
        </div>
        <div id="my_dataviz">
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{alignSelf: "start", fontFamily: "san-seriff", fontSize: "1.9rem", fontWeight: "500", marginBottom: "3rem", marginLeft: "1rem"}}>Lipofuscin Load in Coronal Mouse Brain Atlas</div>
            <img src="scale_lipo.png" style={{width: "20rem", height: "3rem", marginLeft: "3rem"}}></img>
          </div>
          {/*  */}
          <div className="gallery">
            {selectedGroups.map(group => {
              return (
                <div key={group} className="group">
                  <div className="group-images">
                    {selectedRanges.map(range => (
                      <div key={range} className="image-container">
                        <img 
                          src={`Separated Series/${group.split(' ')[0]}/${range.split(' ')[0]}.png`} 
                          alt={`${range}`} 
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Coronal;
import React from 'react'
import "./About.css"

const About = () => {
  const authors = [
    { name: 'Sofia Massaro Tieze', affiliations: [1, 2] },
    { name: 'Alexander Esqueda', affiliations: [1, 2] },
    { name: 'Matija Lagator', affiliations: [3] },
    { name: 'Rachel McAllister', affiliations: [4] },
    { name: 'Jean Kanyo', affiliations: [5, 6] },
    { name: 'Florine Collin', affiliations: [5, 6] },
    { name: 'Eric Sun', affiliations: [7] },
    { name: 'Nicholas Lockyer', affiliations: [3] },
    { name: 'Kallol Gupta', affiliations: [4] },
    { name: 'TuKiet T. Lam', affiliations: [5, 6] },
    { name: 'Sreeganga S. Chandra', affiliations: [1] }
  ];

  const affiliations = [
    { id: 1, text: 'Departments of Neurology & Neuroscience, Yale University, New Haven, CT, USA' },
    { id: 2, text: 'Interdepartmental Neuroscience Program, Yale University, New Haven, CT, USA' },
    { id: 3, text: 'Department of Chemistry, University of Manchester, Manchester, UK' },
    { id: 4, text: 'Department of Cell Biology, Yale University, New Haven, CT, USA' },
    { id: 5, text: 'Departments of Molecular Biophysics and Biochemistry, Yale University, New Haven, CT, USA' },
    { id: 6, text: 'Keck Mass Spectrometry & Proteomics Resource, W.M. Keck Biotechnology Resource Laboratory, New Haven, CT, USA' },
    { id: 7, text: 'Yale College, Yale University, New Haven, CT, USA' }
  ];

  return (
    <div>
      <header><h1>Contact & References</h1></header>
      
      <div>
        <div style={{fontSize: "1.4rem", margin: "3rem 5rem"}}>
          <span style={{fontFamily: "Arial", fontSize: "1.6rem", fontWeight: "bold"}}>Authors: </span> 
          Sofia Massaro Tieze<sup>1,2</sup>, Alexander Esqueda<sup>1,2</sup>, Matija Lagator<sup>3</sup>,
          Rachel McAllister<sup>4</sup>, Jean Kanyo<sup>5,6</sup>, Florine Collin<sup>5,6</sup>, Eric Sun<sup>7</sup>,
          Nicholas Lockyer<sup>3</sup>, Kallol Gupta<sup>4</sup>, TuKiet T. Lam<sup>5,6</sup>, Sreeganga S. Chandra<sup>1</sup>

        {/* <ul className="authors">
          <li>Sofia Massaro Tieze<sup>1,2</sup></li>
          <li>Alexander Esqueda<sup>1,2</sup></li>
          <li>Matija Lagator<sup>3</sup></li>
          <li>Rachel McAllister<sup>4</sup></li>
          <li>Jean Kanyo<sup>5,6</sup></li>
          <li>Florine Collin<sup>5,6</sup></li>
          <li>Eric Sun<sup>7</sup></li>
          <li>Nicholas Lockyer<sup>3</sup></li>
          <li>Kallol Gupta<sup>4</sup></li>
          <li>TuKiet T. Lam<sup>5,6</sup></li>
          <li>Sreeganga S. Chandra<sup>1</sup></li>
        </ul> */}

        <div className="corresponding">
          <p style={{fontWeight: "bold"}}>Corresponding Author</p>
          <p>Sreeganga S. Chandra, PhD</p>
          <p>sreeganga.chandra@yale.edu</p>
          <p>Associate Professor of Neurology & Neuroscience</p>
          <p>Yale University</p>
        </div>
        </div>


        <div><span style={{fontSize: "1.6rem", fontWeight: "800", margin: "3rem 5rem"}}>Affiliations:</span>
        <ul className="affiliations">
          <li><sup>1</sup>Departments of Neurology & Neuroscience, Yale University, New Haven, CT, USA</li>
          <li><sup>2</sup>Interdepartmental Neuroscience Program, Yale University, New Haven, CT, USA</li>
          <li><sup>3</sup>Department of Chemistry, University of Manchester, Manchester, UK</li>
          <li><sup>4</sup>Department of Cell Biology, Yale University, New Haven, CT, USA</li>
          <li><sup>5</sup>Departments of Molecular Biophysics and Biochemistry, Yale University, New Haven, CT, USA</li>
          <li><sup>6</sup>Keck Mass Spectrometry & Proteomics Resource, W.M. Keck Biotechnology Resource Laboratory, New Haven, CT, USA</li>
          <li><sup>7</sup>Yale College, Yale University, New Haven, CT, USA</li>
        </ul>
        </div>
        <div style={{margin: "3rem 5rem"}}>

        <div style={{fontSize: "1.1rem"}}><span style={{fontSize: "1.6rem", fontWeight: "800"}}>References:</span>
          <h3>Allen Brain Atlas</h3>
          <p>Sagittal mouse brain image credit: {" "}
            <a style={{textDecoration: "none"}} href="http://atlas.brain-map.org/atlas?atlas=2#atlas=2&plate=100883867&structure=549&x=7799.538010817308&y=4023.9864642803486&zoom=-3&resolution=16.11&z=5">
              Allen Institute for Brain Science. 
            </a>
          </p>
          <p>Allen Institute for Brain Science (2004). Allen Mouse Brain Atlas - Adult Mouse. Available from {" "}
            <a style={{textDecoration: "none"}} href="http://mouse.brain-map.org">mouse.brain-map.org</a>.
          </p>
          <p>Allen Institute for Brain Science (2011). Allen Reference Atlas – Mouse Brain Reference Atlas. Available from {" "}
            <a style={{textDecoration: "none"}} href="http://atlas.brain-map.org">atlas.brain-map.org</a>.
          </p>
        
          <h3>QUINT Histology Pipeline</h3>
          <p>H. M. Geertsma et al., A topographical atlas of α-synuclein dosage and cell type-specific expression in adult mouse brain and peripheral organs. NPJ Parkinsons Dis 10, 65 (2024).</p>
          <p>N. E. Groeneboom, S. C. Yates, M. A. Puchades, J. G. Bjaalie, Nutil: A Pre- and Post-processing Toolbox for Histological Rodent Brain Section Images. Front Neuroinform 14, 37 (2020).</p>
          <p>M. A. Puchades, G. Csucs, D. Ledergerber, T. B. Leergaard, J. G. Bjaalie, Spatial registration of serial microscopic brain images to three-dimensional reference atlases with the QuickNII tool. PLoS One 14, e0216796 (2019).</p>
          <p>Q. Wang et al., The Allen Mouse Brain Common Coordinate Framework: A 3D Reference Atlas. Cell 181, 936-953.e920 (2020).</p>
        </div>
        
      </div>

      </div>
    </div>
  )
}

export default About

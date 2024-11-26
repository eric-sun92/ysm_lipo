import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* <img src="/banner.png"></img> */}
      <header>
        <h1>Molecular Elucidation of Brain Lipofuscin in Aging and Batten Disease</h1>
      </header>
      <div className="main-header">
        <div className="title">Lipofuscin: a hallmark of aging and lysosomal storage disorders</div>
        <p>
          Lipofuscin is an autofluorescent storage material that accumulates in the brain with age. Lipofuscin deposition is also observed in numerous disease states but is most profound in Batten Disease, a group of fatal neurodegenerative disorders that primarily affect children. An improved molecular and neuroanatomical understanding of lipofuscin accumulation is needed to assess the relationship of this pathological hallmark to aging and neurodegenerative processes.
        </p>
      </div>
      <div className="main-header">
        <div className="title">Generation of a fine neuroanatomical atlas of lipofuscin in aging and disease</div>
        <div>
        <p>
          To unveil regional vulnerabilities to lipofuscin accumulation, we generated a fine neuroanatomical atlas of lipofuscin in the aging and Batten Disease brain. We utilized wild type (WT) mice as a model for typical aging, examining young mature mice expected to be lipofuscin-negative (2-months-old), healthy adult mice (12-months-old), and aged mice (18-months-old and 24-months-old). We also examined a mouse model of infantile Batten disease (CLN1) induced by loss-of-function of the depalmitoylating enzyme palmitoyl protein thioesterase 1 (PPT1). PPT1 knockout (KO) mice exhibit robust lipofuscin accumulation and recapitulate the dramatically shortened lifespan of human patients. We examined mature PPT1 KO mice prior to the onset of severe neurodegeneration (2-months-old), mice with moderate-to-severe pathology (4-months-old), and mice nearing a humane endpoint due to disease phenotypes (7-months-old). Our atlas quantifies and visualizes the progression of lipofuscin deposition across conditions in hundreds of fine brain regions. These data provide a critical resource for aging and Batten Disease studies. Further, these data urge caution in the interpretation of fluorescence imaging of aged murine brain tissue, highlighting the expected distribution of potentially confounding autofluorescent signal from lipofuscin.
        </p>
        </div>

        {/* <h2 class="title" style={{marginTop: "4rem"}}>Initial Results</h2> */}
        <div className="container">
          <div className="flex-item">
            <img src="/lipowithage.png" alt="Descriptive Alt Text" class="flex-image" />
            <div className="caption">
              <p>Lipofuscin accumulates linearly with age in the brains of wild type (WT) mice. In mice modeling infantile batten disease (CLN1), caused by loss-of-function of the depalmitoylating enzyme palmitoyl protein thioesterase 1 (PPT1), lipofuscin accumulation is severely accelerated. Lines represent simple linear regression of whole brain lipofuscin load (sum of gross custom QUINT anatomical region loads) with age and CLN1 progression (WT: y = 0.01025*X – 0.01841; R2 = 0.9606; PPT1 KO: y = 0.1129*X + 0.04549; R2 = 0.9457).</p>
            </div>
          </div>
          <div className="flex-item">
            <img src="/wholebrainlipo.png" alt="Descriptive Alt Text" class="flex-image" />
            <div className="caption">
              <p>A representative of the whole brain sagittal sections illustrating end-stage autofluorescent storage accumulation in PPT1 KO 7-month and WT 24-month animals (scale bars = 1.0 mm).</p>
            </div>
          </div>
        </div>

        
        <div className="description"></div>

        <h2 className="title" style={{marginTop: "4rem", marginBottom: "-3rem", marginLeft: "2rem"}}>Explore the Lipofuscin Brain Atlas</h2>
        <div className="main-body i">
          <div className="text">
            <div className="body-header">
              <img className="body-icon" src="/brain-icon.png" />
              <div className="body-title">Fine Brain Region Atlas</div>
            </div>
            <div class="moto">Heat map of lipofuscin load across fine neuroanatomical regions in wild type (WT) and PPT1 knockout (KO) mice with age.</div>
            {/* <div class="word-description">
              <ul>
                <li>Displayed values are the average of n = 4 sex-matched biological replicates per genotype per timepoint (with n = 4 averaged alternate sections/biological replicate) and standard deviation.</li>
                <li>Lipofuscin load is graphed on a scale of 0-0.2 for maximum contrast across all conditions (loads above 0.2 are in dark purple).</li>
                <li>Atlas data are searchable by gross region in the Allen Mouse Brain Atlas and by the age and genotype of the animals using the menus on the left.</li>
              </ul>
            </div> */}
            <Link to="/heatmap" style={{ textDecoration: "none", color: "inherit" }}>
              <button className="learn-more">
                <span className="button-text">View Atlas Heatmap</span>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrowm"></span>
                </span>
              </button>
            </Link>
          </div>
          <div className="text">
            <div className="body-header">
              <img className="body-icon" src="/coronal.png" />
              <div className="body-title">Heatmap by Coronal Section</div>
            </div>
            <div className="moto">Coronal heat maps of lipofuscin load in medial brain regions in WT and PPT1 KO mice.</div>
            {/* <div class="word-description">
              <ul>
                <li>Lipofuscin load is graphed on a scale of 0-0.2 for maximum contrast across all conditions.</li>
                <li>Data were obtained for the right sagittal hemisphere and reflected across the midline for visualization purposes.</li>
                <li>Areas in grey indicate that load data was not obtained for that region, due to superimposition of sagittal section data on a coronal map.</li>
                <li>Data can be filtered by genotype and age and by coronal section using the menus on the left.</li>
              </ul>
            </div>            */}
             <Link to="/coronal" style={{textDecoration: "none", color: "inherit"}}>
              <button className="learn-more">
                <span className="button-text">View Coronal Heatmap</span>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrowm"></span>
                </span>
              </button>
            </Link>
          </div>
          {/* <div className="text">
            <div className="body-header">
              <img className="body-icon" src="/Venn Logo.png" />
              <div className="body-title">Lipofuscin Proteome</div>
            </div>
            <div class="moto">Proteins present in autofluorescent liopofuscin fractions derived from brain were identified by Label Free Quantification Mass Spectrometry (LFQ-MS).</div>
            
            <Link to="/heatmap" style={{ textDecoration: "none", color: "inherit" }}>
              <button className="learn-more">
                <span className="button-text">View Lipofuscin Proteome</span>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrowm"></span>
                </span>
              </button>
            </Link>
          </div> */}
        </div>
        {/* <div class="left-description"></div>
        <div class="main-body ii">
          <div class="text">
            <div class="body-header">
              <img class="body-icon" src="/coronal.png" />
              <div class="body-title">Coronal Heatmap</div>
            </div>
            <div class="moto">Coronal heat maps of lipofuscin load in medial QUINT reference regions (n = 4 biological replicates per condition; average of n=4 alternate sections per replicate).</div>
            <div class="word-description">
              <ul>
                <li>Lipofuscin load is graphed on a scale of 0-0.2 for maximum contrast across all conditions.</li>
                <li>Data were obtained for the right sagittal hemisphere and reflected across the midline for visualization purposes.</li>
                <li>Areas in grey indicate that load data was not obtained for that region, due to superimposition of sagittal section data on a coronal map.</li>
                <li>Data can be filtered by genotype and age and by coronal section using the menus on the left.</li>
              </ul>
            </div>           
             <a href="/coronal" style={{textDecoration: "none", color: "inherit"}}>
              <button class="learn-more">
                <span class="button-text">View Coronal Heatmap</span>
                <span class="circle" aria-hidden="true">
                  <span class="icon arrowm"></span>
                </span>
              </button>
            </a>
          </div>
        </div> */}


      </div>
    </div>
    
  );
};

export default HomePage;

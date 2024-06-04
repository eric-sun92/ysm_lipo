import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      {/* <img src="/banner.png"></img> */}
      <header>
        <h1>Molecular Elucidation of Brain Lipofuscin in Aging and Batten Disease</h1>
      </header>
      <div className="text-wrapper">
        <h2>What is lipofuscin?</h2>
        <p>
          Lipofuscin is an autofluorescent storage material that accumulates in the brain with age. Lipofuscin deposition is also observed in numerous disease states but is most profound in Batten Disease, a group of fatal neurodegenerative disorders that primarily affect children. An improved molecular and neuroanatomical understanding of lipofuscin accumulation is needed to assess the relationship of this pathological hallmark to aging and neurodegenerative processes.
        </p>
      </div>
      <div class="main-header">
        <div class="title">Why our Study?</div>
        <div><p>
          To unveil regional vulnerabilities to lipofuscin accumulation, we generated a fine neuroanatomical atlas of lipofuscin in the aging and Batten Disease brain. We utilized wild type (WT) mice as a model for typical aging, examining young mature mice expected to be lipofuscin-negative (2-months-old), healthy adult mice (12-months-old), and aged mice (18-months-old and 24-months-old). We also examined a mouse model of infantile Batten disease (CLN1) induced by loss-of-function of the depalmitoylating enzyme palmitoyl protein thioesterase 1 (PPT1). PPT1 knockout (KO) mice exhibit robust lipofuscin accumulation and recapitulate the dramatically shortened lifespan of human patients. We examined mature PPT1 KO mice prior to the onset of severe neurodegeneration (2-months-old), mice with moderate-to-severe pathology (4-months-old), and mice nearing a humane endpoint due to disease phenotypes (7-months-old). Our atlas quantifies and visualizes the progression of lipofuscin deposition across conditions in hundreds of fine brain regions. These data provide a critical resource for aging and Batten Disease studies. Further, these data urge caution in the interpretation of fluorescence imaging of aged murine brain tissue, highlighting the expected distribution of potentially confounding autofluorescent signal from lipofuscin.
        </p>
        <p>
          To identify lipofuscin constituents and dissect pathways related to lipofuscin biogenesis, we conducted a multimodal mass spectrometric analysis of purified and in situ lipofuscin. Here we present a searchable proteome of lipofuscin and downloadable lipidomics and Time-of-Flight Secondary Ion Mass Spectrometry (ToF-SIMS) datasets of lipofuscin to browse lipofuscin components.
        </p>
        <p>
          Overall, our study offers a rich compositional and neuroanatomical dissection of lipofuscin in aging and Batten Disease with diverse etiological implications.
        </p></div>

        {/* <h2 class="title" style={{marginTop: "4rem"}}>Initial Results</h2> */}
        <div class="container">
          <div class="flex-item">
            <img src="/lipowithage.png" alt="Descriptive Alt Text" class="flex-image" />
            <div class="caption">
              <p>Lipofuscin accumulates linearly with age in the brains of wild type (WT) mice. In mice modeling infantile batten disease (CLN1), caused by loss-of-function of the depalmitoylating enzyme palmitoyl protein thioesterase 1 (PPT1), lipofuscin accumulation is severely accelerated. Lines represent simple linear regression of whole brain lipofuscin load (sum of gross custom QUINT anatomical region loads) with age and CLN1 progression (WT: y = 0.01025*X – 0.01841; R2 = 0.9606; PPT1 KO: y = 0.1129*X + 0.04549; R2 = 0.9457).</p>
            </div>
          </div>
          <div class="flex-item">
            <img src="/wholebrainlipo.png" alt="Descriptive Alt Text" class="flex-image" />
            <div class="caption">
              <p>A representative of the whole brain sagittal sections illustrating end-stage autofluorescent storage accumulation in PPT1 KO 7-month and WT 24-month animals (scale bars = 1.0 mm).</p>
            </div>
          </div>
        </div>

        
        <div class="description"></div>

        <h2 class="title" style={{marginTop: "4rem", marginBottom: "-3rem", marginLeft: "2rem"}}>Explore the Lipofuscin Atlas</h2>
        <div class="main-body i">
          <div class="text">
            <div class="body-header">
              <img class="body-icon" src="/brain-icon.png" />
              <div class="body-title">Atlas Heatmap</div>
            </div>
            <div class="moto">Heat map of lipofuscin load across fine neuroanatomical regions in wild type (WT) and PPT1 knockout (KO) mice with age.</div>
            {/* <div class="word-description">
              <ul>
                <li>Displayed values are the average of n = 4 sex-matched biological replicates per genotype per timepoint (with n = 4 averaged alternate sections/biological replicate) and standard deviation.</li>
                <li>Lipofuscin load is graphed on a scale of 0-0.2 for maximum contrast across all conditions (loads above 0.2 are in dark purple).</li>
                <li>Atlas data are searchable by gross region in the Allen Mouse Brain Atlas and by the age and genotype of the animals using the menus on the left.</li>
              </ul>
            </div> */}
            <a href="/heatmap" style={{textDecoration: "none", color: "inherit"}}>
              <button class="learn-more">
                <span class="button-text">View Atlas Heatmap</span>
                <span class="circle" aria-hidden="true">
                  <span class="icon arrowm"></span>
                </span>
              </button>
            </a>
          </div>
          <div class="text">
            <div class="body-header">
              <img class="body-icon" src="/coronal.png" />
              <div class="body-title">Coronal Heatmap</div>
            </div>
            <div class="moto">Coronal heat maps of lipofuscin load in medial QUINT reference regions (n = 4 biological replicates per condition; average of n=4 alternate sections per replicate).</div>
            {/* <div class="word-description">
              <ul>
                <li>Lipofuscin load is graphed on a scale of 0-0.2 for maximum contrast across all conditions.</li>
                <li>Data were obtained for the right sagittal hemisphere and reflected across the midline for visualization purposes.</li>
                <li>Areas in grey indicate that load data was not obtained for that region, due to superimposition of sagittal section data on a coronal map.</li>
                <li>Data can be filtered by genotype and age and by coronal section using the menus on the left.</li>
              </ul>
            </div>            */}
             <a href="/coronal" style={{textDecoration: "none", color: "inherit"}}>
              <button class="learn-more">
                <span class="button-text">View Coronal Heatmap</span>
                <span class="circle" aria-hidden="true">
                  <span class="icon arrowm"></span>
                </span>
              </button>
            </a>
          </div>
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

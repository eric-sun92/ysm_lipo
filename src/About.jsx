import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div>
      <header>
        <div><span style={{fontSize: "1.7rem", fontWight: "900"}}>Authors</span>
        <ul className="authors">
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
        </ul>
        </div>
        <div><span style={{fontSize: "1.7rem", fontWight: "800"}}>Affiliations</span>
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
      </header>
    </div>
  )
}

export default About

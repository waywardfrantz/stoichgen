import React from 'react';
import './StoichiometryGenerator.css'; // We'll create this CSS file

function StoichiometryGenerator() {
  return (
    <div className="container">
      <div className="main-content">
        <h2 id="versionTitle">Stoich Generator Work in Progress!</h2>
        <div className="generate-reset-container">
          <button id="guidedGenerate">Generate Guided Problem</button>
          <button id="standardGenerate">Generate Standard</button>
        </div>
        <div className="full table">
          <table border="1" id="stoichTable">
            {/* We'll map your table rows here as React elements */}
            <tr id="headers">
              <td><button id="showAllButton" className="hidden">Show All</button></td>
              <th>Reagent 1</th>
              <th>+</th>
              <th>Reagent 2</th>
              <th>â†’</th>
              <th>Product 1</th>
              <th>+</th>
              <th>Product 2</th>
            </tr>
            <tr id="compound names">
              <td>Names</td>
              <td data-cell-type="names" data-reagent="1">
                <span data-element="cationName" className="hidden"></span>
                <span data-element="anionName" className="hidden"></span>
                <button>Show</button>
              </td>
              <td>+</td>
              <td data-cell-type="names" data-reagent="2">
                <span data-element="cationName" className="hidden"></span>
                <span data-element="anionName" className="hidden"></span>
                <button>Show</button>
              </td>
              <td>â†’</td>
              <td data-cell-type="names" data-product="1">
                <span data-element="cationName" className="hidden"></span>
                <span data-element="anionName" className="hidden"></span>
                <input type="text" id="product1NameInput" className="hidden input-check" />
                <button>Show</button>
              </td>
              <td>+</td>
              <td data-cell-type="names" data-product="2">
                <span data-element="cationName" className="hidden"></span>
                <span data-element="anionName" className="hidden"></span>
                <input type="text" id="product2NameInput" className="hidden input-check" />
                <button>Show</button>
              </td>
            </tr>
            {/* ... Continue mapping the rest of your table rows ... */}
            <tr id="molar masses">
              <td>Molar Masses</td>
              <td data-cell-type="molarMass" data-reagent="1">
                <span data-element="molarMass" className="hidden"> g/mol</span>
                <input type="text" id="reagent1MolarMassInput" className="hidden input-check" />
                <button>Show</button>
              </td>
              <td></td>
              <td data-cell-type="molarMass" data-reagent="2">
                <span data-element="molarMass" className="hidden"></span>
                <input type="text" id="reagent2MolarMassInput" className="hidden input-check" />
                <button>Show</button>
              </td>
              <td></td>
              <td data-cell-type="molarMass" data-product="1">
                <span data-element="molarMass" className="hidden"></span>
                <input type="text" id="product1MolarMassInput" className="hidden input-check" />
                <button>Show/Balance</button>
              </td>
              <td></td>
              <td data-cell-type="molarMass" data-product="2">
                <span data-element="molarMass" className="hidden"></span>
                <input type="text" id="product2MolarMassInput" className="hidden input-check" />
                <button>Show</button>
              </td>
            </tr>
            <tr className="stoich">
              <td>Stoich</td>
              <td data-cell-type="stoich" data-reagent="1">
                <label htmlFor="reagent1Limiting">
                  <input type="checkbox" id="reagent1Limiting" className="limiting-checkbox" />
                </label>
                <span data-element="actualMass" className="hidden">example stoich value 1</span>
                <button>Show</button>
              </td>
              <td></td>
              <td data-cell-type="stoich" data-reagent="2">
                <label htmlFor="reagent2Limiting">
                  <input type="checkbox" id="reagent2Limiting" className="limiting-checkbox" />
                </label>
                <span data-element="actualMass" className="hidden">example stoich value 2</span>
                <button>Show</button>
              </td>
              <td></td>
              <td data-cell-type="stoich" data-product="1">
                <span data-element="actualMass" className="hidden">example stoich value 3</span>
                <input type="text" id="product1StoichInput" className="hidden input-check" />
                <button>Show</button>
              </td>
              <td></td>
              <td data-cell-type="stoich" data-product="2">
                <span data-element="actualMass" className="hidden">example stoich value 4</span>
                <input type="text" id="product2StoichInput" className="hidden input-check" />
                <button>Show</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="checkbox-button-container">
          <form id="generator-form">
            <div className="row">
              <label htmlFor="useTransitionMetals">Use Transition Metals:</label>
              <input type="checkbox" id="useTransitionMetals" />
            </div>
            <div className="row">
              <label htmlFor="usePolyatomicIons">Use Polyatomic Ions:</label>
              <input type="checkbox" id="usePolyatomicIons" />
            </div>
          </form>

          <div className="row">
            <button id="instructionsButton">Instructions</button>
            <button id="periodicTableButton">Periodic Table</button>
            <button id="opportunitiesButton">Opportunities for Improvement</button>
          </div>
        </div>
        <div className="guided-practice hidden" id="guidedPracticeSection">
          <h3>Guided Practice</h3>
          <table id="guidedPracticeTable">
            <tr>
              <td><button data-guided-step="1">Step 1</button><span className="hidden" data-guided-text="1">Find product names </span></td>
            </tr>
            <tr>
              <td><button data-guided-step="2" className="hidden">Check Answers</button><span className="hidden" data-guided-text="2">Calculate Chemical Formulas</span></td>
            </tr>
            <tr>
              <td><button data-guided-step="3" className="hidden">Check Answers</button><span className="hidden" data-guided-text="3">Balance Equation</span></td>
            </tr>
            <tr>
              <td><button data-guided-step="4" className="hidden">Check Answers</button><span className="hidden" data-guided-text="4">Calculate Molar Masses (round to two decimal places)</span></td>
            </tr>
            <tr>
              <td><button data-guided-step="5" className="hidden">Check Answers</button><span className="hidden" data-guided-text="5">Determine Limiting Reactant</span></td>
            </tr>
            <tr>
              <td><button data-guided-step="6" className="hidden">Check Answers</button><span className="hidden" data-guided-text="6">Calculate amount of products produced</span></td>
            </tr>
            <tr>
              <td><button data-guided-step="7" className="hidden">Check Answers</button><span className="hidden" data-guided-text="7">Nice Job!</span></td>
            </tr>
          </table>
        </div>
        <div id="opportunitiesPopup" className="popup hidden">
          <div className="popup-content">
            <h3>Opportunities for Improvement</h3>
            <p id="opportunitiesText"></p>
            <table id="opportunitiesTable">
              <thead>
                <tr>
                  <th>User Input</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {/* Data will go here */}
              </tbody>
            </table>
          </div>
        </div>
        <div id="instructionsPopup" className="popup hidden">
          <div className="popup-content">
            <h3>Instructions</h3>
            <p>
              This tool generates a stoichiometry problem using ionic compounds, with transition metals and
              polyatomic ions as options. <br />
              If you are just getting started practicing stoichiometry, the "Guided Practice Problem" is what
              you will want. If you're a teacher generating problems for an assignment, or a student trying to
              challenge yourself the standard generator is probably what you want. <br />
              These instructions and an embedded periodic table from ptable.com can be toggled on or off by
              clicking their respective buttons.
            </p>
          </div>
        </div>
        <div id="periodicTableContainer" className="hidden">
          <iframe src="https://ptable.com/" style={{ width: '100%', height: '500px', border: 'none' }}></iframe>
          <p>Periodic table from ptable.com created by Michael Dayah, displayed by iframe.</p>
        </div>
      </div>
    </div>
  );
}

export default StoichiometryGenerator;
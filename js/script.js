
    // No good simple videos on each step, might have to make my own
    // code for adding video links
    // <a href="YOUR_VIDEO_URL_HERE" target="_blank" style="color: blue; font-size: smaller;">(help)</a> 
    // add problem types for just naming, finding formulas, balancing equations, finding molar mass
    // challenge problem: given amount of product, excess of one reagent, how much is present of the other?
    // would be a major rework, but instead of reagent1/2 and product 1/2, just make them data-type-compound 0-3, and change formatting in later parts to an array of 4 elements. Much easier to just for loop through everything then.]
    // could maybe also rework compound information to be one consistent array. 0 coefficient, 1 cation, 2 subscript, 3 anion, 4 subscript, 5 molar mass, 6 cation name, 7 anion name. 
    // would give a really nice "generate compound" function. 
    // Probably a nice "write to row"
	//testing

    start();
    document.addEventListener('DOMContentLoaded', function () {
        handleGuidedGenerate(); // Trigger handleGuidedGenerate() on page load
    });

    function start() {
        initializeVariables();
        setupButtons('#stoichTable button', revealCell);
        setupButtons('#guidedPracticeTable button', toggleGuidedStep);
        setupMainButtons();
        setupEnterProgression();
        useTransitionMetals.checked = false;
        usePolyatomicIons.checked = false;
    }

    function initializeVariables() {
        // Version number variable
        let versionNumber = "1.2.1";

        // Update the title and h2
        document.title = `Stoich Generator ${versionNumber}`;
        document.getElementById("versionTitle").textContent = `Stoich Generator ${versionNumber}`;

        let cations = [
            ['Ammonium', '(NH<sub>4</sub>)', 1, 18.04],
            ['Sodium', 'Na', 1, 22.99],
            ['Lithium', 'Li', 1, 6.94],
            ['Potassium', 'K', 1, 39.10],
            ['Rubidium', 'Rb', 1, 85.47],
            ['Beryllium', 'Be', 2, 9.01],
            ['Magnesium', 'Mg', 2, 24.305],
            ['Calcium', 'Ca', 2, 40.08],
            ['Strontium', 'Sr', 2, 87.62],
            ['Barium', 'Ba', 2, 137.33],
            ['Aluminum', 'Al', 3, 26.98],
            ['Scandium(III)', 'Sc', 3, 44.96],
            ['Titanium(IV)', 'Ti', 4, 47.87],
            ['Vanadium(V)', 'V', 5, 50.94],
            ['Chromium(III)', 'Cr', 3, 51.996],
            ['Chromium(VI)', 'Cr', 6, 51.996],
            ['Manganese(II)', 'Mn', 2, 54.94],
            ['Manganese(IV)', 'Mn', 4, 54.94],
            ['Iron(II)', 'Fe', 2, 55.845],
            ['Iron(III)', 'Fe', 3, 55.845],
            ['Iron(VI)', 'Fe', 6, 55.845],
            ['Cobalt(II)', 'Co', 2, 58.93],
            ['Cobalt(III)', 'Co', 3, 58.93],
            ['Nickel(II)', 'Ni', 2, 58.69],
            ['Copper(II)', 'Cu', 2, 63.546],
            ['Zinc(II)', 'Zn', 2, 65.38],
            ['Yttrium(III)', 'Y', 3, 88.906],
            ['Zirconium(IV)', 'Zr', 4, 91.224],
            ['Niobium(V)', 'Nb', 5, 92.906],
            ['Molybdenum(IV)', 'Mo', 4, 95.95],
            ['Molybdenum(VI)', 'Mo', 6, 95.95]
        ];
        let anions = [
            ['Acetate', '(C<sub>2</sub>H<sub>3</sub>O<sub>2</sub>)', 1, 59.04],
            ['Carbonate', '(CO<sub>3</sub>)', 2, 60.01],
            ['Hydrogen carbonate', '(HCO<sub>3</sub>)', 1, 61.02],
            ['Chromate', '(CrO<sub>4</sub>)', 2, 115.99],
            ['Dichromate', '(Cr<sub>2</sub>O<sub>7</sub>)', 2, 215.99],
            ['Cyanide', '(CN)', 1, 26.02],
            ['Hydroxide', '(OH)', 1, 17.01],
            ['Nitrate', '(NO<sub>3</sub>)', 1, 62.00],
            ['Nitrite', '(NO<sub>2</sub>)', 1, 46.00],
            ['Permanganate', '(MnO<sub>4</sub>)', 1, 118.94],
            ['Phosphate', '(PO<sub>4</sub>)', 3, 94.97],
            ['Hydrogen phosphate', '(HPO<sub>4</sub>)', 2, 95.98],
            ['Dihydrogen phosphate', '(H<sub>2</sub>PO<sub>4</sub>)', 1, 96.99],
            ['Sulfate', '(SO<sub>4</sub>)', 2, 96.06],
            ['Hydrogen sulfate', '(HSO<sub>4</sub>)', 1, 97.07],
            ['Sulfite', '(SO<sub>3</sub>)', 2, 80.06],
            ['Thiosulfate', '(S<sub>2</sub>O<sub>3</sub>)', 2, 112.14],
            ['Hypochlorite', '(ClO)', 1, 51.45],
            ['Chlorite', '(ClO<sub>2</sub>)', 1, 67.45],
            ['Chlorate', '(ClO<sub>3</sub>)', 1, 83.45],
            ['Perchlorate', '(ClO<sub>4</sub>)', 1, 99.45],
            ['Fluoride', 'F', 1, 18.998],
            ['Chloride', 'Cl', 1, 35.45],
            ['Bromide', 'Br', 1, 79.904],
            ['Sulfide', 'S', 2, 32.06],
            ['Oxide', 'O', 2, 16],
            ['Nitride', 'N', 3, 14.01],
            ['Phosphide', 'P', 3, 30.974]
        ];

        let cation1 = [];
        let cation2 = [];
        let anion1 = [];
        let anion2 = [];
        let reagentSubscripts = [];
        let productSubscripts = [];
        let coefficients = [1, 1, 1, 1];

        let cationRangeEnd = 9;
        let cationRangeBegin = 1;
        let anionRangeBegin = 21;
        let anionRangeEnd = anions.length;
        let molarMasses = [];

        // Get the buttons and guided practice section
        const standardGenerateButton = document.getElementById('standardGenerate');
        const guidedGenerateButton = document.getElementById('guidedGenerate');
        const guidedPracticeSection = document.getElementById('guidedPracticeSection');
        const mainContent = document.querySelector('.main-content');
        const useTransitionMetals = document.getElementById('useTransitionMetals');
        const usePolyatomicIons = document.getElementById('usePolyatomicIons');
        const generate = document.getElementById('generate');
        const resetButton = document.getElementById('resetButton');
        const instructionsButton = document.getElementById('instructionsButton');
        const periodicTableButton = document.getElementById('periodicTableButton');
        const opportunitiesButton = document.getElementById('opportunitiesButton');
        const opportunitiesPopup = document.getElementById('opportunitiesPopup');
        const opportunitiesText = document.getElementById('opportunitiesText');
        const opportunitiesTable = document.getElementById('opportunitiesTable');

        // Make variables available in the global scope if needed, otherwise remove.
        window.standardGenerateButton = standardGenerateButton;
        window.guidedGenerateButton = guidedGenerateButton;
        window.guidedPracticeSection = guidedPracticeSection;
        window.mainContent = mainContent;
        window.useTransitionMetals = useTransitionMetals;
        window.usePolyatomicIons = usePolyatomicIons;
        window.generate = generate;
        window.resetButton = resetButton;
        window.instructionsButton = instructionsButton;
        window.periodicTableButton = periodicTableButton;
        window.cations = cations;
        window.anions = anions;
        window.cation1 = cation1;
        window.cation2 = cation2;
        window.anion1 = anion1;
        window.anion2 = anion2;
        window.reagentSubscripts = reagentSubscripts;
        window.productSubscripts = productSubscripts;
        window.coefficients = coefficients;
        window.cationRangeEnd = cationRangeEnd;
        window.cationRangeBegin = cationRangeBegin;
        window.anionRangeBegin = anionRangeBegin;
        window.anionRangeEnd = anionRangeEnd;
        window.molarMasses = molarMasses;
        window.opportunitiesButton = opportunitiesButton;
        window.opportunitiesPopup = opportunitiesPopup;
        window.opportunitiesText = opportunitiesText;
        window.opportunitiesTable = opportunitiesTable;

    }

    function reset() {
        const table = document.getElementById('stoichTable');
        table.querySelectorAll('sub, span').forEach(element => element.classList.add('hidden'));
        table.querySelectorAll('button').forEach(button => button.classList.remove('hidden'));
        const inputElements = document.querySelectorAll('#stoichTable input[type="text"], #stoichTable input[type="checkbox"]');
        inputElements.forEach(input => {
            input.classList.add('hidden');
        });
        cation1 = [];
        cation2 = [];
        anion1 = [];
        anion2 = [];
        reagentSubscripts = [];
        productSubscripts = [];
        coefficients = [1, 1, 1, 1];
        molarMasses = [];
        stoichValues = []
        // Remove highlight from all cells
        const highlightedCells = document.querySelectorAll('.highlighted-cell');
        highlightedCells.forEach(cell => cell.classList.remove('highlighted-cell'));
        // Remove correct/incorrect highlights
        const correctCells = document.querySelectorAll('.correct-answer');
        correctCells.forEach(cell => cell.classList.remove('correct-answer'));
        const incorrectCells = document.querySelectorAll('.incorrect-answer');
        incorrectCells.forEach(cell => cell.classList.remove('incorrect-answer'));
        const guidedButtons = document.querySelectorAll('#guidedPracticeTable button[data-guided-step]');
        guidedButtons.forEach(button => {
            const stepNum = button.dataset.guidedStep;
            button.classList.remove('hidden');
            document.querySelector(`[data-guided-text="${stepNum}"]`).classList.add('hidden');
        });
        const limitingBorder = document.querySelectorAll('.limiting-reagent-border');
        limitingBorder.forEach(element => element.classList.remove('limiting-reagent-border'));
        // Clear opportunities table
        const opportunitiesTableBody = window.opportunitiesTable.querySelector('tbody');
        window.opportunitiesTable.removeChild(opportunitiesTableBody);
        const newOpportunitiesTableBody = document.createElement('tbody');
        window.opportunitiesTable.appendChild(newOpportunitiesTableBody);
        opportunitiesPopup.classList.add('hidden');
        const inputFields = document.querySelectorAll('.input-check, .limiting-checkbox'); // Select both input fields and checkboxes
        inputFields.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false; // Uncheck checkboxes
            } else {
                input.value = ''; // Clear input values
            }
            input.classList.remove('correct-answer', 'incorrect-answer'); // Remove border classes
        });
    }
    //guided generate functions
    function handleGuidedGenerate() {
        reset()
        guidedPracticeSection.classList.remove('hidden');
        mainContent.style.width = '80%';
        opportunitiesButton.classList.remove('hidden')
        generateProblem();
        hideAllShowButtons();
        highlightElements(stepHighlightConfig[1]); // Highlight elements for step 1
        showStepText(1);
        revealElements(stepRevealConfig[1]);
        document.getElementById('showAllButton').classList.add('hidden');

        // Hide all guided buttons except the first one.
        const guidedButtons = document.querySelectorAll('#guidedPracticeTable button[data-guided-step]');
        guidedButtons.forEach(btn => {
            const stepNum = parseInt(btn.dataset.guidedStep);
            if (stepNum !== 2) {
                btn.classList.add('hidden');
            }
        });

        document.getElementById('equationRow').classList.add('hidden');
        document.getElementById('unbalancedEquationRow').classList.remove('hidden');
        document.getElementById('formulaInputRow').classList.remove('hidden');
    }

    function toggleGuidedStep(event) {
        const button = event.target;
        const stepNumber = button.dataset.guidedStep;
        showStepText(stepNumber);
        console.log(stepNumber)
        checkAnswers(stepHighlightConfig[stepNumber - 1], stepNumber)
        const highlighted = document.querySelectorAll('.highlighted-cell');
        highlighted.forEach(element => element.classList.remove('highlighted-cell'));

        highlightElements(stepHighlightConfig[stepNumber]);
        revealElements(stepRevealConfig[stepNumber]);

        if (stepNumber === "4") {
            document.getElementById('equationRow').classList.remove('hidden');
            document.getElementById('unbalancedEquationRow').classList.add('hidden');
        }
        if (stepNumber === "6") {
            if (window.limitingReactant === 1) {
                document.querySelector('[data-cell-type="stoich"][data-reagent="1"]').classList.add('limiting-reagent-border');
            } else if (window.limitingReactant === 2) {
                document.querySelector('[data-cell-type="stoich"][data-reagent="2"]').classList.add('limiting-reagent-border');
            }
        }
    }

    function getCorrectAnswer(element) {
        const parentCell = element.parentElement;
        if (parentCell && parentCell.tagName === 'TD') {
            const spans = parentCell.querySelectorAll('span, sub'); // Select both spans and subs
            let correctAnswer = '';
            spans.forEach((span, index) => {
                correctAnswer += span.textContent.trim();
                if (index < spans.length - 1 && parentCell.dataset.cellType === 'names') { // Add space only for names
                    correctAnswer += ' ';
                }
            });
            return correctAnswer;
        }
        return "Correct answer not found";
    }

    function checkAnswers(selectors, stepNumber) { // Add stepNumber parameter
        if (stepNumber === "4") {
            checkCoefficients();
        } else if (stepNumber === '6') {
            checkLimitingReactants();
        } else {
            const elementsToCheck = document.querySelectorAll(selectors);
            elementsToCheck.forEach(element => {
                const inputField = element.querySelector('.input-check');
                if (inputField) {
                    const userAnswer = sanitizeInput(inputField.value.trim(), false); // Remove spaces during checking
                    const correctAnswer = getCorrectAnswer(inputField).replace(/\s+/g, ''); // Remove spaces from correct answer.
                    const parentCell = inputField.parentElement; // Get the parent <td>

                    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                        parentCell.classList.add('correct-answer');
                        parentCell.classList.remove('incorrect-answer');
                    } else {
                        parentCell.classList.add('incorrect-answer');
                        parentCell.classList.remove('correct-answer');
                        addToOpportunities(inputField.value.trim(), parentCell); // Pass original input to addToOpportunities
                    }
                }
            });
        }
    }

    function checkCoefficients() {
        const inputs = {
            reagent1: document.getElementById('reagent1UnbalancedEquationInput'),
            reagent2: document.getElementById('reagent2UnbalancedEquationInput'),
            product1: document.getElementById('product1UnbalancedEquationInput'),
            product2: document.getElementById('product2UnbalancedEquationInput')
        };

        const cells = {
            reagent1: document.querySelector('#equationRow [data-cell-type="formula"][data-reagent="1"]'),
            reagent2: document.querySelector('#equationRow [data-cell-type="formula"][data-reagent="2"]'),
            product1: document.querySelector('#equationRow [data-cell-type="formula"][data-product="1"]'),
            product2: document.querySelector('#equationRow [data-cell-type="formula"][data-product="2"]')
        };

        for (const key in inputs) {
            if (inputs[key] && cells[key]) {
                const userAnswer = sanitizeInput(inputs[key].value.trim(), false);
                const coefficientElement = cells[key].querySelector('[data-element="coefficient"]');

                if (coefficientElement) {
                    const correctAnswer = coefficientElement.textContent.trim();

                    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                        cells[key].classList.add('correct-answer');
                        cells[key].classList.remove('incorrect-answer');
                    } else {
                        cells[key].classList.add('incorrect-answer');
                        cells[key].classList.remove('correct-answer');

                        // Fetch and reconstruct the formula only for incorrect answers
                        const cationElement = cells[key].querySelector('[data-element="cation"]');
                        const cationSubscriptElement = cells[key].querySelector('[data-element="cationSubscript"]');
                        const anionElement = cells[key].querySelector('[data-element="anion"]');
                        const anionSubscriptElement = cells[key].querySelector('[data-element="anionSubscript"]');

                        if (cationElement && anionElement) {
                            let formula = cationElement.textContent.trim();
                            if (cationSubscriptElement && cationSubscriptElement.textContent.trim() !== '1' && cationSubscriptElement.textContent.trim() !== '') {
                                formula += cationSubscriptElement.textContent.trim();
                            }
                            formula += anionElement.textContent.trim();
                            if (anionSubscriptElement && anionSubscriptElement.textContent.trim() !== '1' && anionSubscriptElement.textContent.trim() !== '') {
                                formula += anionSubscriptElement.textContent.trim();
                            }
                            const userEntry = `${userAnswer} ${formula}`;
                            addToOpportunities(userEntry, cells[key]);
                        } else {
                            // Fallback if formula elements are not found
                            addToOpportunities(userAnswer, cells[key]);
                        }
                    }
                }
            }
        }
    }

    function checkLimitingReactants() {
        const reagent1Checkbox = document.getElementById('reagent1Limiting');
        const reagent2Checkbox = document.getElementById('reagent2Limiting');

        if (limitingReactant === 1 && reagent1Checkbox.checked) {
            reagent1Checkbox.classList.add('correct-answer');
        } else if (limitingReactant === 2 && reagent2Checkbox.checked) {
            reagent2Checkbox.classList.add('correct-answer');
        } else {
            if (limitingReactant === 1) {
                reagent1Checkbox.classList.add('incorrect-answer');
            } else {
                reagent2Checkbox.classList.add('incorrect-answer');
            }
        }
    }

    function addToOpportunities(userInput, parentCell) {
        const opportunitiesTableBody = window.opportunitiesTable.querySelector('tbody');
        const newRow = opportunitiesTableBody.insertRow();
        const userInputCell = newRow.insertCell(0);
        const correctAnswerCell = newRow.insertCell(1);

        userInputCell.textContent = userInput; // Use original input
        correctAnswerCell.textContent = getCorrectAnswer(parentCell.querySelector('.input-check')); // Get correct answer from the cell with spaces

    }

    const stepHighlightConfig = {
        "1": '[data-cell-type="names"][data-product="1"],[data-cell-type="names"][data-product="2"]',
        "2": [
            '#formulaInputRow [data-cell-type="formula"][data-reagent="1"]',
            '#formulaInputRow [data-cell-type="formula"][data-reagent="2"]',
            '#formulaInputRow [data-cell-type="formula"][data-product="1"]',
            '#formulaInputRow [data-cell-type="formula"][data-product="2"]'
        ],
        "3": '',
        "4": '[data-cell-type="molarMass"][data-product="1"],[data-cell-type="molarMass"][data-product="2"],[data-cell-type="molarMass"][data-reagent="1"],[data-cell-type="molarMass"][data-reagent="2"]',
        "5": '[data-cell-type="stoich"][data-reagent="1"],[data-cell-type="stoich"][data-reagent="2"]',
        "6": '[data-cell-type="stoich"][data-product="1"],[data-cell-type="stoich"][data-product="2"]',
        "7": '',
    };

    const stepRevealConfig = {
        "1": ['[data-cell-type="names"][data-reagent="1"]', '[data-cell-type="names"][data-reagent="2"]', '#guidedPracticeTable button[data-guided-step="2"]'],
        "2": [
            '#reagent1FormulaInput',
            '#reagent2FormulaInput',
            '#product1FormulaInput',
            '#product2FormulaInput',
            '[data-cell-type="names"][data-product="1"]',
            '[data-cell-type="names"][data-product="2"]',
            '#guidedPracticeTable button[data-guided-step="3"]'
        ],
        "3": [
            '#formulaInputRow [data-cell-type="formula"][data-reagent="1"]',
            '#formulaInputRow [data-cell-type="formula"][data-reagent="2"]',
            '#formulaInputRow [data-cell-type="formula"][data-product="1"]',
            '#formulaInputRow [data-cell-type="formula"][data-product="2"]',
            '#unbalancedEquationRow [data-cell-type="formula"][data-reagent="1"]',
            '#unbalancedEquationRow [data-cell-type="formula"][data-reagent="2"]',
            '#unbalancedEquationRow [data-cell-type="formula"][data-product="1"]',
            '#unbalancedEquationRow [data-cell-type="formula"][data-product="2"]',
            '#reagent1UnbalancedEquationInput',
            '#reagent2UnbalancedEquationInput',
            '#product1UnbalancedEquationInput',
            '#product2UnbalancedEquationInput',
            '#guidedPracticeTable button[data-guided-step="4"]'
        ],
        "4": [
            '#equationRow [data-cell-type="formula"][data-reagent="1"]',
            '#equationRow [data-cell-type="formula"][data-reagent="2"]',
            '#equationRow [data-cell-type="formula"][data-product="1"]',
            '#equationRow [data-cell-type="formula"][data-product="2"]',
            '#guidedPracticeTable button[data-guided-step="5"]'
        ],
        "5": [
            '[data-cell-type="molarMass"][data-reagent="1"]',
            '[data-cell-type="molarMass"][data-reagent="2"]',
            '[data-cell-type="molarMass"][data-product="1"]',
            '[data-cell-type="molarMass"][data-product="2"]',
            '[data-cell-type="stoich"][data-reagent="1"]',
            '[data-cell-type="stoich"][data-reagent="2"]',
            '#reagent1Limiting',
            '#reagent2Limiting',
            '#guidedPracticeTable button[data-guided-step="6"]'
        ],
        "6": [
            '[data-cell-type="stoich"][data-reagent="1"]',
            '[data-cell-type="stoich"][data-reagent="2"]',
            '#guidedPracticeTable button[data-guided-step="7"]'
        ],
        "7": ['[data-cell-type="stoich"][data-product="1"]',
            '[data-cell-type="stoich"][data-product="2"]']
    };

    function revealElements(selectors) {
        //reveals the spans and content but hides the input fields
        if (selectors) {
            selectors.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.classList.remove('hidden');

                    // If it's a data cell, hide textboxes and reveal other contents
                    const inputFields = element.querySelectorAll('.input-check');
                    if (inputFields.length > 0) {
                        inputFields.forEach(input => {
                            input.classList.add('hidden');
                        });
                    }

                    const cellContents = element.querySelectorAll('[data-element]');
                    if (cellContents.length > 0) {
                        cellContents.forEach(content => {
                            content.classList.remove('hidden');
                        });
                    }
                }
            });
        }
    }

    function highlightElements(selectors) {
        if (selectors) {
            const elements = document.querySelectorAll(selectors);
            elements.forEach(element => {
                if (element.parentElement.tagName === 'TD') {
                    const parentCell = element.parentElement;
                    parentCell.classList.add('highlighted-cell');
                    const inputField = parentCell.querySelector('.input-check');
                    if (inputField) {
                        inputField.classList.remove('hidden');
                    }
                } else {
                    element.classList.add('highlighted-cell');
                    const inputField = element.querySelector('.input-check');
                    if (inputField) {
                        inputField.classList.remove('hidden');
                    }
                }
            });
        }
    }

    function showStepText(stepNum) {
        document.querySelector(`[data-guided-step="${stepNum}"]`).classList.add('hidden');
        document.querySelector(`[data-guided-text="${stepNum}"]`).classList.remove('hidden');
    }

    function sanitizeInput(input, allowSpaces = false) {
        if (allowSpaces) {
            return input.replace(/[^a-zA-Z0-9()./ ]/g, ''); // Spaces and '/' are allowed
        } else {
            return input.replace(/[^a-zA-Z0-9()./]/g, ''); // '/' is allowed, spaces are NOT allowed
        }
    }

    // standard generate functions
    function handleStandardGenerate() {
        reset();
        guidedPracticeSection.classList.add('hidden');
        mainContent.style.width = '100%';
        generateProblem();
        opportunitiesButton.classList.add('hidden')
        opportunitiesPopup.classList.add('hidden')
        document.getElementById('equationRow').classList.remove('hidden');
        document.getElementById('unbalancedEquationRow').classList.add('hidden');
        document.getElementById('showAllButton').classList.remove('hidden');
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.classList.add('hidden');
        });
    }

    function hideAllShowButtons() {

        const showButtons = document.querySelectorAll('#stoichTable button');

        showButtons.forEach(button => {

            button.classList.add('hidden');

        });

    }

    function revealCell(event) {
        const button = event.target;

        // Check if the clicked element is a button and has a parent element.
        if (button.tagName === 'BUTTON' && button.parentElement) {
            const cell = button.parentElement;
            button.classList.add('hidden');
            Array.from(cell.children)
                .filter(child => child !== button && (child.tagName !== 'INPUT' || child.type !== 'text'))
                .forEach(child => child.classList.remove('hidden'));
        } else {
            console.warn('revealCell: Clicked element is not a button or has no parent.');
        }
    }

    function showAllValues() {
        const table = document.getElementById('stoichTable');
        table.querySelectorAll('button').forEach(button => button.click());
    }
    // problem generation functions
    function generateProblem() {
        setArrayEnd();
        setArrayBegin();
        generateCompound();
        calculateSubscripts();
        calculateCoefficients();
        calculateMolarMasses();
        generateStoichMasses();
        writeToTable()
    }

    function setArrayEnd() {
        if (useTransitionMetals.checked) {
            cationRangeEnd = cations.length;
        } else {
            cationRangeEnd = 9;
        }
    }

    function setArrayBegin() {
        if (usePolyatomicIons.checked) {
            anionRangeBegin = 0;
            cationRangeBegin = 0;
        } else {
            cationRangeBegin = 1;
            anionRangeBegin = 21;
        }
    }

    function generateCompound() {
        var c1 = Math.floor(Math.random() * (cationRangeEnd - cationRangeBegin) + cationRangeBegin);
        var c2 = Math.floor(Math.random() * (cationRangeEnd - cationRangeBegin) + cationRangeBegin);
        var a1 = Math.floor(Math.random() * (anionRangeEnd - anionRangeBegin) + anionRangeBegin);
        var a2 = Math.floor(Math.random() * (anionRangeEnd - anionRangeBegin) + anionRangeBegin);
        while (c1 == c2) {
            c2 = Math.floor(Math.random() * (cationRangeEnd - cationRangeBegin) + cationRangeBegin);
        }
        while (a1 == a2) {
            a2 = Math.floor(Math.random() * (anionRangeEnd - anionRangeBegin) + anionRangeBegin);
        }
        cation1 = [...cations[c1]];
        anion1 = [...anions[a1]];
        cation2 = [...cations[c2]];
        anion2 = [...anions[a2]];
    }

    function calculateSubscripts() {
        reagentSubscripts[0] = reduceAndCross(cation1[2], anion1[2]);
        reagentSubscripts[1] = reduceAndCross(cation2[2], anion2[2]);
        productSubscripts[0] = reduceAndCross(cation1[2], anion2[2]);
        productSubscripts[1] = reduceAndCross(cation2[2], anion1[2]);
    }

    function reduceAndCross(c, a) {
        while (c % 2 == 0 && a % 2 == 0) {
            c = c / 2;
            a = a / 2;
        }
        while (c % 3 == 0 && a % 3 == 0) {
            c = c / 3;
            a = a / 3;
        }
        return [a, c];
    }

    function calculateMolarMasses() {
        molarMasses[0] = (cation1[3] * reagentSubscripts[0][0] + anion1[3] * reagentSubscripts[0][1]).toFixed(2);
        molarMasses[1] = (cation2[3] * reagentSubscripts[1][0] + anion2[3] * reagentSubscripts[1][1]).toFixed(2);
        molarMasses[2] = (cation1[3] * productSubscripts[0][0] + anion2[3] * productSubscripts[0][1]).toFixed(2);
        molarMasses[3] = (cation2[3] * productSubscripts[1][0] + anion1[3] * productSubscripts[1][1]).toFixed(2);

    }

    function calculateCoefficients() {
        var attempts = 1;
        balanceAttempt();
        balanceAttempt();
        while (coefficients[0] + coefficients[1] + coefficients[2] + coefficients[3] != Math.floor(coefficients[0]) + Math.floor(coefficients[1]) + Math.floor(coefficients[2]) + Math.floor(coefficients[3]) || coefficients[0] >= 12) {
            attempts++;
            coefficients[0]++;
            balanceAttempt();
        }
        if (coefficients[0] < 12) {
            if (coefficients[0] % 2 == 0 && coefficients[1] % 2 == 0 && coefficients[2] % 2 == 0 && coefficients[3] % 2 == 0)
                for (var i = 0; i < 4; i++) {
                    coefficients[i] = coefficients[i] / 2;
                }
            if (coefficients[0] % 3 == 0 && coefficients[1] % 3 == 0 && coefficients[2] % 3 == 0 && coefficients[3] % 3 == 0)
                for (var i = 0; i < 4; i++) {
                    coefficients[i] = coefficients[i] / 3;
                }

        } else {
            console.log('balancing failed');
        }
    }

    function balanceAttempt() {
        coefficients[2] = coefficients[0] * reagentSubscripts[0][0] / productSubscripts[0][0];
        coefficients[3] = coefficients[0] * reagentSubscripts[0][1] / productSubscripts[1][1];
        coefficients[1] = coefficients[3] * productSubscripts[1][0] / reagentSubscripts[1][0];
        coefficients[2] = coefficients[1] * reagentSubscripts[1][1] / productSubscripts[0][1];
        coefficients[0] = coefficients[2] * productSubscripts[0][0] / reagentSubscripts[0][0];
        coefficients[0] = coefficients[3] * productSubscripts[1][1] / reagentSubscripts[0][1];
        coefficients[3] = coefficients[1] * reagentSubscripts[1][0] / productSubscripts[1][0];
        coefficients[1] = coefficients[2] * productSubscripts[0][1] / reagentSubscripts[1][1];
    }

    function generateStoichMasses() {
        // Generate random mols for reagents (1 to 5, one decimal place)
        const reagent1Mols = parseFloat((Math.random() * 4 + 1).toFixed(1));
        const reagent2Mols = parseFloat((Math.random() * 4 + 1).toFixed(1));
        // Calculate production modifiers
        const reagent1Modifier = reagent1Mols / coefficients[0];
        const reagent2Modifier = reagent2Mols / coefficients[1];


        // Determine limiting reactant
        let limitingReactant;
        if (reagent1Modifier < reagent2Modifier) {
            limitingReactant = 1; // Reagent 1 is limiting
        } else {
            limitingReactant = 2; // Reagent 2 is limiting
        }

        let product1Stoich, product2Stoich;

        if (limitingReactant === 1) {
            product1Stoich = reagent1Modifier * molarMasses[2] * coefficients[2];
            product2Stoich = reagent1Modifier * molarMasses[3] * coefficients[3];

        } else {
            product1Stoich = reagent2Modifier * molarMasses[2] * coefficients[2];
            product2Stoich = reagent2Modifier * molarMasses[3] * coefficients[3];
        }
        // Write stoich values to table cells
        const stoichValues = [(reagent1Mols * molarMasses[0]).toFixed(2), (reagent2Mols * molarMasses[1]).toFixed(2), product1Stoich.toFixed(2), product2Stoich.toFixed(2)]
        window.stoichValues = stoichValues
        // Store limiting reactant for later use
        window.limitingReactant = limitingReactant; // Store in global scope or an object as needed
    }

    // Writing to Table functions
    function writeToTable() {
        //write names
        document.querySelector('[data-cell-type="names"][data-reagent="1"] [data-element="cationName"]').textContent = cation1[0];
        document.querySelector('[data-cell-type="names"][data-reagent="1"] [data-element="anionName"]').textContent = anion1[0];
        document.querySelector('[data-cell-type="names"][data-reagent="2"] [data-element="cationName"]').textContent = cation2[0];
        document.querySelector('[data-cell-type="names"][data-reagent="2"] [data-element="anionName"]').textContent = anion2[0];
        document.querySelector('[data-cell-type="names"][data-product="1"] [data-element="cationName"]').textContent = cation1[0];
        document.querySelector('[data-cell-type="names"][data-product="1"] [data-element="anionName"]').textContent = anion2[0];
        document.querySelector('[data-cell-type="names"][data-product="2"] [data-element="cationName"]').textContent = cation2[0];
        document.querySelector('[data-cell-type="names"][data-product="2"] [data-element="anionName"]').textContent = anion1[0];

        updateElements('[data-cell-type="formula"][data-reagent="1"] [data-element="coefficient"]', coefficients[0]);
        updateElements('[data-cell-type="formula"][data-reagent="1"] [data-element="cation"]', cation1[1]);
        updateElements('[data-cell-type="formula"][data-reagent="1"] [data-element="cationSubscript"]', reagentSubscripts[0][0]);
        updateElements('[data-cell-type="formula"][data-reagent="1"] [data-element="anion"]', anion1[1]);
        updateElements('[data-cell-type="formula"][data-reagent="1"] [data-element="anionSubscript"]', reagentSubscripts[0][1]);

        // Reagent 2
        updateElements('[data-cell-type="formula"][data-reagent="2"] [data-element="coefficient"]', coefficients[1]);
        updateElements('[data-cell-type="formula"][data-reagent="2"] [data-element="cation"]', cation2[1]);
        updateElements('[data-cell-type="formula"][data-reagent="2"] [data-element="cationSubscript"]', reagentSubscripts[1][0]);
        updateElements('[data-cell-type="formula"][data-reagent="2"] [data-element="anion"]', anion2[1]);
        updateElements('[data-cell-type="formula"][data-reagent="2"] [data-element="anionSubscript"]', reagentSubscripts[1][1]);

        // Product 1
        updateElements('[data-cell-type="formula"][data-product="1"] [data-element="coefficient"]', coefficients[2]);
        updateElements('[data-cell-type="formula"][data-product="1"] [data-element="cation"]', cation1[1]);
        updateElements('[data-cell-type="formula"][data-product="1"] [data-element="cationSubscript"]', productSubscripts[0][0]);
        updateElements('[data-cell-type="formula"][data-product="1"] [data-element="anion"]', anion2[1]);
        updateElements('[data-cell-type="formula"][data-product="1"] [data-element="anionSubscript"]', productSubscripts[0][1]);

        // Product 2
        updateElements('[data-cell-type="formula"][data-product="2"] [data-element="coefficient"]', coefficients[3]);
        updateElements('[data-cell-type="formula"][data-product="2"] [data-element="cation"]', cation2[1]);
        updateElements('[data-cell-type="formula"][data-product="2"] [data-element="cationSubscript"]', productSubscripts[1][0]);
        updateElements('[data-cell-type="formula"][data-product="2"] [data-element="anion"]', anion1[1]);
        updateElements('[data-cell-type="formula"][data-product="2"] [data-element="anionSubscript"]', productSubscripts[1][1]);

        //molar masses
        document.querySelector('[data-cell-type="molarMass"][data-reagent="1"] [data-element="molarMass"]').textContent = molarMasses[0] + " g/mol";
        document.querySelector('[data-cell-type="molarMass"][data-reagent="2"] [data-element="molarMass"]').textContent = molarMasses[1] + " g/mol";
        document.querySelector('[data-cell-type="molarMass"][data-product="1"] [data-element="molarMass"]').textContent = molarMasses[2] + " g/mol";
        document.querySelector('[data-cell-type="molarMass"][data-product="2"] [data-element="molarMass"]').textContent = molarMasses[3] + " g/mol";

        document.querySelector('[data-cell-type="stoich"][data-reagent="1"] [data-element="actualMass"]').textContent = stoichValues[0] + " g";
        document.querySelector('[data-cell-type="stoich"][data-reagent="2"] [data-element="actualMass"]').textContent = stoichValues[1] + " g";
        document.querySelector('[data-cell-type="stoich"][data-product="1"] [data-element="actualMass"]').textContent = stoichValues[2] + " g";
        document.querySelector('[data-cell-type="stoich"][data-product="2"] [data-element="actualMass"]').textContent = stoichValues[3] + " g";
    }
    //loops through all cells with a specified data type so they don't have to be written individually
    function updateElements(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (value !== undefined && value !== 1) {
                element.innerHTML = value;
            } else if (value === 1) {
                element.innerHTML = "";
            }
        });
    }

    // general page setup
    function toggleInstructions() {
        instructionsPopup.classList.toggle('hidden');
    }

    function togglePeriodicTable() {
        periodicTableContainer.classList.toggle('hidden');
    }

    function toggleOpportunities() {
        opportunitiesPopup.classList.toggle('hidden');
    }

    function setupButtons(selector, eventHandler) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            button.addEventListener('click', eventHandler);
        });
    }

    function setupMainButtons() {
        standardGenerateButton.addEventListener('click', handleStandardGenerate);
        guidedGenerateButton.addEventListener('click', handleGuidedGenerate);
        showAllButton.addEventListener('click', showAllValues);
        instructionsButton.addEventListener("click", toggleInstructions);
        periodicTableButton.addEventListener("click", togglePeriodicTable);
        opportunitiesButton.addEventListener("click", toggleOpportunities);
        useTransitionMetals.addEventListener('click', setArrayEnd);
        usePolyatomicIons.addEventListener('click', setArrayBegin);
    }

    function setupEnterProgression(){
        const triggerInputs = [
            { rowId: 'compound names', cellType: 'names', inputId: 'product2NameInput', nextStep: 2, focusSelector: '#formulaInputRow input[type="text"]' },
            { rowId: 'formulaInputRow', inputId: 'product2FormulaInput', nextStep: 3, focusSelector: '#unbalancedEquationRow input[type="text"]' },
            { rowId: 'unbalancedEquationRow', inputId: 'product2UnbalancedEquationInput', nextStep: 4, focusSelector: '#reagent1MolarMassInput' },
            { rowId: 'molar masses', cellType: 'molarMass', inputId: 'product2MolarMassInput', inputType: 'text', nextStep: 5, focusSelector: '.stoich [data-cell-type="stoich"][data-reagent="1"] input[type="checkbox"]' }, // Focus on the first checkbox in stoich
            { rowClass: 'stoich', cellType: 'stoich', inputId: 'product2StoichInput', inputType: 'text', nextStep: 7, focusSelector: null }, // No specific focus after the last input
        ];

        function handleEnterKey(event, nextStepButtonSelector, focusSelector) {
            if (event.key === 'Enter' && event.target.tagName.toLowerCase() === 'input') {
                event.preventDefault();
                const nextButton = document.querySelector(nextStepButtonSelector);
                if (nextButton && !nextButton.classList.contains('hidden')) {
                    nextButton.click();
                    // Focus on the first input of the next row (if a selector is provided)
                    if (focusSelector) {
                        setTimeout(() => { // Use setTimeout to ensure the next row is visible
                            const nextInput = document.querySelector(focusSelector);
                            if (nextInput) {
                                nextInput.focus();
                            }
                        }, 10); // Small delay to allow DOM updates
                    }
                }
            }
        }

        triggerInputs.forEach(config => {
            let inputElement;
            let rowElement;

            if (config.rowId) {
                rowElement = document.getElementById(config.rowId);
            } else if (config.rowClass) {
                rowElement = document.querySelector(`.${config.rowClass}`);
            }

            if (config.inputId) {
                inputElement = document.getElementById(config.inputId);
            } else {
                let inputSelector = `[data-cell-type="${config.cellType}"][data-product="2"] input`;
                if (config.inputType) {
                    inputSelector += `[type="${config.inputType}"]`;
                }
                inputElement = rowElement ? rowElement.querySelector(inputSelector) : null;
            }

            const nextButtonSelector = `#guidedPracticeTable button[data-guided-step="${config.nextStep}"]`;

            if (rowElement && inputElement) {
                rowElement.addEventListener('keypress', function(event) {
                    if (event.key === 'Enter' && event.target === inputElement) {
                        handleEnterKey(event, nextButtonSelector, config.focusSelector);
                    }
                });
            }
        });
    };

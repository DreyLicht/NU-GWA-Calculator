document.getElementById("add-grade").addEventListener("click", addGradeInput);
document.getElementById("calculate-gwa").addEventListener("click", calculateGWA);

function addGradeInput() {
  const gradeContainer = document.getElementById("grade-container");

  const gradeInput = document.createElement("div");
  gradeInput.className = "grade-input";
  gradeInput.innerHTML = `
    <input type="number" placeholder="Grade" class="grade" min="1" max="100" step="0.01">
    <input type="number" placeholder="Units" class="units" min="1" max="5" step="0.01">
    <button class="remove">Remove</button>
  `;
  
  gradeInput.querySelector(".remove").addEventListener("click", function() {
    gradeContainer.removeChild(gradeInput);
  });

  gradeContainer.appendChild(gradeInput);
}

function calculateGWA() {
  const grades = document.querySelectorAll(".grade");
  const units = document.querySelectorAll(".units");

  let totalUnits = 0;
  let weightedSum = 0;

  for (let i = 0; i < grades.length; i++) {
    const grade = parseFloat(grades[i].value);
    const unit = parseFloat(units[i].value);

    if (isNaN(grade) || isNaN(unit)) continue;

    weightedSum += grade * unit;
    totalUnits += unit;
  }

  let gwa = totalUnits ? (weightedSum / totalUnits).toFixed(2) : "N/A";

  // Avoid rounding off by converting to a string and using .substring()
  if (typeof gwa === "string" && gwa !== "N/A") {
    gwa = gwa.substring(0, gwa.indexOf(".") + 3);
  }

  let resultText = `Your GWA is: ${gwa}`;

  // Display Dean's Lister status based on the GWA
  if (parseFloat(gwa) >= 3.5) {
    resultText += " - 1st Honor Dean's Lister";
  } else if (parseFloat(gwa) >= 3.25) {
    resultText += " - 2nd Honor Dean's Lister";
  }

  document.getElementById("result").textContent = resultText;
}

document.getElementById("add-grade").addEventListener("click", addGradeInput);
document.getElementById("calculate-gwa").addEventListener("click", calculateGWA);

function addGradeInput() {
  const gradeContainer = document.getElementById("grade-container");

  const gradeInput = document.createElement("div");
  gradeInput.className = "grade-input";
  gradeInput.innerHTML = `
    <input type="number" placeholder="Grade" class="grade" min="1" max="100">
    <input type="number" placeholder="Units" class="units" min="1" max="5">
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

  const gwa = totalUnits ? (weightedSum / totalUnits).toFixed(2) : "N/A";
  document.getElementById("result").textContent = `Your GWA is: ${gwa}`;
}

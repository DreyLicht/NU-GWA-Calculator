document.getElementById("add-grade").addEventListener("click", addGradeInput);
document.getElementById("calculate-gwa").addEventListener("click", calculateGWA);

let confettiInterval; // Variable to control confetti interval

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

function startConfetti() {
  const confettiContainer = document.getElementById("confetti");

  // Generate confetti at regular intervals
  confettiInterval = setInterval(() => {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
    confetti.style.setProperty('--i', Math.floor(Math.random() * 10)); // Random hue shift
    confettiContainer.appendChild(confetti);

    // Remove confetti piece after it falls to prevent memory overload
    setTimeout(() => confetti.remove(), 5000);
  }, 100); // Generate a new confetti piece every 100 ms
}

function stopConfetti() {
  clearInterval(confettiInterval);
  document.getElementById("confetti").innerHTML = ""; // Clear confetti from screen
}

function calculateGWA() {
  const grades = document.querySelectorAll(".grade");
  const units = document.querySelectorAll(".units");

  let totalUnits = 0;
  let weightedSum = 0;
  let hasLowGrade = false; // Flag to check if there's a grade below 2.5

  for (let i = 0; i < grades.length; i++) {
    const grade = parseFloat(grades[i].value);
    const unit = parseFloat(units[i].value);

    if (isNaN(grade) || isNaN(unit)) continue;

    // Check if the grade is below 2.5
    if (grade < 2.5) {
      hasLowGrade = true;
    }

    weightedSum += grade * unit;
    totalUnits += unit;
  }

  let gwa = totalUnits ? (weightedSum / totalUnits).toFixed(2) : "N/A";
  if (typeof gwa === "string" && gwa !== "N/A") {
    gwa = gwa.substring(0, gwa.indexOf(".") + 3);
  }

  let resultText = `Your GWA is: ${gwa}`;
  const overlay = document.getElementById("overlay");

  // If any grade is below 2.5, the user cannot be a Dean's Lister
  if (hasLowGrade) {
    resultText += " - Cannot be a Dean's Lister due to a grade below 2.5";
  } else if (parseFloat(gwa) >= 3.5) {
    resultText += " - 1st Honor Dean's Lister";
    overlay.classList.add("active");
    document.getElementById("announcement").textContent = "Congratulations! 1st Honor Dean's Lister";
    startConfetti();
  } else if (parseFloat(gwa) >= 3.25) {
    resultText += " - 2nd Honor Dean's Lister";
    overlay.classList.add("active");
    document.getElementById("announcement").textContent = "Congratulations! 2nd Honor Dean's Lister";
    startConfetti();
  } else if (parseFloat(gwa) < 3.25) {
    resultText += " - Passing GWA";
  }

  document.getElementById("result").textContent = resultText;

  // Hide overlay and stop confetti after 3 seconds
  setTimeout(() => {
    overlay.classList.remove("active");
    stopConfetti(); // Stop confetti falling
  }, 3000);
}

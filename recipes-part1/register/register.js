// register.js

// Track number of participants
let participantCount = 1;

// lets Get references to buttons and form
const addButton = document.getElementById("add");
const form = document.querySelector("form");
const summarySection = document.getElementById("summary");

// ------------------------------
// Here is Function to create participant HTML
// ------------------------------
function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}"> First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity" />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee" />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date <span>*</span></label>
      <input id="date${count}" type="date" name="date" />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${count}">
        <option selected value="" disabled></option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>
    </div>
  </section>
  `;
}

// ------------------------------
// lets Add Participant Button Functionality
// ------------------------------
addButton.addEventListener("click", () => {
  participantCount++; // Increase participant count
  const newParticipantHTML = participantTemplate(participantCount);

  // Insert new participant before the Add button
  addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
});

// ------------------------------
// function to Calculate Total Fees
// ------------------------------
function totalFees() {
  //
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  // Sum all fees
  let total = 0;
  feeElements.forEach(feeInput => {
    const feeValue = parseFloat(feeInput.value);
    if (!isNaN(feeValue)) {
      total += feeValue;
    }
  });

  return total;
}

// ------------------------------
// Success Message  after submit 
// ------------------------------
function successTemplate(info) {
  return `
    <h2>Registration Complete</h2>
    <p>Thank you ${info.adultName} for registering. You have registered ${info.participants} participant(s) and owe $${info.totalFees.toFixed(2)} in Fees.</p>
  `;
}

// ------------------------------
// adding Submit Form Functionality
// ------------------------------
form.addEventListener("submit", (event) => {
  event.preventDefault(); //thiss will  Prevent page reload

  // Get adult name
  const adultName = document.getElementById("adult_name").value;

  // Get total fees
  const fees = totalFees();

  // Hide the form
  form.style.display = "none";

  // Show summary message
  summarySection.innerHTML = successTemplate({
    adultName: adultName,
    participants: participantCount,
    totalFees: fees
  });
});

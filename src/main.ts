let sliderValue = 10;
const slider = document.getElementById("amount-slider") as HTMLInputElement;
const sliderLabel = document.getElementById("amount-label") as HTMLElement;
sliderLabel.innerText = `Amount: ${sliderValue}`;

slider.oninput = ({target}) => {
  sliderValue = parseInt((target as HTMLInputElement)?.value);
  sliderLabel.innerText = `Amount: ${sliderValue}`;
}

function generateList() {
  window.location.href = `/src/pages/result/result.html?amount=${sliderValue}`
}

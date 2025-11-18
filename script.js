// Handle Apply Changes button click
document.getElementById('applyBtn').addEventListener('click', function () {
  let xType = document.getElementById('xType').value;
  let yType = document.getElementById('yType').value;
  let fillColor = document.getElementById('fillColor').value;
  let yCustom = document.getElementById('yCustom').value;

  let xVals = getXValues(xType);
  let yVals = getYValues(yType, yCustom);

  // Update chart
  window.chart.data.labels = xVals;
  window.chart.data.datasets[0].data = yVals;
  window.chart.data.datasets[0].backgroundColor = fillColor + '50'; // low opacity HEX
  window.chart.data.datasets[0].borderColor = fillColor;
  window.chart.update();
});

// Clear textarea if Y values selection is changed
document.getElementById('yType').addEventListener('change', function () {
  if(this.value !== 'custom') document.getElementById('yCustom').value = '';
});

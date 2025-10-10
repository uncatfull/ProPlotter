document.addEventListener('DOMContentLoaded', () => {
  const xDropdown = document.getElementById('xDropdown');
  const yDropdown = document.getElementById('yDropdown');
  const xFileInput = document.getElementById('xFileInput');
  const yFileInput = document.getElementById('yFileInput');
  const xCSV = document.getElementById('xCSV');
  const yCSV = document.getElementById('yCSV');
  const xValues = document.getElementById('xValues');
  const yValues = document.getElementById('yValues');

  // Dropdown CSV input toggle
  xDropdown.addEventListener('change', () => {
    xFileInput.style.display = xDropdown.value === 'csv' ? 'block' : 'none';
    xValues.style.display = xDropdown.value === 'manual' ? 'block' : 'none';
  });

  yDropdown.addEventListener('change', () => {
    yFileInput.style.display = yDropdown.value === 'csv' ? 'block' : 'none';
    yValues.style.display = yDropdown.value === 'manual' ? 'block' : 'none';
  });

  // Read CSV files
  xCSV.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Basic CSV: use only the first row or first column values
        let text = event.target.result.trim();
        let data = text.includes('\n') ? text.split('\n').join(',') : text;
        xValues.value = data.split(',').map(v => v.trim()).join(',');
      };
      reader.readAsText(file);
    }
  });
  yCSV.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        let text = event.target.result.trim();
        let data = text.includes('\n') ? text.split('\n').join(',') : text;
        yValues.value = data.split(',').map(v => v.trim()).join(',');
      };
      reader.readAsText(file);
    }
  });

  // Make the graph
  document.getElementById('createGraph').addEventListener('click', () => {
    let xData = xValues.value.split(',').map(v => v.trim()).slice(0, 2000);
    let yData = yValues.value.split(',').map(v => v.trim()).slice(0, 2000);

    if (xData.length === 0 || yData.length === 0 || xData[0] === '' || yData[0] === '') {
      alert("Please enter or import both X and Y values.");
      return;
    }

    const options = {
      type: document.getElementById('graphType').value,
      lineColor: document.getElementById('lineColor').value,
      fillArea: document.getElementById('fillArea').checked,
      lineWidth: parseInt(document.getElementById('lineWidth').value),
      pointStyle: document.getElementById('pointStyle').value,
      pointSize: parseInt(document.getElementById('pointSize').value),
      xlabel: document.getElementById('xlabel').value,
      ylabel: document.getElementById('ylabel').value,
      gridLines: document.getElementById('gridLines').checked,
      bgColor: document.getElementById('bgColor').value,
      animSpeed: parseInt(document.getElementById('animSpeed').value),
      title: document.getElementById('graphTitle').value,
      fontWeight: document.getElementById('fontWeight').value
    };

    document.querySelector('.preview').style.background = options.bgColor;
    createGraph(xData, yData, options);
  });

  // Download Graph as PNG
  document.getElementById('downloadGraph').addEventListener('click', () => {
    if (!chartInstance) {
      alert("No graph to download. Create one first.");
      return;
    }
    const canvas = document.getElementById('graphPreview');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'proplotter-graph.png';
    link.click();
  });
});

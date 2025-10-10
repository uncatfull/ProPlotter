let chartInstance = null;

function createGraph(xVals, yVals, options) {
  const ctx = document.getElementById('graphPreview').getContext('2d');
  if (chartInstance) chartInstance.destroy();

  const chartType = options.type === 'scatter' ? 'scatter' : options.type;
  let data = {};

  if (chartType === 'pie') {
    data = {
      labels: xVals,
      datasets: [{
        data: yVals.map(Number),
        backgroundColor: options.lineColor,
      }]
    };
  } else {
    data = {
      labels: xVals,
      datasets: [{
        label: options.ylabel,
        data: yVals.map(Number),
        borderColor: options.lineColor,
        backgroundColor: options.fillArea ? "rgba(0,173,239,0.22)" : "transparent",
        fill: options.fillArea,
        borderWidth: options.lineWidth,
        pointStyle: options.pointStyle,
        pointRadius: options.pointSize,
        tension: options.type === 'line' ? 0.4 : 0
      }]
    };
  }

  chartInstance = new Chart(ctx, {
    type: chartType,
    data: data,
    options: {
      responsive: true,
      animation: {
        duration: options.animSpeed,
        easing: 'easeOutBounce'
      },
      plugins: {
        title: {
          display: true,
          text: options.title,
          color: '#F3F3F3',
          font: { 
            size: 18, 
            family: 'Helvetica', 
            weight: options.fontWeight 
          }
        },
        legend: {
          display: true,
          labels: { 
            color: '#ddd', 
            font: { 
              family: 'Helvetica', 
              weight: options.fontWeight 
            } 
          }
        }
      },
      scales: chartType !== 'pie' ? {
        x: {
          title: { 
            display: true, 
            text: options.xlabel, 
            color: '#ddd', 
            font: { weight: options.fontWeight } 
          },
          grid: { 
            display: options.gridLines, 
            color: '#333' 
          }
        },
        y: {
          title: { 
            display: true, 
            text: options.ylabel, 
            color: '#ddd', 
            font: { weight: options.fontWeight } 
          },
          grid: { 
            display: options.gridLines, 
            color: '#333' 
          }
        }
      } : {}
    }
  });
}

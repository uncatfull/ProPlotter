// Utility for getting X axis values
function getXValues(type) {
  switch(type) {
    case 'even': return [2,4,6,8,10,12,14,16,18,20];
    case 'odd': return [1,3,5,7,9,11,13,15,17,19];
    case '1to10':
    default: return Array.from({length:10}, (_,i)=>i+1);
  }
}
// Utility for getting Y axis values based on selection
function getYValues(type, custom) {
  switch(type) {
    case 'linear': return getXValues(document.getElementById('xType').value).map(x=>2*x+1);
    case 'sin': return getXValues(document.getElementById('xType').value).map(x=>Math.round(8+6*Math.sin(x)));
    case 'custom':
      let arr = custom.split(',').map(v=>parseFloat(v.trim())).filter(v=>!isNaN(v));
      if(arr.length === 10) return arr;
      return [3,7,5,10,8,12,9,14,11,15];
    case 'default':
    default: return [3,7,5,10,8,12,9,14,11,15];
  }
}

// Chart.js setup code
let ctx = document.getElementById('myChart').getContext('2d');
window.chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: getXValues('1to10'),
    datasets: [{
      label: 'Trend',
      data: getYValues('default',''),
      borderColor: '#36A2EB',
      backgroundColor: 'rgba(54,162,235,0.35)',
      fill: true,
      tension: 0.45, // Smoother curve
    }]
  },
  options: {
    animation: {
      duration: 1150,
      easing: 'easeInOutQuart'
    },
    responsive: true,
    plugins: {
      legend: {display: false},
      tooltip: {enabled: true}
    },
    scales: {
      x: { title: { display: true, text: 'X Value', font: {weight: 600} } },
      y: { title: { display: true, text: 'Y Value', font: {weight: 600} }, beginAtZero:true }
    }
  }
});

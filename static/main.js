async function populate() {
  const data = await getData();
  populateTable(data);
  createChart(data);
  return;
}

function populateTable(data) {
  const tableBody = document.getElementById("table");

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    const row = `
          <tr>
              <td>${index + 1}</td>
              <td>${item.date}</td>
              <td>${item.new_cases}</td>
          </tr>
      `;
    tableBody.innerHTML += row;
  });
}

async function getData() {
  const url = "http://127.0.0.1:5000/data";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let data = await response.json();

    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

function createChart(data) {
  const labels = [];
  const newCases = [];

  data.forEach((item, index) => {
    labels.push(item.date);
    newCases.push(item.new_cases);
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Forecasted New Cases",
          data: newCases,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM D",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "New Cases",
          },
        },
      },
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

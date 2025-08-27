import React from 'react'   // React library.
import { Bar } from 'react-chartjs-2'   // Bar chart component.
import { Chart as ChartJS, LinearScale, BarElement, scales} from 'chart.js'   // Chart.js modules.
import { useEffect, useState} from 'react'   // React hooks.

// Register chart types.
ChartJS.register(LinearScale, BarElement)

const BarChart = () => {
    const [arrMonthlySales, setArrMonthlySales] = useState([])   // State for sales data.

    // Fetch sales data from API.
    useEffect(() => {
        const fetchInfosAPI = async () => {
            try {
                const responseFetch = await fetch('http://localhost:3000/sales')
                const jsonResponse = await responseFetch.json()

                setArrMonthlySales(jsonResponse)
            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        }

        fetchInfosAPI()
    }, [])

    // Chart data settings.
    const data = {
        datasets: [
            {
                backgroundColor: 'rgba(0, 255, 0, 0.4)',
                borderColor: 'rgba(0, 255, 0, 1)',
                borderWidth: 1,
                data: arrMonthlySales,
                label: 'Monthly Sales',
                
                parsing: {
                    xAxisKey: 'month',
                    yAxisKey: 'value',
                },
            },
        ],
    }

    // Chart options settings.
    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 1,
            },
            y: {
                beginAtZero: true,
            }
        }
    }

    // Render bar chart.
    return <Bar data={data} options={chartOptions} />
};

// Export BarChart component.
export default BarChart;
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import orders from "./data";

const OrdersChart = ({ orders, type }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: [],
    },
    stroke: {
      curve: 'smooth',
    },
    series: [],
  });
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    if (filteredOrders) {
      updateChart();
    }
  }, [filteredOrders]);

  const updateChart = () => {
    const ordersByMonth = organizeDataByMonth(filteredOrders);
    const { productIds, seriesData, categories } =
      prepareChartData(ordersByMonth);

    setChartOptions({
      xaxis: {
        categories: categories,
      },
      stroke: {
        curve: 'smooth',
      },
      series: seriesData,
    });
  };

  const organizeDataByMonth = (data) => {
    const ordersByMonth = {};
    data.forEach((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString("default", { month: "short" });

      if (!ordersByMonth[month]) {
        ordersByMonth[month] = [];
      }

      order.products.forEach((product) => {
        if (!ordersByMonth[month][product.productId]) {
          ordersByMonth[month][product.productId] = 0;
        }

        ordersByMonth[month][product.productId] += product.quantity;
      });
    });

    return ordersByMonth;
  };

  const prepareChartData = (ordersByMonth) => {
    const productIds = [
      ...new Set(
        filteredOrders.flatMap((order) =>
          order.products.map((product) => product.productId)
        )
      ),
    ];

    const categories = Object.keys(ordersByMonth);
    const seriesData = productIds.map((productId) => ({
      name: `Product ${productId}`,
      data: categories.map(
        (monthOrders) => ordersByMonth[monthOrders][productId] || 0
      ),
    }));

    return { productIds, seriesData, categories };
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    let filteredData;

    if (filter === "days") {
      filteredData = orders.filter((order) => {
        const orderDate = new Date(order.date);
        const currentDate = new Date();
        const differenceInDays =
          (currentDate - orderDate) / (1000 * 60 * 60 * 24);
        return differenceInDays <= 1;
      });
    } else if (filter === "weeks") {
      filteredData = orders.filter((order) => {
        const orderDate = new Date(order.date);
        const currentDate = new Date();
        const differenceInWeeks =
          (currentDate - orderDate) / (1000 * 60 * 60 * 24 * 7);
        return differenceInWeeks <= 1;
      });
    } else if (filter === "months") {
      filteredData = orders.filter((order) => {
        const orderDate = new Date(order.date);
        const currentDate = new Date();
        const differenceInMonths =
          currentDate.getMonth() +
          1 -
          (orderDate.getMonth() + 1) +
          12 * (currentDate.getFullYear() - orderDate.getFullYear());
        return differenceInMonths <= 1;
      });
    } else {
      // Default: No filter
      filteredData = orders;
    }

    setFilteredOrders(filteredData);

    console.log('series' ,chartOptions.series);
  };

  return (
    <div>
      <div className="flex mb-4 gap-2">
        {/* <label className="text-white" htmlFor="filter">
          Filter by :
        </label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Last 2 Months</option>
        </select> */}

        {/* Filter */}
        <select id="categories"
                    
                    onChange={handleFilterChange}
                    className="bg-gray-50 border border-[#04c788] text-[#04c788] text-sm rounded-lg focus:ring-[#04c788] focus:border-[#04c788] m-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="" className="hover:bg-[#04c788]" selected>
                          Choose Date
                      </option>
                      <option value="days" className="hover:bg-[#04c788]" >
                          Last Day
                      </option>
                      <option value="weeks" className="hover:bg-[#04c788]" >
                          Last Week
                      </option>
                      <option value="months" className="hover:bg-[#04c788]" >
                          Last Months
                      </option>
          </select>

      </div>
      <div>
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type={type}
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default OrdersChart;

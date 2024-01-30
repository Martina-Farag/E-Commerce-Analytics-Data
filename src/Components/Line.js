import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import CustomHook from "./CustomHook";

const Line = () => {
  const { salesGrowthMonths, salesGrowthDays } = CustomHook();

  const [selectedDate, setSelectedDate] = useState("");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const [options, setOptions] = useState({
    chart: {
      height: 280,
      type: "area",
    },
    xaxis: {
      categories: [],
    },
    stroke: {
      curve: 'smooth',
    },
  });

  const [series, setSeries] = useState([{ data: [] }]);

  useEffect(() => {
    if (selectedDate === 'Months') {
      setOptions({
        ...options,
        xaxis: {
          categories: months,
        },
      });

      setSeries([{ data: salesGrowthMonths }]);
    } else if (selectedDate === 'Days') {
      setOptions({
        ...options,
        xaxis: {
          categories: days,
        },
      });

      // Ensure salesGrowthDays is an array of objects with 'data' property
      setSeries([{
        data: salesGrowthDays.map(val => val.data)
      }]);
    }
  }, [selectedDate, salesGrowthMonths, salesGrowthDays]);

  return ( 
    <div className="Line bg-white dark:bg-slate-800">
      {/* Filter */}
      <select
        id="Date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="bg-gray-50 border border-[#04c788] text-[#04c788] text-sm rounded-lg focus:ring-[#04c788] focus:border-[#04c788] m-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      >
        <option value="" className="hover:bg-[#04c788]" selected>
          Choose Date
        </option>
        <option value="Days" className="hover:bg-[#04c788]">
          Weeks
        </option>
        <option value="Months" className="hover:bg-[#04c788]">
          Months
        </option>
        <option value="Years" className="hover:bg-[#04c788]">
          Years
        </option>
      </select>

      <div className="row p-4 pt-5 lg:p-1">
        <div className="line-chart">
          <Chart
            className="block lg:flex justify-end"
            style={{ marginLeft: 'auto' }}
            options={options}
            series={series}
            type="line"
          />
        </div>
      </div>
    </div>
  );
};
 
export default Line;

import Chart from "react-apexcharts";
import { useState } from "react";

const Bar = ({ products, users, carts }) => {

    const [selectedDate, setSelectedDate] = useState("");

    const [options, setOtions] = useState(
        {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
        },
    );

    const [series, setSeries] = useState(
        [
            {
              name: "Products",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "Users",
                data: [50, 20, 65, 40, 29, 50, 60, 81]
            },
            {
              name: "Sales",
              data: [50, 20, 65, 40, 80, 50, 60, 81]
            }
        ]
    );

    // Filter products based on search input and selected category
    var filteredProducts = [];
    if(products){
        // filteredProducts = products.filter(
        //     (product) =>
        //     product.title.toLowerCase().includes(searchInput.toLowerCase()) &&
        //     (selectedDate === "" || product.category === selectedDate)
        // );
    }


    return ( 
        <div className="Bar bg-white dark:bg-slate-800">

          {/* Filter */}
          <select id="categories"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-gray-50 border border-[#04c788] text-[#04c788] text-sm rounded-lg focus:ring-[#04c788] focus:border-[#04c788] m-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="" className="hover:bg-[#04c788]" selected>
                          Choose Date
                      </option>
                      <option value="Days" className="hover:bg-[#04c788]" >
                          Days
                      </option>
                      <option value="Months" className="hover:bg-[#04c788]" >
                          Months
                      </option>
                      <option value="Years" className="hover:bg-[#04c788]" >
                          Years
                      </option>
          </select>
          
        <div className="row p-4 pt-5 lg:p-1" >
          <div className="mixed-chart">
            {/* w-full lg:w-[80%] */}
            <Chart
              className="block lg:flex justify-end "
              style={{ marginLeft: 'auto' }}
              options={options}
              series={series}
              type="bar"
              // width="80%"
            />
          </div>
        </div>
      </div>
     );
}
 
export default Bar;
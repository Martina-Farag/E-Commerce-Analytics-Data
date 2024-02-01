import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig/instance";
import CustomHook from "./CustomHook";

const ProductList = () => {
  const [categories, setCategories] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsPerPage = 5;

  const { products, productsNumber, usersNumber, cartsNumber, totalIncome } =
    CustomHook();

  useEffect(() => {
    // get products categories data from Fake Store API by axios library.
    axiosInstance
      .get(`/products/categories`, {})
      .then((result) => {
        // console.table(result.data);
        setCategories(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Filter products based on search input and selected category
  var filteredProducts = [];
  if (products) {
    filteredProducts = products.filter(
      (product) =>
        (searchInput === "" || product.title.toLowerCase().includes(searchInput.toLowerCase())) &&
        (selectedCategory === "" || product.category === selectedCategory)
    );
    
  }

  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="ProductList bg-white dark:bg-slate-800">
      <div class="">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/*  the products will be filtered based on both the search input and the selected category. If no category is selected (selectedCategory is an empty string), it won't filter by category. If a category is selected, it will only display products in that category. */}
          <section className="md:flex block mb-5">
            {/* Search */}
            <div className="relative flex mt-2 mr-2 lg:m-2 w-auto lg:w-full gap-2 md:w-max">
              <div className="relative h-10 w-full min-w-[288px]">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="peer h-full w-full rounded-[7px] border border-white/10  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white/10 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=""
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white/10 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white/10 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white/10 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white/10 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Type here...
                </label>
              </div>
              <button
                className="!absolute right-1 top-1 select-none rounded bg-[#04c788] dark:text-white py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Search
              </button>
            </div>

            {/* Filter */}
            <select
              id="categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-[#04c788] text-[#04c788] text-sm rounded-lg focus:ring-[#04c788] focus:border-[#04c788] m-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="" className="hover:bg-[#04c788]" selected>
                Choose Category
              </option>
              {categories &&
                categories.map((category) => (
                  <option
                    value={category}
                    className="hover:bg-[#04c788]"
                    key={category}
                  >
                    {category}
                  </option>
                ))}
            </select>
          </section>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-[#0480de] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-1.5 text-[#0480de]">
                  Product name
                </th>
                <th scope="col" className="px-3 py-1.5 text-[#0480de]">
                  Category
                </th>
                <th scope="col" className="px-3 py-1.5 text-[#0480de]">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts &&
                displayedProducts.map((product) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={product.id}
                  >
                    <th
                      scope="row"
                      className="px-2 py-2 text-gray-900 dark:text-white"
                    >
                      {product.title}
                    </th>
                    <td className="px-3 py-2">{product.category}</td>
                    <td className="px-3 py-2 text-[#04c788]">
                      ${product.price}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between m-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-gray-700 dark:text-white rounded-md"
            >
              &#11207;
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={endIndex >= filteredProducts.length}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              &#11208;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

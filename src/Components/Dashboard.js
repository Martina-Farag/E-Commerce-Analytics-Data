import { useState, useEffect } from "react";
import Loading from "./Loading";
import ProductList from "./ProductList";
import Line from "./Line";
import Bar from "./Bar";
import Navbar from "./Navbar";
import Cards from "./Cards";
import CustomHook from "./CustomHook";
import OrdersChart from "./BarChart";
import orders from "./data";

const Dashboard = () => {
  // using our Custom Hook
  const { products } = CustomHook();

  return (
    <div className="Dashboard bg-white dark:bg-slate-800">
      <Navbar />


      {/* if todos exists (not equal null) then display my charts else display the loading component */}
      {products ? (
        <div className="container lg:my-7">
          <Cards />

          <div className="block lg:grid lg:grid-cols-2 md:grid-cols-1 justify-between w-full">
            <section className="lg:mr-5 ">
              <ProductList />
            </section>
            <section className=" block lg:p-5 ">
              
              <OrdersChart orders={orders} type={'line'} />
              <OrdersChart orders={orders} type={"bar"} />
              {/* <Line /> */}
              {/* <Bar /> */}
            </section>
          </div>
        </div>
      ) : (
        <div className="absolute inset-60 m-auto">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import axiosInstance from "../axiosConfig/instance";
import { useState, useEffect } from "react";

const CustomHook = () => {

    const [products, setProducts] = useState(null);
    const [users, setUsers] = useState(null);
    const [carts, setCarts] = useState(null);

    useEffect(() => {

        // get products data from Fake Store API by axios library.
        axiosInstance.get(`/products`,{
        }).then( result => {
            // if( !result.ok ){     // response.ok = true when response is optained successfully and returns false otherwise.
            //     throw new Error("Sorry, could not Get the data for that Resource"); // we here making an error to be cateched with .catch() method and make my error variable = true 
            // }
            // console.table(result.data);
            setProducts(result.data);

        }).catch( error => {
            console.log(error.message);
        })

        // get users data from Fake Store API by axios library.
        axiosInstance.get(`/users`,{
        }).then( result => {
            setUsers(result.data);

        }).catch( error => {
            console.log(error.message);
        })

        // get carts data from Fake Store API by axios library.
        axiosInstance.get(`/carts`,{
        }).then( result => {
            setCarts(result.data);
              
        }).catch( error => {
            console.log(error.message);
        })




    }, []);     // only fires on the first load of the component

    const [productsNumber, setProductsNumber] = useState(0);
    const [totalProductsPrice, setTotalProductsPrice] = useState(0);

    const [usersNumber, setUsersNumber] = useState(0);

    const [cartsNumber, setCartsNumber] = useState(0);
    const [totalSalesNumber, setTotalSalesNumber] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    // salesGrowthMonths is (Frequency Array) : array of zeros to use it as counter to calc the sales grows every Month
    const [salesGrowthMonths, setSalesGrowthMonths] = useState();
    const [salesGrowthDays, setSalesGrowthDays] = useState();
    const [dates, setDates] = useState([]);

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    useEffect(() => {
        var totalProductsPrice = 0;
        var totalSalesNumber = 0;
        var totalIncome = 0;
        var salesGrowthMonths = {};
        var salesGrowthDays = {};

        var dates = [];
      
        if (products && users && carts) {

// date.getMonth()
          // console.log(salesGrowthMonths);

          // Calculate totalProductsPrice
          for (let i = 0; i < products.length; i++) {
            totalProductsPrice += products[i].price;
          }
      
          // Calculate totalSalesNumber and totalIncome
          for (let i = 0; i < carts.length; i++) {
            const productsArray = carts[i].products;
            dates[i] = carts[i].date;
      
            for (let j = 0; j < productsArray.length; j++) {
              totalSalesNumber += productsArray[j].quantity;
              totalIncome += productsArray[j].quantity * getProductPriceById(productsArray[j].productId);

              let cartDate = new Date(carts[i].date);
              if(salesGrowthMonths[month[cartDate.getMonth()]] ){
                
                salesGrowthMonths[month[cartDate.getMonth()]] += productsArray[j].quantity;
              }else {
                salesGrowthMonths[month[cartDate.getMonth()]] = productsArray[j].quantity;
                // console.log(month[cartDate.getMonth()]);
              }

              if(salesGrowthDays[days[cartDate.getMonth()]] ){
                
                salesGrowthDays[days[cartDate.getMonth()]] += productsArray[j].quantity;
              }else {
                salesGrowthDays[days[cartDate.getMonth()]] = productsArray[j].quantity;
                // console.log(days[cartDate.getMonth()]);

              }

              

            }
          }
      
          setTotalProductsPrice(totalProductsPrice);
          setProductsNumber(products.length);
          setUsersNumber(users.length);
          setCartsNumber(carts.length);
          setTotalSalesNumber(totalSalesNumber);
          setTotalIncome(totalIncome);
          setSalesGrowthMonths(salesGrowthMonths);
          setSalesGrowthDays(salesGrowthDays);

          setDates(dates);

          // console.log(salesGrowthMonths , dates);
        }
      }, [products, users, carts]);         // will run on any apdate of these variables
      
      // Helper function to get product price by id
      function getProductPriceById(productId) {
        const product = products.find((p) => p.id === productId);
        return product ? product.price : 0;
      }

      
  return { products, users, carts, productsNumber, totalProductsPrice, usersNumber, cartsNumber, totalSalesNumber, totalIncome, salesGrowthMonths, salesGrowthDays, dates };
}
 
export default CustomHook;
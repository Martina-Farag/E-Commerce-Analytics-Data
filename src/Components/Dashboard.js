import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import TodoList from "./TodoList";
import axiosInstance from "../axiosConfig/instance";

const Dashboard = () => {

    const [todos, setTodos] = useState(null);

    useEffect(() => {

        // get todos data from JSONPlaceholder API by axios library.
        axiosInstance.get(`/`,{

        }).then( result => {

            console.log(result.data);
            setTodos(result.data);
            // dispatch({type:'SET_MOVIE',payload:result.data})

        }).catch( error => {
            console.log(error);
        })

    }, []);     // [] : only fires on the first load of the coponent

    return ( 
        <div className="Dashboard mt-5">
            {/* if todos exists (not equal null) then display my charts else display the loading component */}
            {todos ? <TodoList todos={todos} /> 

            : <div className="absolute inset-60"><Loading /></div>}
            
            
        </div>
     );
}
 
export default Dashboard;
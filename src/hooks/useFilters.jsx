import { FiltersContext } from "../context/filters";
import { useContext } from "react";

export function useFilters(){

    const {filtersBody, setFiltersBody}= useContext(FiltersContext)

    const filtersProducts = (products) =>{
        return products.filter((product)=>{
            return(
               product.price >= filtersBody.price &&
                (
                    filtersBody.category === "all" ||
                filtersBody.category === product.type)
            )
        }

        )
    }

    return {filtersProducts, setFiltersBody, filtersBody}}
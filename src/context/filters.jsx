import { createContext } from "react";
import { useState } from "react";


export const FiltersContext = createContext()

export function FiltersProvider({children}){


const [filtersBody, setFiltersBody]= useState({
    category:"all",
    price:0
})

return(
    <FiltersContext.Provider
    value={{
        filtersBody,
        setFiltersBody
    }}
    >
        {children}

    </FiltersContext.Provider>

)




}
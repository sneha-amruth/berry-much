import {restAPICalls} from "../../utils/CallRestAPI";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Loader from "../Loader/Loader";
import {useLoader} from "../../context/loader-context";

export default function FetchProductsData() {
    const {request} = restAPICalls();
    const [productsData, setProductsData] = useState();
    const {isLoading, setLoading} = useLoader();

    useEffect(() => {
        (async () => { 
          setLoading(true);
          try {
            const { data, success } = await request({
              method: "GET",
              endpoint: "/api/products",
            });
            if (success) {
                setProductsData(data);
                setLoading(false);
            } else {
              console.error("something went worng."+success+"-"+data);
            }
          } catch (err) {
            console.error(err);
            setLoading(false);
          }
         
        })();
       
      }, []);

    return (
        <>
        <div>
        {isLoading && <Loader />}
        {!isLoading && productsData && <ProductList value={productsData}/>}
        </div>
        </>
    )
}
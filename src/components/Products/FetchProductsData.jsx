import {restAPICalls} from "../../utils/CallRestAPI";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Loader from "../Loader/Loader";
import {useLoader} from "../../context/loader-context";
import { data as mockProducts } from "../../Database";

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
            } else {
              console.error("No backend available, falling back to local product data.");
              setProductsData(mockProducts);
            }
          } catch (err) {
            console.error(err);
            setProductsData(mockProducts);
          } finally {
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
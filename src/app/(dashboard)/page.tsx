"use client";

import HomePage from "@/components/homePage";
import { DATA_PRODUCTS } from "@/types/api/endpoints";
import axios from "axios";
import React from "react";
import { withReduxPage } from "../hooks/ReduxPage";

function Home() {
  const [dataProducts, setDataProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(DATA_PRODUCTS.GET_PRODUCT_LIST);
      setDataProducts(data);
    };

    fetchData();
  }, []);

  return <HomePage data={dataProducts} />;
}

export default withReduxPage()(Home);

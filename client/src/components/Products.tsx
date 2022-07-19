import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //! TODO este usefect se esta ejecutando dos veces!
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/v1/products?category=${cat}`
            : "http://localhost:5000/api/v1/products"
        );
        setProducts(res.data);
      } catch (err) {
        //TODO completar este catch
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filter).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
  }, [cat, filter, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : // Para poder mostrar los productos en Home page es encesario esto. Esta mostrando los primeros 8 productos que hay en la base de datos, con ningun criterio //TODO modificarlo para mostrar los productos mas relevatnes, mejor vendidos, en oferta o agregar un indice de importancia para mostrar!
          products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;

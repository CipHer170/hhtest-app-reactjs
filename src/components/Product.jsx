import "./Product.scss";

function Product({ items }) {
  return (
    <div className="product">
      <div className="product__container">
        <span>
          <h4>{items?.id}</h4>
          <h3>{items?.brand}</h3>
        </span>
        <h2>{items?.product}</h2>
        <h2>{items?.price}</h2>
      </div>
    </div>
  );
}

export default Product;

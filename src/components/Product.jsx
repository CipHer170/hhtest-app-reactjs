import "./Product.scss";

function Product({ items }) {
  return (
    <div className="product">
      <div className="product__container">
        <h3 className="product__brand">{items?.brand}</h3>
        <h2 className="product__name">{items?.product}</h2>
        <h2 className="product__price">{items?.price}</h2>
      </div>
    </div>
  );
}

export default Product;

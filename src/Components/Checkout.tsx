import { observer } from "mobx-react-lite";
import { useStore } from "../Hooks/useStore";
import { map, sum } from "lodash";

export const Checkout = observer(() => {
  const {
    rootStore: { cartStore },
  } = useStore();
  const totalPrice = sum(map(cartStore.getCarts, (p) => p.price));

  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {cartStore.getCartsCount}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {map(cartStore.getCarts, (p) => (
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{p.title}</h6>
                  <button
                    onClick={() => cartStore.removeProductInCart(p)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
                <span className="text-body-secondary">{p.price}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{totalPrice}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

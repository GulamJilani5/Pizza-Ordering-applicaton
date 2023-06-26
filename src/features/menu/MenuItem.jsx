import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById, increaseItemQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza}) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  //console.log(currentQuantity);

  const isInCart = currentQuantity > 0;

  function handleSubmit(){
    const newItem = {
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem));
    //dispatch(increaseItemQuantity());
  }

  return (
    <li className="flex gap-4 p-2">
      <img className={`h-24 ${soldOut ? 'opacity-70 grayscale':''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm font-medium uppercase text-stone-500">Sold out</p>}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
              <DeleteItem pizzaId={id} />
            </div>
          )}  
         { !soldOut && !isInCart && <Button type='small' onClick={handleSubmit}>Add to Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

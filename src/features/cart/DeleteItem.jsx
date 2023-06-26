import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';


// NOTE- deleteItem and DeleteItem bot are different.
// deleteItem is a reducer functon whereas DeleteItem is a react component
export default function DeleteItem({pizzaId}) {
  const dispatch = useDispatch();
  return (
    <Button type='small' onClick={()=>dispatch(deleteItem(pizzaId))}>Delete</Button>
  )
}

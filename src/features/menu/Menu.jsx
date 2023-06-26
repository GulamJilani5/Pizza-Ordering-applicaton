import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  //const menuD = loader();
  // *********** API url was not working, giving undefned ****************
  //console.log("Menu Data... " + menu); // undefined
  //return <div>Menu Component</div>;
   return (
          <ul className="divide-stone-200 px-2 divide-y"> {menu.map((pizza) => <MenuItem pizza={pizza} key={pizza.id}/>)}</ul>
         );
  }

export async function loader() {
  const menu = await getMenu();
  //console.log("Manu data in loader" + menu);
  //const { id, name, unitPrice } = menu[0];
  //console.log(id, name, unitPrice);
  return menu;
}

export default Menu;

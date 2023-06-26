import { Link } from "react-router-dom"

export default function Button({ children, disabled, to, type,onClick }) {
  
  const base = "bg-yellow-400 text-sm font-semibold transition-colors duration-300 text-stone-800 hover:bg-yellow-300 rounded-full uppercase inline-block tracking-wide focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const style = {
      primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
      round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
      secondary:"font-semibold text-sm transition-colors duration-300 text-stone-800 hover:bg-stone-300 rounded-full uppercase inline-block tracking-wide focus:bg-stone-300 hover:text-stone-800 focus:text-stone-800  focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-5 md:py-3.5"
  }
  if (to)
    return (<Link to={to} className={style[type]}>{ children}</Link>)
   
  if (onClick)
    return (<button onClick={onClick} disabled={disabled} className={style[type]}>{children}</button>)
  
  return (<button disabled={disabled} className={style[type]}>{children}</button>)
  
}
import { useContext } from "uu5g04-hooks";
import Context from "./items-list-context";
//@@viewOff:imports

export function useItemsList() {
  return useContext(Context);
}

export default useItemsList;
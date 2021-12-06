//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef } from "uu5g04-hooks";
import {ItemsListContext} from '../core/itemsList/context/context'
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import Css from "../bricks/item.css";
import Lsi from "../config/lsi.js";
import WelcomeRow from "../bricks/welcome-row.js";

import ItemsList from "../core/itemsList/items-list";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Some",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
  
    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
    .uu5-bricks-header {
      margin-top: 8px;
    }
    
    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const Some = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const modalRef = useRef()
    const [count, setCount] = useState(2)
    const [itemList, setItemList] = useState([
      {
        id: 1,
        name: "Name 1",
        desc: "Some desc 1",
        rate: 4,
      },
      {
        id: 2,
        name: "Name 2",
        desc: "Some desc 2",
        rate: 2,
      },
      {
        id: 3,
        name: "Name 3",
        desc: "Some desc 3",
        rate: 3,
      },
      {
        id: 4,
        name: "Name 4",
        desc: "Some desc 4",
        rate: 4,
      },
      {
        id: 5,
        name: "Name 5",
        desc: "Some desc 5",
        rate: 5,
      },
    ]);

    const handleAdd =()=>{
      const newItem = {
        id: UU5.Common.Tools.generateUUID(),
        name: "Name",
        desc: "Some desc ",
        rate: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      }
      setItemList(itemList=> [newItem, ...itemList])
    }

    const handleChangeCount = () =>{
      setCount(prev=> prev+2)
    }

    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <ItemsListContext.Provider value={itemList}>
        <UU5.Bricks.Container className={Css.main()}>
          <UU5.Bricks.Header level="1" content="Items"/>
          <UU5.Bricks.Button colorSchema="green" bgStyle="outline" content="+ item" onClick={handleAdd}/>
          <ItemsList setCount={setCount} count={count} setItemList ={setItemList} modal={modalRef}/>
          {itemList.length>count
            ?<UU5.Bricks.Button content="More items" onClick={handleChangeCount} colorSchema="cyan" bgStyle="outline"/>
            : null}
         <UU5.Bricks.Modal ref_={modalRef}/>
        </UU5.Bricks.Container>
      </ItemsListContext.Provider>
    );
    //@@viewOff:render
  },
});

export default Some;

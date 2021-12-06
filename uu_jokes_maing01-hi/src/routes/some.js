//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import Css from "../bricks/item.css";
import Lsi from "../config/lsi.js";
import WelcomeRow from "../bricks/welcome-row.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
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

    const handleDelete =(item)=>{
      setItemList(itemList => itemList.filter(it => it.id !== item.id))
      if(itemList.length<=2){
        setCount(2)
      }
    }
    const handleChangeCount = () =>{
      setCount(prev=> prev+2)
    }

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    // const handleDelete= (id)=>{
    //   const newList = itemList.filter(item => item.id !== id)
    //   console.log(newList)
    // }
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <UU5.Bricks.Container className={Css.main()}>
      {/* // <div {...attrs} className={Css.main()}> */}
         <UU5.Bricks.Header level="1" content="Items"/>
         <UU5.Bricks.Button colorSchema="green" bgStyle="outline" content="+ item" onClick={handleAdd}/>
         <UU5.Bricks.Ul type="none" className={Css.list()}>
        {itemList.slice(0, count).map(item=> (
          <UU5.Bricks.Li key={item.id} className={Css.item()}>
            <UU5.Bricks.Card className="uu5-common-padding-s" width={800}>
            <UU5.Bricks.Header colorSchema="cyan"  content={item.name} level="6"/>
            <UU5.Bricks.Text content={item.desc}/>
            <UU5.Bricks.Rating value={item.rate} />
            <UU5.Bricks.Button colorSchema="red" bgStyle="outline" onClick={() => handleDelete(item)} className={Css.deleteBtn()}><UU5.Bricks.Icon icon="plus4u-bin"/></UU5.Bricks.Button>
            </UU5.Bricks.Card>
          </UU5.Bricks.Li>
         ) )}
        </UU5.Bricks.Ul>
        {itemList.length>count
          ?<UU5.Bricks.Button content="More items" onClick={handleChangeCount} colorSchema="cyan" bgStyle="outline"/>
          : null}
      {/* </div> */}
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default Some;

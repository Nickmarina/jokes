//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent} from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import {useItemsList} from "./context/context.js";

import Config from "../../config/config.js";
import Css from "../../bricks/item.css";
import Lsi from "../../config/lsi.js";
import WelcomeRow from "../../bricks/welcome-row.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ItemsList",
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

export const ItemsList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    setItemList: UU5.PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const itemList = useItemsList()

    const handleDelete =(item)=>{
      props.setItemList(itemList => itemList.filter(it => it.id !== item.id))
      if(itemList.length<=2){
       props.setCount(2)
      }
    }

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    // const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
        <UU5.Bricks.Ul type="none" className={Css.list()}>
        
        {itemList.slice(0, props.count).map(item=> (
          
          <UU5.Bricks.Li key={item.id} className={Css.item()}>
           
            <UU5.Bricks.Card className="uu5-common-padding-s" width={800}>
            <UU5.Bricks.Header colorSchema="cyan"  content={item.name} level="6"/>

           <UU5.Bricks.Button
          content={item.desc}
          onClick={() => Page.modal.open({
            header: "Header",
            footer: "Footer",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis urna vel ex interdum, nec auctor mauris sollicitudin. Vivamus ut erat massa. Aenean placerat orci in erat aliquet, in molestie sem sagittis. Quisque euismod est nulla, ut gravida lorem molestie non. Duis vitae augue id eros euismod condimentum vitae gravida lacus. Aliquam erat volutpat."
          })}
        />

            <UU5.Bricks.Text content={item.desc}/>
            <UU5.Bricks.Rating value={item.rate} />
            <UU5.Bricks.Button colorSchema="red" bgStyle="outline" onClick={() => handleDelete(item)} className={Css.deleteBtn()}><UU5.Bricks.Icon icon="plus4u-bin"/></UU5.Bricks.Button>
            </UU5.Bricks.Card>
          </UU5.Bricks.Li>
         ) )}
        </UU5.Bricks.Ul>
    );
    //@@viewOff:render
  },
});

export default ItemsList;

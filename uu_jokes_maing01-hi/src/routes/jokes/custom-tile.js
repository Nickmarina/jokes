//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CustomTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const CustomTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const {data: joke} = props
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );

    return currentNestingLevel ? (
      <div {...attrs}>
        {/* <div>Visual Component {STATICS.displayName}</div>
        {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
        {props.data&& JSON.stringify(props.data)} */}
        <UU5.Bricks.Card width={250} className="uu5-common-padding-s"> 
        <UU5.Bricks.Header content={joke?.data?.name} level="5"/>
        <UU5.Bricks.Text content={joke?.data?.uuIdentityName}/>
        <UU5.Bricks.Button colorSchema="cyan"  bgStyle="outline" onClick={()=> props.handleOpenDetailsModal(joke?.data)} ><UU5.Bricks.Icon icon="plus4u-attachment"/></UU5.Bricks.Button> 
        <UU5.Bricks.Button colorSchema="red" bgStyle="outline" ><UU5.Bricks.Icon icon="plus4u-bin"/></UU5.Bricks.Button> </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default CustomTile;
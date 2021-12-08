//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";

import CustomTile from "./custom-tile";
import { useContextModal } from "./common/modal-manager";
import {useJoke} from './context/use-joke';
import { JokeUpdateHeader, JokeUpdateControls, JokeUpdateForm } from "./joke-update-form/joke-update-form";


//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tiles",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Tiles = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
 

    const [open, close, showAlert, getConfirmRef] = useContextModal()
    const {data, handlerMap} = useJoke()
    //@@viewOn:private
    function handleOpenDetailsModal(data) {
      open({
        header:<JokeUpdateHeader/>,
        content: <JokeUpdateForm data={data} closeModal={close}  showAlert={showAlert}/>,
        footer:<JokeUpdateControls/>
      });
    }

    function handleOpenCreateModal() {
      open({
        header: <JokeUpdateHeader />,
        content: <JokeUpdateForm isCreateForm={true} handlerMap={handlerMap} closeModal={close} showAlert={showAlert} />,
        footer: <JokeUpdateControls isCreateForm={true} />,
      });
    }

    function handleItemSearch(item, value) {
      let fragments = value.split(/[\s,.-;:_]/);
      return fragments.some((frag) => {
        return item.data.name.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    }
    
    const getActions = () => [
      {
        active: true,
        icon: "mdi-plus-circle",
        content: "Add",
        colorSchema: "green",
        bgStyle: "outline",
        onClick: handleOpenCreateModal,
      },
    ]
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
      <Uu5Tiles.ControllerProvider
        data={data}
      >
        <Uu5Tiles.ActionBar
          onItemSearch={handleItemSearch}
          actions={getActions()}
        />
        <Uu5Tiles.Grid
          tileMinWidth={200}
          tileMaxWidth={400}
          tileSpacing={8}
          rowSpacing={8}
        >
          <CustomTile  handleOpenDetailsModal={handleOpenDetailsModal} getConfirmRef={getConfirmRef}/>
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});


export default Tiles;

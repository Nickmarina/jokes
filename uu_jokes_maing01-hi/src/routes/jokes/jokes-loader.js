//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createComponent, useState, useDataList, useRef } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import Calls from "../../calls";
import Config from "../config/config.js";
import Lsi from "../../config/lsi.js";
import Uu5Tiles from "uu5tilesg02";
import CustomTile from "./custom-tile";
import DataListStateResolver from "./common/data-list-state-resolver";
import {ModalManager} from './common/modal-manager' 
import Tiles  from "./Tiles";
import JokeContext from './context/joke-context'

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeLoader",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  // welcomeRow: () => Config.Css.css`
  //   padding: 56px 0 20px;
  //   max-width: 624px;
  //   margin: 0 auto;
  //   text-align: center;
  
  //   ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
  //   .uu5-bricks-header {
  //     margin-top: 8px;
  //   }
    
  //   .plus4u5-bricks-user-photo {
  //     margin: 0 auto;
  //   }
  // `,
};

export const JokesLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.jokeList,
      },
      itemHandlerMap: {
        update: Calls.jokeUpdate,
        delete: Calls.jokeDelete,
      }
    });
    
    return (
       <JokeContext.Provider value={dataListResult}>{props.children}</JokeContext.Provider>
    );
    //@@viewOff:render
  },
});

export default JokesLoader;

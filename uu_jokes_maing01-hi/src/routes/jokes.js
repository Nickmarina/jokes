//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useDataList, useRef } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import Calls from "../calls";
import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import Uu5Tiles from "uu5tilesg02";
import CustomTile from "./jokes/custom-tile";
import DataListStateResolver from "./jokes/common/data-list-state-resolver";
import {ModalManager} from './jokes/common/modal-manager' 
import Tiles  from "./jokes/Tiles";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Some",
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

export const Jokes = createVisualComponent({
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
      itemHandlerMap: {}
    });
    
    console.log("dataListResult",dataListResult)
    const {data,handlerMap} = dataListResult;
      // skipInitialLoad: false,
      // initialDtoIn: undefined,
      // initialData: undefined, // [{"name":"A0 Skydiving","text":"Why don't blind people skydive? Because it scares the crap out of their dogs.","averageRating":0,"ratingCount":0,"visibility":false,"uuIdentity":"127-0000-0000-1","uuIdentityName":"Milan Šatka","awid":"4ef6a7b01b5942ecbfb925b249af987f","categoryList":[],"sys":{"cts":"2020-06-09T08:23:30.699Z","mts":"2020-06-09T08:23:30.699Z","rev":0},"id":"5edf47021d5ce800255e7000","uuAppErrorMap":{}}]

    return (
        <ModalManager>
          <DataListStateResolver dataList={dataListResult}>
            <Tiles data={data}/>
            </DataListStateResolver>
        </ModalManager>
    );
    //@@viewOff:render
  },
});

export default Jokes;

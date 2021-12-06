import Config from "./config/config";

const main = () => Config.Css.css`
  height: 100%;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  padding: 20px;
  margin: 50px;
`;

const list =() => Config.Css.css `
    display:flex;
    flex-direction: column;
`;

const item =() => Config.Css.css `
    padding: 10px;
    margin-bottom: 10px; 
`;
const deleteBtn =() => Config.Css.css `
  display:block;
  margin-left: auto;
  width: 40px;
  height: 40px;
`;

const moreInfoBtn =() => Config.Css.css `
  display:block;

`;

export default {
    main,
    list,
    item,
    deleteBtn,
    moreInfoBtn
  };
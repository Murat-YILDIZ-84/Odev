import { useState } from "react";
import { createRoot } from "react-dom/client";
import Update from "./Update";
import "./Config";
import "./styles.css";

//For Test Sample Data
import info from "./Info.json";

function App() {
  const FirstNode = () => {
    //Get Test Sample Data
    data = info.response.scriptResult;
    //data = global.Config.response.scriptResult;

    //First Filtering
    let sign1 = [0];
    let column1 = [data[0].sub0];
    let column2 = [data[0].debt];

    for (let i = 1; i < Object.keys(data).length; i++) {
      if (data[i].sub0 == column1[column1.length - 1]) {
        sign1[sign1.length - 1] = 1;
      } else {
        sign1.push(0);
        column1.push(data[i].sub0);
        column2.push(data[i].debt);
      }
    }

    return column1.map((item, i) => (
      <tr>
        <td>{sign1[i] == 1 ? <FirstButton item={item} index={i} /> : ""}</td>
        <td>{item}</td>
        <td>{column2[i]}</td>
      </tr>
    ));
  };

  const FirstButton = (params) => {
    const { item, index } = params;
    const [sign1, setSign] = useState("+");
    const ButtonClick = () => {
      setSign(sign1 == "+" ? "-" : "+");
      SecondNode([sign1, item, index]);
    };

    return <button onClick={ButtonClick}>{sign1}</button>;
  };

  const SecondNode = (params) => {
    //alert("Test6");
    const [sign1, item, index] = [params[0], params[1], params[2]];
    //alert(sign1 + " ; " + item + " ; " + index);

    //Get Test Sample Data
    data = info.response.scriptResult;
    //data = global.Config.response.scriptResult;

    //Second Filtering
    let sign2 = "";
    let column1 = "";
    let column2 = 0;

    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].sub0 == item && data[i].sub1 != 0) {
        if (column1 == "") {
          sign2 = "";
          column1 = item + "." + data[i].sub1.toString().padStart(2, "0");
        } else {
          sign2 = "+";
        }
        column2 = column2 + data[i].debt;
        alert(column1 + " ; " + column2);
      }
    }

    //alert(sign2);
    //alert(column2);
  };

  return (
    <div className="App">
      <div>
        <button disabled>Update</button>
        <span> Status : </span>
        <Update />
      </div>
      <table>
        <tr>
          <th></th>
          <th>Hesap Kodu</th>
          <th>Toplam Borç</th>
        </tr>
        {FirstNode()}
      </table>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

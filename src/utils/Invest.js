import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { calculateInvestmentResults, formatter } from "../utils/investment";

const Invest = () => {
  const [data, setData] = useState({
    initialInvestment: 15000,
    annualInvestment: 900,
    expectedReturn: 5.5,
    duration: 10,
  });
  // const [consol, setConsol] = useState([]);

  const resultData = calculateInvestmentResults(data);
  console.log(resultData)
    const initialInvestment = 
  resultData[0].valueEndOfYear -
  resultData[0].interest -
  resultData[0].annualInvestment;
  function handleChange(inputIdentifier,newvalue) {
    // console.log(e.target.value);

    // const name = e.target.name;
    // const value = e.target.value;
    setData((preData) => {
      return {
        ...preData,
        [inputIdentifier]: +newvalue,
      };
    });
  }
  

  function handleClick() {
    // setConsol([...consol, {id:consol.length + 1,
    //   initialInvestment: data.initialInvestment,
    //   annualInvestment: data.annualInvestment,
    //   expectedReturn: data.expectedReturn,
    //   duration: data.duration
    // }]);
  }

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <Input
          //   defaultValue="foo"
          placeholder="INITIAL INVESTEMENT"
          name="initialInvestment"
          value={data.initialInvestment}
          onChange={(event) => handleChange('initialInvestment',event.target.value)}
        />
        <Input
          name="annualInvestment"
          value={data.annualInvestment}
          onChange={(event) => handleChange('annualInvestment',event.target.value)}
          placeholder="ANNUAL INVESTEMENT"
        />
        <Input
          name="expectedReturn"
          value={data.expectedReturn}
          onChange={(event) => handleChange('expectedReturn',event.target.value)}
          placeholder="EXPECTED RETURN"
        />
        <Input
          name="duration"
          value={data.duration}
          onChange={(event) => handleChange('duration',event.target.value)}
          placeholder="DURATION"
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
          sx={{ backgroundColor: "black", marginTop: "10px" }}
        >
          +
        </Button>
      </div>
      <section style={{ justifyContent: "center",display:"flex" }}>
        <table border="1" >
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (year)</th>
            <th>total Interest</th>
            <th>Invested Capital</th>
          </tr>
          {resultData.map((val) => {
            const totalInterest =
              val.valueEndOfYear -
              val.annualInvestment * val.year -
              initialInvestment;

            const totalAmountInvested = val.valueEndOfYear - totalInterest;
            return (
              <tr key={val.year}>
                <td>{val.year}</td>
                <td>{formatter.format(val.valueEndOfYear)}</td>
                <td>{formatter.format(val.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmountInvested)}</td>
              </tr>
            );
          })}
        </table>
      </section>
    </>
  );
};

export default Invest;

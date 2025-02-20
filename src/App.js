import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const transactions = [
    { customerid: 2, amount: 50, date: "2025-02-10" },
    { customerid: 2, amount: 60, date: "2025-02-25" },
    { customerid: 1, amount: 20, date: "2025-03-15" },
    { customerid: 3, amount: 10, date: "2025-03-05" },
    { customerid: 3, amount: 20, date: "2025-03-25" },
  ];
  const claculatePoint = (amount) => {
    if (amount <= 50) return 0;
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      amount = 100;
    }
    points += Math.max(0, amount - 50);
    return points;
  };
  const [rewardPoint, setRewrdPoins] = useState({});
  useEffect(() => {
    const pointsdata = {};
    transactions.forEach((transaction) => {
      const { customerid, amount, date } = transaction;

      const monthYear = new Date(date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      const points = claculatePoint(amount);
      if (!pointsdata[customerid]) {
        pointsdata[customerid] = { total: 0, months: {} };
      }

      if (!pointsdata[customerid].months[monthYear]) {
        pointsdata[customerid].months[monthYear] = 0;
      }
      pointsdata[customerid].months[monthYear] += points;

      pointsdata[customerid].total += points;
    });

    setRewrdPoins(pointsdata);
  }, []);
  return (
    <div className="App">
      {Object.keys(rewardPoint).map((customerid) => {
        const customer = rewardPoint[customerid];
        return (
          <div key={customerid}>
            <h2>CUSTOMER{customerid}</h2>
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(customer.months).map((month) => (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>{customer.months[month]}</td>
                  </tr>
                ))}
                <tr>
                  <td>TOTAL {customer.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

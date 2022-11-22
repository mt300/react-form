import { useEffect, useState } from "react";
import { City } from "../../types/types";
import { BarChart } from "../BarChart";
import { DonutChart } from "../DonutChart";
import { Recommendations } from "../Recommendations";
import "./styles.css";

export function Dashboard() {
  const [ cities, setCities ] = useState<City[]>([]);

  useEffect(() => {
    fetch('http://localhost:5173/api/cities')
    .then(response => response.json())
    .then(data => setCities(data))
  }, [])
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <Recommendations />
        <div className="charts-container">
          <BarChart cities={cities} />
          <DonutChart cities={cities} />
        </div>
      </div>
    </div>
  );
}

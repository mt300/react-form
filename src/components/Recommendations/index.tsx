import { useEffect, useState } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";

import "./styles.css";

type Recommendation = {
  id: number,
  image: string,
  name: string,
  address: string,
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    fetch("http://localhost:5173/api/recommendations")
    .then(response => response.json())
    .then(data => setRecommendations(data))
  }, [])

  return (
    <section className="recommendations-container">
      <header className="recommendations-header">
        <h3>RECOMENDAÇÕES COM BASE EM SEU PERFIL</h3>
        <BsArrowDownCircleFill className="recommendations-arrow" />
      </header>
      <main className="recommendations-main">
        {recommendations.map((e) => (
          <div key={e.id} className="card">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={e.image} alt="house" />
                  </td>
                  <td>{e.name}</td>
                  <td>{e.id}</td>
                  <td>{e.address}</td>
                  <td>
                    <button type="button">Saiba mais</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </section>
  );
}

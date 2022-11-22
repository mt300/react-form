import { createServer, Factory, Model } from "miragejs";
import { faker } from '@faker-js/faker';
import { citiesDataTest, recommendationsDataTest } from "../../globalData";
import { City, RealState, User } from "../../types/types";

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
      realState: Model.extend<Partial<RealState>>({}),
      city: Model.extend<Partial<City>>({}),
    },

    factories: {
      user: Factory.extend({
        id(i: number) {
          return i + 1;
        },
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        phone() {
          return (`(91)${Math.pow(9, 8)}`);
        },
      }),

      realState: Factory.extend({
        id(i: number) {
          return i + 1;
        },
        category(i: number) {
          const categoryList = ["casa", "apto.", "residencial", "casa", "apto."];
          return categoryList[i];
        },
        description() {
          const description = ["1 sala, 3/4, 1 banheiro, sem garagem"]
          return description[0];
        },
        address() {
          const address = ["Rua das orquídeas, n° 53, Parque Verde, Nova Marabá"]
          return address[0];
        },
        value(i: number) {
          const values = [2000, 5000, 100.000, 200.000, 500.000]
          return `R$ ${values[i]},00`;
        }
      })
    },

    seeds(server) {
      server.createList('user', 5);
      server.createList('realState', 4)
    },

    routes() {
      this.namespace = "api";
      this.post("/login", (schema, request) => {
        const credentials = JSON.parse(request.requestBody);

        if (
          credentials.email === "sir.costa@yahoo.com.br" &&
          credentials.password === "123"
        ) {
          return {
            status: 200,
            message: "Loggin Successfully",
          };
        } else {
          return {
            status: 401,
            message: "Invalid credentials",
          };
        }
      });

      this.get('/users');
      this.delete('/users/:id', (schema, request) => {
        let id = request.params.id

        return schema.users.find(id).destroy();
      });

      this.get('/real-states');
      this.delete('/real-states/:id', (schema, request) => {
        let id = request.params.id

        return schema.realStates.find(id).destroy();
      });

      this.get('/cities', (schema, request) => {
        return citiesDataTest;
      });

      this.get("/recommendations", (schema, request) => {
        return recommendationsDataTest;
      });

      this.namespace = '';
      this.passthrough('http://localhost:8080/**');
    },
  });
  return server;
}

import { Route, Switch } from "wouter";
import Home from "./HomePage";
import NasaTLX from "./NasaTLX";
import Fundamentos from "./fundamentos";
import Copsoq from "./Copsoq";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nasatlx" component={NasaTLX} />
      <Route path="/fundamentos" component={Fundamentos} />
      <Route path="/Copsoq" component={Copsoq} />
      <Route>
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
          <h1>404 - Página não encontrada</h1>
          <a href="/">Voltar para o início</a>
        </div>
      </Route>
    </Switch>
  );
}
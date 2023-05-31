import receipt from "../assets/receipt.png";
import ContainerCentered from "../components/ContainerCentered";

function Home() {
    return (
        <ContainerCentered>
            <img src={receipt} style={{ maxWidth: "400px" }} alt="Recibo" />
            <p className="fs-1 fst-italic fw-bold text-secondary opacity-75">"Facturas para los freelancer hechos a medida"</p>
        </ContainerCentered>
    )
}

export default Home;

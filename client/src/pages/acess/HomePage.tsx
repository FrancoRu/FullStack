import { useNavigate } from "react-router-dom";
import { Text } from "../../component/Text";
import { useAuth } from "../../context/auth/useAuth.Context";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/project");
  }
  return (
    <div>
      <article>
        <Text />
      </article>
      <div className="w-100 d-flex justify-content-center">
        <section className="carrusel justify-content-center">
          <img
            src="../public/img/React.png"
            alt="Imagen de react"
            title="icono del framework de ReactJs"
          />
          <img
            src="../public/img/TypeScript.webp"
            alt="Imagen de Typescript"
            title="Icono del Framework de tipado de JavasScript Typescript"
          />

          <img
            src="../public/img/MongoDb.png"
            alt="Imagen de MongoDB"
            title="Icono de MongoDB"
          />
          <img
            src="../public/img/ExpressJS.webp"
            alt="Imagen de ExpressJS"
            title="Icone del framework de nodeJS ExpressJS"
          />
        </section>
      </div>
    </div>
  );
}
export default HomePage;

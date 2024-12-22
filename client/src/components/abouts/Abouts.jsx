import React from "react";
import AboutHeader from "../abouts/aboutHeader/AboutHeader";
import CardSection from "../abouts/cardSection/Cardection";
import QuoteBlock from "../abouts/quoteBlock/QuoteBlock";

const About = () => (
  <div className="row">
    <AboutHeader />
    <div className="col-12 col-md-8 mx-auto">
      <CardSection
        imgSrc="https://www.fennixdistribuidora.com.br/wp-content/uploads/2021/09/distribuidora-de-alimentos.png"
        imgAlt="Imagen representativa de la empresa"
        title="Distri App: Innovación en Distribución"
      >
        <p className="card-text">
          Distri App nació en 2015 con una misión clara: revolucionar la forma
          en que las empresas gestionan sus operaciones de distribución y
          logística. Fundada por un equipo de expertos en tecnología y
          logística, nuestra empresa ha crecido de manera constante, enfocándose
          en ofrecer soluciones tecnológicas a medida para cada uno de nuestros
          clientes.
        </p>
        <p className="card-text">
          Desde el principio, Distri App se ha comprometido a crear plataformas
          eficientes que optimicen los procesos, reduzcan costos y aumenten la
          productividad. Con nuestra visión innovadora y un enfoque centrado en
          el cliente, hemos logrado transformar la industria, conectando a
          distribuidores y proveedores con un sistema más ágil y transparente.
        </p>
        <p className="card-text">
          Hoy en día, Distri App cuenta con una amplia red de clientes
          satisfechos en diferentes sectores, y continuamos avanzando hacia un
          futuro lleno de nuevas oportunidades para seguir liderando el mercado.
        </p>
      </CardSection>
      <QuoteBlock text="“Nuestra misión es hacer la distribución más inteligente y accesible para todos.” – Equipo Distri App" />
    </div>
  </div>
);

export default About;

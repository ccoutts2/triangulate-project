import "./home.scss";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <section className="home-page__red-boxes">
        <div className="home-page__boxes-col-1">
          <div className="home-page__box-1"></div>
          <div className="home-page__box-2"></div>
        </div>
        <div className="home-page__boxes-col-2">
          <div className="home-page__box-3"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;

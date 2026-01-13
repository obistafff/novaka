export default function Carte() {
  return (
    <div className="page-carte">
      <section className="menu-hero">
        <div className="container menu-hero-container">
          <div className="menu-hero-content">
            <h1 className="menu-title">Notre Carte</h1>
            <p className="menu-subtitle">
              Des saveurs authentiques pour tous les moments
            </p>
          </div>

          <div className="menu-hero-image">
            <img
              src="/img/img4.jpg"
              alt="Carte des cafés Nokava"
              className="menu-hero-img"
            />
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container featured-container">
          <div className="featured-image">
            <img
              src="/img/img5.jpg"
              alt="Café du mois"
              className="featured-img"
            />
          </div>

          <div className="featured-content">
            <h2 className="featured-title">Café du Mois</h2>
            <h3 className="featured-name">Moka des Hautes Terres</h3>
            <p className="featured-description">
              Un café d'exception aux notes chocolatées et épicées, cultivé à
              1800m d'altitude dans les montagnes d'Éthiopie. Sa torréfaction
              artisanale révèle des arômes complexes de cacao, de cannelle et de
              fruits rouges.
            </p>

            <div className="featured-details">
              <div className="detail-item">
                <span className="detail-label">Origine :</span>
                <span className="detail-value">Région de Sidama, Éthiopie</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Altitude :</span>
                <span className="detail-value">1800m</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Notes :</span>
                <span className="detail-value">
                  Chocolat, cannelle, fruits rouges
                </span>
              </div>
            </div>

            <div className="featured-price">
              <span className="price-label">À partir de</span>
              <span className="price-value">4,50€</span>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-categories">
        <div className="container">
          <div className="category-header">
            <img src="/img/img6.jpg" alt="Nos Cafés" className="category-image" />
            <div className="category-title-group">
              <h2 className="category-title">Nos Cafés</h2>
              <p className="category-subtitle">
                Sélection de cafés d'exception, préparés avec passion
              </p>
            </div>
          </div>

          <div className="menu-grid">
            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Espresso</h3>
                <span className="menu-card-price">2,80€</span>
              </div>
              <p className="menu-card-desc">
                L'essence pure du café, corsé et aromatique
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Cappuccino</h3>
                <span className="menu-card-price">4,20€</span>
              </div>
              <p className="menu-card-desc">
                Espresso onctueux couronné de mousse de lait veloutée
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Latte</h3>
                <span className="menu-card-price">4,50€</span>
              </div>
              <p className="menu-card-desc">
                Café au lait généreux avec un soupçon de mousse délicate
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Americano</h3>
                <span className="menu-card-price">3,20€</span>
              </div>
              <p className="menu-card-desc">
                Espresso allongé d'eau chaude, doux et équilibré
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Macchiato</h3>
                <span className="menu-card-price">3,80€</span>
              </div>
              <p className="menu-card-desc">
                Espresso “taché” d’une cuillère de mousse de lait
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Café Filtre</h3>
                <span className="menu-card-price">3,50€</span>
              </div>
              <p className="menu-card-desc">
                Méthode douce révélant la subtilité de nos origines
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="menu-categories">
        <div className="container">
          <div className="category-header">
            <img
              src="/img/img7.jpg"
              alt="Thés & Infusions"
              className="category-image"
            />
            <div className="category-title-group">
              <h2 className="category-title">Thés & Infusions</h2>
              <p className="category-subtitle">
                Une sélection raffinée pour tous les goûts
              </p>
            </div>
          </div>

          <div className="menu-grid">
            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Thé Earl Grey</h3>
                <span className="menu-card-price">3,80€</span>
              </div>
              <p className="menu-card-desc">
                Thé noir parfumé à la bergamote, un grand classique
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Thé Vert Jasmin</h3>
                <span className="menu-card-price">4,00€</span>
              </div>
              <p className="menu-card-desc">
                Thé vert délicat aux notes florales apaisantes
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Rooibos Vanille</h3>
                <span className="menu-card-price">3,60€</span>
              </div>
              <p className="menu-card-desc">
                Infusion sans théine, douce et réconfortante
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Tisane Camomille</h3>
                <span className="menu-card-price">3,40€</span>
              </div>
              <p className="menu-card-desc">
                Infusion relaxante aux vertus apaisantes
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Chai Épicé</h3>
                <span className="menu-card-price">4,20€</span>
              </div>
              <p className="menu-card-desc">
                Mélange traditionnel aux épices réchauffantes
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Thé Blanc Pêche</h3>
                <span className="menu-card-price">4,50€</span>
              </div>
              <p className="menu-card-desc">
                Thé rare aux saveurs fruitées et délicates
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="menu-categories">
        <div className="container">
          <div className="category-header">
            <img
              src="/img/img8.jpg"
              alt="Pâtisseries & Snacks"
              className="category-image"
            />
            <div className="category-title-group">
              <h2 className="category-title">Pâtisseries & Snacks</h2>
              <p className="category-subtitle">
                Gourmandises artisanales pour accompagner vos boissons
              </p>
            </div>
          </div>

          <div className="menu-grid">
            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Croissant Artisanale</h3>
                <span className="menu-card-price">2,20€</span>
              </div>
              <p className="menu-card-desc">
                Viennoiserie dorée et croustillante, préparée chaque matin
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Muffin Myrtilles</h3>
                <span className="menu-card-price">3,50€</span>
              </div>
              <p className="menu-card-desc">
                Moelleux aux myrtilles fraîches, recette maison
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Cheesecake New York</h3>
                <span className="menu-card-price">5,20€</span>
              </div>
              <p className="menu-card-desc">
                Crémeux et onctueux, coulis de fruits rouges
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Cookie Chocolat</h3>
                <span className="menu-card-price">2,80€</span>
              </div>
              <p className="menu-card-desc">
                Biscuit moelleux aux pépites de chocolat noir
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Sandwich Club</h3>
                <span className="menu-card-price">8,50€</span>
              </div>
              <p className="menu-card-desc">
                Pain de mie, poulet, avocat, tomate, salade fraîche
              </p>
            </article>

            <article className="menu-card">
              <div className="menu-card-header">
                <h3 className="menu-card-title">Quiche Lorraine</h3>
                <span className="menu-card-price">6,80€</span>
              </div>
              <p className="menu-card-desc">
                Pâte brisée, appareil aux œufs, lardons fumés
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="origins-section">
        <div className="container">
          <h2 className="origins-title">Nos Origines</h2>
          <div className="origins-grid">
            <article className="origin-card">
              <img src="/img/img9.jpg" alt="Brésil" className="origin-img" />
              <div className="origin-content">
                <h3 className="origin-name">Brésil - Cerrado</h3>
                <p className="origin-desc">
                  Notes de noisette et chocolat, corps rond et équilibré.
                </p>
                <div className="origin-tags">
                  <span className="tag">Équilibré</span>
                  <span className="tag">Chocolaté</span>
                </div>
              </div>
            </article>

            <article className="origin-card">
              <img src="/img/img10.jpg" alt="Colombie" className="origin-img" />
              <div className="origin-content">
                <h3 className="origin-name">Colombie - Huila</h3>
                <p className="origin-desc">
                  Acidité vive et fruitée, notes florales.
                </p>
                <div className="origin-tags">
                  <span className="tag">Fruité</span>
                  <span className="tag">Acidulé</span>
                </div>
              </div>
            </article>

            <article className="origin-card">
              <img src="/img/img11.jpg" alt="Éthiopie" className="origin-img" />
              <div className="origin-content">
                <h3 className="origin-name">Éthiopie - Sidama</h3>
                <p className="origin-desc">
                  Berceau du café, profil complexe aux notes florales.
                </p>
                <div className="origin-tags">
                  <span className="tag">Floral</span>
                  <span className="tag">Complexe</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

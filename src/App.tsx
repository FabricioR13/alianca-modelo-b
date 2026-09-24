import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Intervenção comportamental",
    description:
      "Estratégias individualizadas, construídas a partir do brincar, para ampliar habilidades e favorecer novas descobertas no dia a dia.",
    image: asset("images/terapia-comportamental.jpg"),
    alt: "Terapeuta e criança brincando com blocos durante um atendimento",
  },
  {
    number: "02",
    title: "Orientação familiar",
    description:
      "Uma parceria próxima com quem cuida, com escuta e orientações que ajudam a levar o desenvolvimento para além da clínica.",
    image: asset("images/orientacao-familiar.jpg"),
    alt: "Família compartilhando um momento de brincadeira com a criança",
  },
  {
    number: "03",
    title: "Desenvolvimento infantil",
    description:
      "Experiências lúdicas que respeitam o tempo de cada criança e apoiam sua autonomia, comunicação e participação no mundo.",
    image: asset("images/desenvolvimento-infantil.jpg"),
    alt: "Criança explorando brinquedos sensoriais com acompanhamento de terapeuta",
  },
];

const questions = [
  {
    question: "Como começa o acompanhamento?",
    answer:
      "Tudo começa com uma conversa para conhecermos a criança, sua família e o que é importante para vocês. A partir dessa escuta, pensamos juntos nos próximos passos.",
  },
  {
    question: "A família participa do processo?",
    answer:
      "Sim. Acreditamos que a parceria com a família faz parte do cuidado. Compartilhamos orientações e construímos caminhos que também façam sentido na rotina de casa.",
  },
  {
    question: "O cuidado é igual para todas as crianças?",
    answer:
      "Não. Cada criança tem interesses, necessidades e um ritmo próprios. Por isso, o acompanhamento é pensado de forma individualizada e revisto ao longo do percurso.",
  },
];

// Substitute the clinic's official email before publishing the page.
const CONTACT_EMAIL = "contato@clinicaalianca.com.br";

function BrandMark({ className = "" }: { className?: string }) {
  return <img className={className} src={asset("images/logo-alianca.png")} alt="" aria-hidden="true" />;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${light ? "brand--light" : ""}`} aria-label="Aliança, voltar ao início">
      <BrandMark className="brand__mark" />
      <span className="brand__text">
        <strong>aliança</strong>
        <small>clínica comportamental</small>
      </span>
    </a>
  );
}

export default function App() {
  const [activeService, setActiveService] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
      );
      elements.forEach((element) => observer.observe(element));
      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }

    elements.forEach((element) => element.classList.add("is-visible"));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    services.forEach((service) => {
      const image = new Image();
      image.src = service.image;
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject = encodeURIComponent(`Primeira conversa com a Aliança - ${name}`);
    const body = encodeURIComponent(
      `Olá, equipe Aliança!\n\nMeu nome é ${name} e meu e-mail é ${email}.\n\nGostaria de conversar sobre:\n${message}\n\nObrigada(o)!`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setEmailOpened(true);
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled || menuOpen ? "site-header--scrolled" : ""}`}>
        <div className="container site-header__inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#sobre">A Aliança</a>
            <a href="#caminhos">Nossos cuidados</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="header-cta" href="#contato">
            Vamos conversar <ArrowUpRight size={17} strokeWidth={1.8} />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? <X size={25} strokeWidth={1.7} /> : <Menu size={25} strokeWidth={1.7} />}
          </button>
        </div>

        <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} aria-label="Navegação para celular">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>A Aliança</a>
          <a href="#caminhos" onClick={() => setMenuOpen(false)}>Nossos cuidados</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
          <a className="mobile-nav__contact" href="#contato" onClick={() => setMenuOpen(false)}>
            Vamos conversar <ArrowUpRight size={22} />
          </a>
          <BrandMark className="mobile-nav__mark" />
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__image" aria-hidden="true" />
          <div className="hero__veil" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="hero__content">
              <p className="hero__eyebrow"><span /> Clínica comportamental infantil</p>
              <h1 id="hero-title" className="hero__brand">Aliança<span aria-hidden="true">.</span></h1>
              <p className="hero__statement">Onde o cuidado encontra <em>cada jeito de ser.</em></p>
              <p className="hero__description">
                Um espaço de acolhimento e desenvolvimento para crianças e famílias, feito de escuta, afeto e ciência.
              </p>
              <div className="hero__actions">
                <a className="button button--coral" href="#contato">
                  Vamos conversar <ArrowUpRight size={19} strokeWidth={1.8} />
                </a>
                <a className="inline-link" href="#sobre">
                  Conheça a Aliança <ArrowRight size={18} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="about section-pad" id="sobre" aria-labelledby="about-title">
          <div className="container about__grid">
            <div className="about__copy reveal">
              <p className="eyebrow">A nossa essência</p>
              <h2 id="about-title" className="section-title">
                Crescer é melhor quando estamos <em>juntos.</em>
              </h2>
              <p className="section-copy">
                Na Aliança, cada criança é vista por inteiro. Unimos práticas baseadas em evidências, escuta atenta e parceria com a família para criar caminhos que respeitam sua singularidade.
              </p>
              <a className="underlined-link" href="#como-funciona">
                Conheça nosso jeito de cuidar <ArrowUpRight size={19} strokeWidth={1.8} />
              </a>
            </div>
            <div className="about__visual reveal reveal--delay">
              <div className="about__shape" aria-hidden="true" />
              <div className="about__image-frame">
                <img
                  src={asset("images/sobre-alianca.jpg")}
                  alt="Terapeuta e criança construindo juntas um brinquedo de encaixe"
                  loading="lazy"
                />
              </div>
              <svg className="about__spark" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <path d="M40 2c3.9 20.7 9.3 26.1 38 38-28.7 11.9-34.1 17.3-38 38C36.1 57.3 30.7 51.9 2 40 30.7 28.1 36.1 22.7 40 2Z" fill="#F5CB74" />
              </svg>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="caminhos" aria-labelledby="services-title">
          <div className="container">
            <div className="services__heading reveal">
              <div>
                <p className="eyebrow">Nossos caminhos</p>
                <h2 id="services-title" className="section-title">
                  Um cuidado que acompanha <em>cada história.</em>
                </h2>
              </div>
              <p className="section-copy">
                Diferentes formas de apoiar o desenvolvimento, sempre com o mesmo ponto de partida: conhecer quem está à nossa frente.
              </p>
            </div>

            <div className="services__body">
              <div className="services__list" aria-label="Áreas de cuidado">
                {services.map((service, index) => (
                  <button
                    className={`service-option ${activeService === index ? "service-option--active" : ""}`}
                    key={service.number}
                    type="button"
                    aria-pressed={activeService === index}
                    onClick={() => setActiveService(index)}
                    onMouseEnter={() => setActiveService(index)}
                    onFocus={() => setActiveService(index)}
                  >
                    <span className="service-option__row">
                      <span className="service-option__number">{service.number}</span>
                      <span className="service-option__title">{service.title}</span>
                      <ArrowUpRight className="service-option__arrow" size={23} strokeWidth={1.5} />
                    </span>
                    <span className="service-option__expand">
                      <span className="service-option__description">{service.description}</span>
                      {activeService === index && (
                        <img className="service-option__mobile-image" src={service.image} alt={service.alt} loading="lazy" />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <div className="services__image-wrap reveal reveal--delay" aria-live="polite">
                <img
                  className="services__image"
                  key={services[activeService].image}
                  src={services[activeService].image}
                  alt={services[activeService].alt}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="approach section-pad" id="como-funciona" aria-labelledby="approach-title">
          <div className="container approach__grid">
            <div className="approach__intro reveal">
              <p className="eyebrow">O nosso jeito</p>
              <h2 id="approach-title" className="section-title">
                A escuta transforma o <em>próximo passo.</em>
              </h2>
              <p className="section-copy">Um percurso construído em parceria, com intenção em cada encontro e espaço para celebrar cada conquista.</p>
            </div>
            <div className="approach__steps">
              <div className="approach-step reveal">
                <span className="approach-step__number">01</span>
                <div>
                  <h3>Primeiro, nos encontramos</h3>
                  <p>Ouvimos a família e conhecemos a criança, seus interesses, necessidades e possibilidades.</p>
                </div>
              </div>
              <div className="approach-step reveal">
                <span className="approach-step__number">02</span>
                <div>
                  <h3>Depois, desenhamos juntos</h3>
                  <p>Construímos objetivos e um acompanhamento que faça sentido para a vida real.</p>
                </div>
              </div>
              <div className="approach-step reveal">
                <span className="approach-step__number">03</span>
                <div>
                  <h3>Seguimos lado a lado</h3>
                  <p>Observamos avanços, ajustamos caminhos e valorizamos cada nova descoberta.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq section-pad" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq__grid">
            <div className="faq__intro reveal">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2 id="faq-title" className="section-title">É natural ter <em>perguntas.</em></h2>
              <p className="section-copy">E estamos aqui para conversar sobre elas, sem pressa.</p>
            </div>
            <div className="faq__items reveal reveal--delay">
              {questions.map((item, index) => (
                <div className="faq-item" key={item.question}>
                  <button
                    type="button"
                    className="faq-item__question"
                    aria-expanded={openQuestion === index}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={23} strokeWidth={1.6} />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`faq-item__answer ${openQuestion === index ? "faq-item__answer--open" : ""}`}
                    aria-hidden={openQuestion !== index}
                  >
                    <div><p>{item.answer}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contato" aria-labelledby="contact-title">
          <BrandMark className="contact__watermark" />
          <div className="container contact__grid">
            <div className="contact__intro reveal">
              <p className="eyebrow eyebrow--light">Fale com a Aliança</p>
              <h2 id="contact-title" className="section-title">
                Vamos começar por uma <em>conversa?</em>
              </h2>
              <p>Conte um pouco sobre vocês. O primeiro passo pode ser mais leve quando dado em companhia.</p>
            </div>
            <form className="contact-form reveal reveal--delay" onSubmit={handleContact}>
              <div className="contact-form__field">
                <label htmlFor="contact-name">Seu nome</label>
                <input id="contact-name" name="name" type="text" placeholder="Como podemos chamar você?" autoComplete="name" required />
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-email">Seu e-mail</label>
                <input id="contact-email" name="email" type="email" placeholder="seuemail@exemplo.com" autoComplete="email" required />
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-message">Sua mensagem</label>
                <textarea id="contact-message" name="message" rows={3} placeholder="O que você gostaria de compartilhar?" required />
              </div>
              <button className="button button--coral contact-form__submit" type="submit">
                Preparar mensagem <ArrowUpRight size={19} strokeWidth={1.8} />
              </button>
              <p className="contact-form__note" role={emailOpened ? "status" : undefined}>
                {emailOpened
                  ? "Seu aplicativo de e-mail será aberto. Confirme o envio por lá."
                  : "Ao continuar, seu aplicativo de e-mail será aberto para concluir o envio."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__main">
          <div>
            <Brand light />
            <p>Cuidar, descobrir e crescer. Juntos.</p>
          </div>
          <nav aria-label="Links do rodapé">
            <a href="#sobre">A Aliança</a>
            <a href="#caminhos">Nossos cuidados</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} Aliança Clínica Comportamental.</span>
          <a href="#inicio">Voltar ao início <ArrowUpRight size={14} strokeWidth={1.7} /></a>
        </div>
      </footer>
    </div>
  );
}

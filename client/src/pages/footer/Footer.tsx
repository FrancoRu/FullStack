function Footer() {
  return (
    <footer>
      <div>
        <div className="container-img">
          <a href="https://github.com/FrancoRu" target="_blank">
            <img
              src="../public/img/github.svg"
              alt="imagen de Github"
              title="link para redireccionar a hithub"
            />
          </a>
        </div>
        <div className="container-img">
          <a
            href="https://www.linkedin.com/in/franco-emanuel-ruggeri"
            target="_blank">
            <img
              src="../public/img/linkedin.svg"
              alt="imagen de Linkedin"
              title="link para redireccionar a Linkedin"
            />
          </a>
        </div>
        <div className="container-img">
          <a href="" target="_blank">
            <img
              src="../public/img/source.svg"
              alt="imagen de Source"
              title="link para redireccionar al repositorio con el codigo fuente"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const Mensaje = ({ usuario, contenido, fecha }) => {
  return (
    <div className="contenedor-mensaje">
      <h3 className="text-white">{usuario}</h3>

      <div className="mensaje">
        <p>{contenido}</p>
      </div>

      <p style={{ fontSize: "0.7em", margin:"0.2rem" }}>
        {fecha}
      </p>
    </div>
  );
};

export default Mensaje;
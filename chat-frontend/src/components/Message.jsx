const Message = ({ usuario, contenido, fecha , esMio}) => {
  return (
    <div className="contenedor-mensaje">
      <h3 className="name-user">{usuario}</h3>

      <div className={`mensaje ${esMio ? 'mio' : 'otro'}`}>
        <p>{contenido}</p>
      </div>

      <p style={{ fontSize: "0.7em", margin:"0.2rem" }}>
        {fecha}
      </p>
    </div>
  );
};

export default Message;
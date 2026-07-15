interface CardProps {
  name: string;
  onClick: () => void;
}

const Card = ({ name, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fffced",
        padding: 11,
        borderRadius: 10,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: 200,
        maxHeight: 200,
        cursor: "pointer",
        gap: 1,
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/logo square.png`}
        alt="Default"
        height={125}
        width={125}
        style={{
          width: "125px",
          height: "125px",
          objectFit: "cover",
        }}
      />
      <p
        style={{
          fontSize: "14px",
          color: "#606060",
          fontWeight: "bold",
          lineHeight: "1.2",
          textAlign: "center",
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default Card;

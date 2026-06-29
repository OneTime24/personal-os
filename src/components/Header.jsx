function Header() {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      style={{
        background: "white",
        padding: "20px 30px",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <h2>PersonalOS</h2>

      <p>{date}</p>
    </header>
  );
}

export default Header;
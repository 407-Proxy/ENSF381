const Footer = () => {
  const date = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer>
      <p>Mazin, Azlan | {date}</p>
    </footer>
  );
};

export default Footer;
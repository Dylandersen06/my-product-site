export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          &copy; {new Date().getFullYear()} CarMatch AI. Designed &amp; built by <strong>Dylan Andersen</strong>.
        </p>
        <p className="fine-print">
          New prices are approximate 2025 starting MSRPs. Used and certified pre-owned prices and mileage are
          estimates, not live listings, so check local listings for actual prices. Features and specs vary by trim.
          Confirm details with a dealer. Car photos are representative, so the year and trim shown may differ.
        </p>
      </div>
    </footer>
  );
}

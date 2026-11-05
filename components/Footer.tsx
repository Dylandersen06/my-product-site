export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          &copy; {new Date().getFullYear()} CarMatch AI. Designed &amp; built by <strong>Dylan Andersen</strong>.
        </p>
        <p className="fine-print">
          Prices are approximate 2025 starting MSRPs. Features and specs vary by trim. Confirm details with a dealer.
        </p>
      </div>
    </footer>
  );
}

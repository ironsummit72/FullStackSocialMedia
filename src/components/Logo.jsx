import brandLogo from "../assets/logo.png";
function Logo({ className }) {
  return <img className={`w-14 h14 ${className}`} src={brandLogo} alt="te" />;
}
export default Logo;

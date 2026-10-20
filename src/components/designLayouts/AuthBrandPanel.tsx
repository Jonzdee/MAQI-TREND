import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";

type AuthBrandPanelProps = {
  heading: string;
  subheading: string;
  features: string[];
};

const AuthBrandPanel = ({
  heading,
  subheading,
  features,
}: AuthBrandPanelProps) => (
  <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
    <div className="mq-auth-brand-panel">
      <Link to="/">
        <img src={logoLight} alt="logoImg" className="w-28" />
      </Link>
      <div className="flex flex-col gap-1 -mt-1">
        <h1 className="font-titleFont text-xl font-medium">{heading}</h1>
        <p className="text-base">{subheading}</p>
      </div>
      {features.map((feature) => (
        <div key={feature} className="mq-auth-feature">
          <span className="text-green-500 mt-1">
            <BsCheckCircleFill />
          </span>
          <p className="text-base text-gray-300">
            <span className="mq-auth-feature-title">{feature}</span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
            nisi dolor recusandae consectetur!
          </p>
        </div>
      ))}
      <div className="flex items-center justify-between mt-10">
        <p className="mq-auth-footer-link">© MAQI_TREND</p>
        <p className="mq-auth-footer-link">Terms</p>
        <p className="mq-auth-footer-link">Privacy</p>
        <p className="mq-auth-footer-link">Security</p>
      </div>
    </div>
  </div>
);

export default AuthBrandPanel;

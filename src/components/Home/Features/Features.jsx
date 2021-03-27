import Feature from "./Feature";
import './Features.css';

const Features = ({ values }) => {

  return (
    <div className="section padding-top-2">
      <div className="container icon-5xl">
        <div className="row">
          {values.length
            ? values.map((item, key) => (
                <Feature
                  key={key}
                  icon={item.Icon}
                  item={item}
                />
              ))
            : null}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>
  );
};


export default Features;

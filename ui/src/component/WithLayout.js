import FRIMSHeader from "./FRIMSHeader";
import FRIMSFooter from "./FRIMSFooter";

const WithLayout = (Page) => {
    return () => (
        <div className="with-layout">
            <FRIMSHeader/>
            <div className="page-component"><Page /></div>
            <FRIMSFooter />
        </div>
    );
};

export default WithLayout;
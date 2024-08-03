import React from "react";
import { Grid } from "react-loader-spinner";

const Loader = ({ title }) => {
  return (
    <div className="flex justify-center flex-col items-center h-[500px]">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#3d2df0"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
      <h2 className="mt-12 font-medium text-lg lg:text-xl ">
        Loading {title}...
      </h2>
    </div>
  );
};

export default Loader;

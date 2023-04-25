import React, { ReactElement } from "react";

type HeadinProps = { title: string };
const Heading = ({ title }: HeadinProps): ReactElement => {
  return <h1>{title}</h1>;
};

export default Heading;

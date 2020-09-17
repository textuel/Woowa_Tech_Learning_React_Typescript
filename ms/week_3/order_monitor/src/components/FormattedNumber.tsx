import * as React from "react";

const DEFAULT_SEPARATOR = ",";

interface FormattedNumberProps {
  value: number;
  separator?: string;
}

export const FormattedNumber: React.FC<FormattedNumberProps> = props => {
  const separator = props.separator || DEFAULT_SEPARATOR;
  const formattedNumber = String(props.value).replace(
    /(\d)(?=(?:\d{3})+(?!\d))/g,
    `$1${separator}`
  );

  return <span>{formattedNumber}</span>;
};

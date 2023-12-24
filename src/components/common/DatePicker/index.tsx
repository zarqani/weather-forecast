import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button";

export default function DatePicker({ ...props }) {
  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <Button label={value} onClick={onClick} ref={ref} />
  ));
  return <ReactDatePicker customInput={<ExampleCustomInput />} {...props} />;
}

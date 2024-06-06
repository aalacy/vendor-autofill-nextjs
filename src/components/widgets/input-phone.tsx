import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask?: string;
  definitions?: string;
}

export const InputPhone = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, mask, definitions, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask ?? "(#00) 000-0000"}
      definitions={{
        "#": definitions ?? /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value: `${value}` } })}
      overwrite
    />
  );
});

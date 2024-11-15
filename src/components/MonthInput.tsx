import React from "react";
import { Input } from "@chakra-ui/react";
import { IMaskInput } from "react-imask";

interface Props {
    value: string;
    onChange: (value: string) => void;
    [key: string]: any; // Optional props for additional customizations
  }
    export default function MonthYearInput({ value, onChange, ...props }: Props) {
        return (
            <IMaskInput
              mask="00/00"  // Mask for mm/yy format
              lazy={false}  // Keeps the mask visible (e.g., "__/__")
              blocks={{
                // Define custom blocks to validate month and year ranges
                YY: {
                  mask: IMask.MaskedRange,
                  from: 0,
                  to: 99,
                },
                MM: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 12,
                },
              }}
              unmask={false}  // Keeps the mask in the value
              value={value}
              onAccept={(value) => {
                if (onChange) {
                  onChange(value); // Send the masked date to the parent
                }
              }}
              render={(ref, maskProps) => (
                <Input ref={ref} value={value} {...maskProps} placeholder="MM/YY" {...props} />
              )}
            />
          );
};



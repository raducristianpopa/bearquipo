import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

import { FieldError } from "../../utils/useForm";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: string;
}

export default forwardRef<HTMLInputElement, InputFieldProps>((props, ref: any) => {
  if (props.label) {
    return (
      <>
        <label className={clsx(props.color, "block font-medium")}>
          {props.label}
          <input
            className="block w-full p-2.5 rounded-sm bg-black border  border-gray-200 border-opacity-50 focus:ring-gray-500 focus:border-gray-500"
            {...props}
            ref={ref}
          />
        </label>
        <FieldError name={props.name} />
      </>
    );
  }

  return (
    <>
      <input
        className="block w-full p-2.5 rounded-sm bg-black border border-gray-200 outline-none focus:outline-none border-opacity-50"
        {...props}
        ref={ref}
      />
      <FieldError name={props.name} />
    </>
  );
});

// const InputField: React.FC<IInputField> = ({ type, name, placeholder, label }) => {
//   return (
//     <>
//       {label && (
//         <label className="block font-medium text-gray-200" htmlFor={name}>
//           {label}
//         </label>
//       )}
//       <input
//         className="block w-full p-2.5 rounded-sm bg-black border border-gray-200 outline-none focus:outline-none border-opacity-50"
//         id={name}
//         type={type}
//         name={name}
//         placeholder={placeholder}
//       />
//     </>
//   );
// };

// export default InputField;

import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";

function FormUi({ jsonForm , onFieldUpdate, deleteFiled }) {


  return (
    <div className="border p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm?.formSubheading}
      </h2>

      {jsonForm?.formFields?.map((formField, index) => (
        <div key={index} className="flex items-center gap-2">
          {formField.fieldType == "select" ? (
            <div className="my-3 w-full ">
              <label className="text-xs text-gray-500">
                {formField.formLabel}
              </label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={formField.placeholderName} />
                </SelectTrigger>
                <SelectContent>
                  {formField.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : formField.fieldType == "radio" ? (
            <div className="w-full m-3">
              <label className="text-xs text-gray-500">
                {formField.formLabel}
              </label>
              <RadioGroup>
                {formField.options.map((item, index) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label} />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : formField.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">
                {formField?.label}
              </label>
              {formField?.options ? (
                formField.options?.map((item, index) => (
                  <div className="flex gap-2">
                    <Checkbox />
                    <h2>{item.label}</h2>
                  </div>
                ))
              ) : (
                <div>
                  <Checkbox />
                  <h2>{formField.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">
                {formField.formLabel}
              </label>
              <Input
                type={formField?.fieldType}
                placeholder={formField.placeholderName}
                name={formField.fieldName}
              />
            </div>
          )}
          <div>
            <FieldEdit defaultValue={formField}
            onUpdate={(value)=>onFieldUpdate(value ,index)} 
            deleteFiled={()=>deleteFiled(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormUi;
// import { Input } from "@/components/ui/input";
// import React from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";

// function FormUi({ jsonForm }) {
//   return (
//     <div className="border p-5 md:w-[600px]">
//       <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
//       <h2 className="text-sm text-gray-400 text-center">
//         {jsonForm?.formSubheading}
//       </h2>

//       {jsonForm?.formFields?.map((formField, index) => (
//         <div key={index}>
//           {formField.formFieldType === "select" ? (
//             <div className="my-3">
//               <label className="text-xs text-gray-500">{formField.label}</label>
//               <Select>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder={formField.placeholder} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {formField.options?.map((item, index) => (
//                     <SelectItem key={index} value={item}>
//                       {item}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           ) : formField.formFieldType === "radio" ? (
//             <div className="my-3">
//               <label className="text-xs text-gray-500">{formField.label}</label>
//               <RadioGroup>
//                 {formField.options?.map((item, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <RadioGroupItem value={item.label} id={item.label} />
//                     <Label htmlFor={item.label}>{item.label}</Label>
//                   </div>
//                 ))}
//               </RadioGroup>
//             </div>
//           ) : formField.formFieldType === "checkbox" ? (
//             <div className="my-3">
//               <label className="text-xs text-gray-500">{formField?.label}</label>
//               {formField?.options?.map((item, index) => (
//                 <div key={index} className="flex gap-2">
//                   <Checkbox />
//                   <h2>{item.label}</h2>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="my-3">
//               <label className="text-xs text-gray-500">{formField.label}</label>
//               <Input
//                 type={formField?.type}
//                 placeholder={formField.placeholder}
//                 name={formField.fieldName}
//               />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FormUi;

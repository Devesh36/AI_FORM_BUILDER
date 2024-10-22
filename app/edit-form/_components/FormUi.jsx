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
import { useState } from "react";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { useRef  } from "react";

function FormUi({
  jsonForm,
  selectedTheme,
  onFieldUpdate,
  deleteFiled,
  editable = true,
  formId
}) {
  const [formData, setFormData] = useState();

  let formRef  = useRef();

  const handelInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(e.target.value);
  };

  const handelSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    console.log(formId)
    e.preventDefault();
    console.log("Submitted Data:", formData);

    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
      formRef:formId
    });
    console.log("Result", result)

    if(result){
      formRef.reset();
      console.log("Successfully saved the form response");
      toast("Response submitted successfully");
    }
    else{
      console.log("Error saving the form response");
      toast("Error saving the form response");
    }
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];
    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    }
    else {
      const result = list.filter((item) => item.label !== itemName);
    }
    setFormData({
      ...formData,
      [fieldName]: list,
    });
  };

  return (
    <form
    ref={(e)=>formRef=e}
      onSubmit={onFormSubmit}
      className="border p-5 md:w-[600px]"
      data-theme={selectedTheme}
    >
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
              <Select
                onValueChange={(v) =>
                  handelSelectChange(formField.fieldName, v)
                }
              >
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
                    <RadioGroupItem
                      value={item.label}
                      id={item.label}
                      onClick={() =>
                        handelSelectChange(formField.fieldName, item.label)
                      }
                    />
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
                    <Checkbox
                      onCheckboxChange={(e) =>
                        handleCheckboxChange(formField.label, item.label, v)
                      }
                    />
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
                onChange={(e) => handelInputChange(e)}
              />
            </div>
          )}
          {editable && (
            <div>
              <FieldEdit
                defaultValue={formField}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteFiled={() => deleteFiled(index)}
              />
            </div>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormUi;

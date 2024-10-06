"use client";
import { JsonForms } from "@/configs/schema";
import { db } from "@/configs";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const Router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState();

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(result[0]);
    console.log(JSON.parse(     result[0].jsonform));
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    console.log(jsonForm);
    jsonForm.formFields[index].formLabel = value.label;
    jsonForm.formFields[index].placeholderName = value.placeholder;
    setUpdateTrigger(Date.now());
    console.log(updateTrigger);
    toast("Updated");
  };

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
      toast("Updated");
  };

  const deleteFiled=(indexToRemove)=>{
    const result = jsonForm.formFields.filter((item,index)=>index!=indexToRemove);
    console.log(result);
    jsonForm.formFields = result
    setUpdateTrigger(Date.now())
  }

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        onClick={() => Router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-5  flex items-center justify-center">
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteFiled={(index) => deleteFiled(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;

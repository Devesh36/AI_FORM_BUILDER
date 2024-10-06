"use client";
import { JsonForms } from "@/configs/schema";
import { db } from "@/configs";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const Router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState();
  const [selectedTheme, setSelectedTheme] = useState("system");

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
    console.log(JSON.parse(result[0].jsonform));
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

  const deleteFiled = (indexToRemove) => {
    const result = jsonForm.formFields.filter(
      (item, index) => index != indexToRemove
    );
    console.log(result);
    jsonForm.formFields = result;
    setUpdateTrigger(Date.now());
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => Router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
         <Link href={'/aiform/'+ record?.id} target="_blank"> <Button className="flex gap-2"> <SquareArrowOutUpRight className="h-5 w-5" /> {" "}Live Preview</Button>
         </Link><Button className="flex gap-2"><Share2 className="h-5 w-5" /> Share </Button>
        </div>
      </div>  
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        data-theme={selectedTheme}
      >
        <div className="p-5 border rounded-lg shadow-md">
          <Controller selectedTheme={(value) => setSelectedTheme(value)} />
        </div>
        <div className="md:col-span-2 border rounded-lg p-5  flex items-center justify-center">
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteFiled={(index) => deleteFiled(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;

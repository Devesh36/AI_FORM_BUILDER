"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../configs";
import { JsonForms } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import FormUi from "../../edit-form/_components/FormUi";

const LiveAiForm = ({ params }) => {
  useEffect(() => {
    GetFormData();
    console.log(params);
  }, [params]);

  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, params?.formid));
    setRecord(result[0]);
    console.log(JSON.parse(result[0].jsonform));
    setJsonForm(JSON.parse(result[0].jsonform));
    console.log(result);
  };
  return (
    <div>
      <FormUi
        jsonForm={jsonForm}
        selectedTheme="system"
        onFieldUpdate={() => {
          console.log;
        }}
        deleteFiled={() => {
          console.log;
        }}
      />
    </div>
  );
};

export default LiveAiForm;

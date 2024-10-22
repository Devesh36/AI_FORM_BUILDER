"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../configs";
import { JsonForms } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import FormUi from "../../edit-form/_components/FormUi";
import Image from "next/image";
import Link from "next/link";

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
    // console.log(result); 
    // console.log(record.id)
  };
  return (
    <div className="p-10 justify-center items-center flex flex-col">
      {record && (
        <FormUi
          jsonForm={jsonForm}
          selectedTheme="system"
          onFieldUpdate={() => {
            console.log;
          }}
          deleteFiled={() => {
            console.log;
          }}
          editable={false}
          formId={record.id}
         
        />
      )}
      <Link
        className="flex items-center justify-center gap-2 mt-10 rounded-full"
        href={process.env.NEXT_PUBLIC_BASE_URL}
      >
        <Image src={"/LOGO2.png"} width={50} height={50} />
        Build you own AI Form
      </Link>
    </div>
  );
};

export default LiveAiForm;

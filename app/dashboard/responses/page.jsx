"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItemRes from "./_components/FormListItemRes";

function Responses() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && getFormList();
  }, [user]);

  const getFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress));
    console.log(result);
    setFormList(result);
  };
  return (
    <div className="p-10">
      {" "}
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Responses
      </h2>
      <div className="flex gap-5 mt-10">
          {formList.map((form) => (
            <FormListItemRes
              formRecord={form}
              jsonForm={JSON.parse(form.jsonform)}
            />
          ))}
      </div>
    </div>
  );
}

export default Responses;

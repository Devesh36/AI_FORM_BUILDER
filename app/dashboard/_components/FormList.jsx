"use client";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/configs";
import { desc, eq } from "drizzle-orm";

import FormListItem from "./FormListItem";

export const FormList = () => {
  const [formList, setFormList] = useState([]);

  const { user } = useUser();

  const GetFormList = async () => {

    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));
    setFormList(result);
    
  };

  useEffect(() => {
    user && GetFormList();
  }, [user]);

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form) => (
        <div key={form.id}>
          <FormListItem
            form={JSON.parse(form.jsonform)}
            formRecord={form}
            refreshData={()=>GetFormList()}
          />
        </div>
      ))}
    </div>
  );
};

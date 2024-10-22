"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Loader } from "lucide-react";
import * as XLSX from 'xlsx'

function FormListItemRes({ jsonForm, formRecord }) {
  const [loading, setLoading] = useState(false);

  const exportData = async () => {
    
    setLoading(true);
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));
    console.log(result);
    if (result) {
        const jsonData = [];
        result.forEach((item) => {
            const jsonItem = JSON.parse(item?.jsonResponse);
            jsonData.push(jsonItem);
        })
        console.log(jsonData)
        exportToExcel(jsonData)

      setLoading(false);
    }
  };

  const exportToExcel=(jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Responses.xlsx");

  }
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 justify-between">
            {jsonForm.formTitle}
          </CardTitle>
          <CardDescription>{jsonForm.formSubheading}</CardDescription>
        </CardHeader>
        <CardContent>
          <hr />
        </CardContent>
        <CardFooter className="flex justify-between">
          <h2>
            <strong>42</strong> Responses
          </h2>
          <Button onClick={() => exportData()} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Export"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FormListItemRes;

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, Share1Icon } from "@radix-ui/react-icons";
import { Trash } from "lucide-react";
import Link from "next/link";
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
import { db } from "@/configs";
import { useUser } from "@clerk/nextjs";
import { JsonForms, userResponses } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function FormListItem({ form, formRecord, refreshData }) {
  const { user } = useUser();
  const onDeleteForm = async () => {
    await db
      .delete(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));
    const result = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formRecord.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    if (result) {
      toast("Form deleted successfully");
      refreshData();
    } else {
      toast("Error deleting form");
    }
    console.log("Deleted form record");
  };
  return (
    <div className="">
      <Card>
        <CardHeader>
          {console.log(form)}
          <CardTitle className="flex gap-2 justify-between">
            {form.formTitle}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Trash className="text-red-600 hover:scale-125 transition-all" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteForm()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardTitle>
          <CardDescription>{form.formSubheading}</CardDescription>
        </CardHeader>
        <CardContent>
          <hr />
        </CardContent>
        <CardFooter className="flex justify-between">
          <RWebShare
            data={{
              text: form.formSubheading,
              url:
                process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + formRecord.id,
              title: form.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 " size="sm" variant="outline">
              <Share1Icon className="h-5 w-5" />
              Share
            </Button>
          </RWebShare>

          <Link href={`edit-form/${formRecord.id}`}>
            <Button className="flex gap-2" size="sm">
              <Pencil1Icon className="h-5 w-5" />
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FormListItem;

"use client";
import React from "react";
import {
  DefaultValues,
  UseFormReturn,
  SubmitHandler,
  FieldValues,
  useForm,
  Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* // Book Title */}
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Book Author */}
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Book Genre */}
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Rating */}
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  required
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Total Copies */}
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  required
                  placeholder="Book title"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Book Image */}
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Book Image
              </FormLabel>
              <FormControl>{/* File UPload */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Book color Url */}
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Primary Color
              </FormLabel>
              <FormControl>{/* color picker*/}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Book Description */}
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book description"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Video Url */}
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Book Trailer
              </FormLabel>
              <FormControl>{/* File UPload */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Cover Url */}
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                {/* // get the key out of field_name type */}
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  {...field}
                  rows={5}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="book-form_btn text-white">
          Add Book to Library
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;

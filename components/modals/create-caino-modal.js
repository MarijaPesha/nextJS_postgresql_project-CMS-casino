"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useCreateCainoModal } from "@/hooks/use-create-caino-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
});

export const CreateCainoModal = () => {
  const isOpen = useCreateCainoModal((state) => state.isOpen);
  const onClose = useCreateCainoModal((state) => state.onClose);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/casinos", values);
      toast.success(`${response.data.name} is created!`);
      setTimeout(() => {
        window.location.assign(`/${response.data.name}`);
      }, 1000);
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create casino"
      description="Add a new casino to manage affiliate pages"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y4 py-2 pb-4 text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add casino name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

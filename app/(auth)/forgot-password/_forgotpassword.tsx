"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Link, Loader, MailCheckIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (res) => {
        setIsSubmitted(true);
        toast({
          title: "Success",
          description: res.data.message,
          variant: "default",
        });
      },
      onError: (error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
      {!isSubmitted ? (
        <div className="w-full h-full p-5 rounded-md">
          <Logo />

          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8
        text-center sm:text-left"
          >
            Reset password
          </h1>
          <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
            Include the email address associated with your account and we’ll
            send you an email with instructions to reset your password.
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-0">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="subscribeto@channel.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={isPending}
                className="w-full text-[15px] h-[40px] hover:bg-blue-700 bg-blue-500 text-white font-semibold"
              >
                Send reset instructions
                {isPending && <Loader className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We just sent a password reset link to {form.getValues().email}.
          </p>
          {/* <Link href="/" className="w-full">
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              Go to login
            </p>
          </Link> */}

          <Button
            onClick={() => router.push("/")}
            className="w-full h-[40px] hover:bg-blue-700 bg-blue-500 text-white"
          >
            Go to login
            <ArrowRight />
          </Button>
        </div>
      )}
    </main>
  );
}
